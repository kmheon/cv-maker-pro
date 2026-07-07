const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const { parseResumeText } = require('./lib/parseResume')

const app = express()
const PORT = process.env.PORT || 4000
const DATA_DIR = path.join(__dirname, 'data')

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

app.use(cors())
app.use(express.json({ limit: '5mb' }))

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
})

function generateId() {
  return crypto.randomBytes(6).toString('hex')
}

function generateEditToken() {
  return crypto.randomBytes(24).toString('hex')
}

function cvFilePath(id) {
  // Guard against path traversal — ids are always hex strings we generate,
  // but validate defensively since the id comes from the URL.
  if (!/^[a-f0-9]+$/.test(id)) return null
  return path.join(DATA_DIR, `${id}.json`)
}

/* =========================
   PUBLISH A CV
========================= */

app.post('/api/cv', (req, res) => {
  const { cvData, selectedTemplate, darkMode } = req.body || {}

  if (!cvData) {
    return res.status(400).json({ error: 'cvData is required' })
  }

  const id = generateId()
  const editToken = generateEditToken()

  const record = {
    id,
    editToken,
    cvData,
    selectedTemplate: selectedTemplate || 'modernGlass',
    darkMode: !!darkMode,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  fs.writeFileSync(cvFilePath(id), JSON.stringify(record, null, 2))

  res.json({ id, editToken })
})

/* =========================
   FETCH A PUBLISHED CV (public, read-only)
========================= */

app.get('/api/cv/:id', (req, res) => {
  const filePath = cvFilePath(req.params.id)
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'CV not found' })
  }

  const record = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  // Never expose the edit token publicly.
  const { editToken, ...publicRecord } = record

  res.json(publicRecord)
})

/* =========================
   UPDATE A PUBLISHED CV (requires edit token)
========================= */

app.put('/api/cv/:id', (req, res) => {
  const filePath = cvFilePath(req.params.id)
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'CV not found' })
  }

  const record = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const providedToken = req.headers['x-edit-token']

  if (!providedToken || providedToken !== record.editToken) {
    return res.status(403).json({ error: 'Invalid edit token' })
  }

  const { cvData, selectedTemplate, darkMode } = req.body || {}

  const updated = {
    ...record,
    cvData: cvData || record.cvData,
    selectedTemplate: selectedTemplate || record.selectedTemplate,
    darkMode: darkMode ?? record.darkMode,
    updatedAt: new Date().toISOString(),
  }

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2))

  res.json({ id: updated.id, updatedAt: updated.updatedAt })
})

/* =========================
   PARSE AN UPLOADED RESUME (PDF / DOCX) FOR AUTO-FILL
========================= */

app.post(
  '/api/parse-resume',
  upload.single('file'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const { originalname, buffer } = req.file
    const ext = path.extname(originalname).toLowerCase()

    try {
      let text = ''

      if (ext === '.pdf') {
        const pdfParse = require('pdf-parse')
        const parsed = await pdfParse(buffer)
        text = parsed.text
      } else if (ext === '.docx') {
        const mammoth = require('mammoth')
        const parsed = await mammoth.extractRawText({ buffer })
        text = parsed.value
      } else {
        return res.status(400).json({
          error: 'Unsupported file type. Please upload a PDF or DOCX file.',
        })
      }

      const parsedData = parseResumeText(text)

      res.json({ parsedData })
    } catch (err) {
      console.error('Resume parsing failed:', err)
      res.status(500).json({
        error:
          'Could not read that file. It may be corrupted, password-protected, or scanned as an image (no selectable text).',
      })
    }
  }
)

/* =========================
   SERVE THE BUILT FRONTEND IN PRODUCTION
========================= */

const distPath = path.join(__dirname, '..', 'dist')

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))

  // Any non-API route falls through to index.html so the frontend's
  // own client-side routing (e.g. /cv/:id) can take over.
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`CV Maker Pro server listening on port ${PORT}`)
  if (!fs.existsSync(distPath)) {
    console.log(
      'No dist/ folder found yet — run "npm run build" in the project root, then restart this server, to serve the frontend from here too.'
    )
  }
})
