/**
 * Best-effort heuristic resume parser.
 *
 * This is NOT a full NLP/AI resume parser — it uses regexes and common
 * section-header keywords to make a reasonable first pass at filling in
 * the CV form so the user doesn't start from a blank page. The frontend
 * always tells the user to review and correct the result before publishing.
 */

const SECTION_HEADERS = {
  summary: [
    'summary',
    'profile',
    'objective',
    'about me',
    'professional summary',
  ],
  experience: [
    'experience',
    'work experience',
    'employment history',
    'employment',
    'professional experience',
  ],
  education: ['education', 'academic background', 'qualifications'],
  skills: ['skills', 'technical skills', 'core competencies', 'key skills'],
  certifications: ['certifications', 'certificates', 'licenses'],
  languages: ['languages'],
  references: ['references'],
}

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
const PHONE_REGEX =
  /(\+?\d{1,3}[\s.-]?)?(\(?\d{2,4}\)?[\s.-]?){2,4}\d{2,4}/g
const URL_REGEX =
  /(linkedin\.com|github\.com)\/[a-zA-Z0-9._\-/]+/gi

function normalizeLines(text) {
  return text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
}

function findSectionKey(line) {
  const lower = line.toLowerCase().replace(/[:•*#]/g, '').trim()

  if (lower.length > 40) return null // headers are short

  for (const [key, keywords] of Object.entries(SECTION_HEADERS)) {
    if (keywords.some((k) => lower === k || lower.startsWith(k))) {
      return key
    }
  }
  return null
}

function splitIntoSections(lines) {
  const sections = { _preamble: [] }
  let current = '_preamble'

  for (const line of lines) {
    const key = findSectionKey(line)
    if (key) {
      current = key
      if (!sections[current]) sections[current] = []
      continue
    }
    if (!sections[current]) sections[current] = []
    sections[current].push(line)
  }

  return sections
}

function guessName(lines) {
  // Usually the first line of a resume that isn't contact info.
  for (const line of lines.slice(0, 5)) {
    if (EMAIL_REGEX.test(line)) continue
    if (/\d{3,}/.test(line)) continue
    if (line.length > 3 && line.length < 60) {
      return line.replace(/[|,]/g, '').trim()
    }
  }
  return ''
}

function guessTitle(lines, name) {
  const nameIndex = lines.findIndex((l) => l.includes(name))
  if (nameIndex >= 0 && lines[nameIndex + 1]) {
    const candidate = lines[nameIndex + 1]
    if (
      candidate.length < 80 &&
      !EMAIL_REGEX.test(candidate) &&
      !/\d{3,}/.test(candidate)
    ) {
      return candidate
    }
  }
  return ''
}

function parseSkillsBlock(lines) {
  const joined = lines.join(', ')
  const parts = joined
    .split(/[,•|·\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1 && s.length < 40)

  const unique = [...new Set(parts)]

  return unique.slice(0, 12).map((name) => ({
    name,
    level: 75,
    description: '',
    icon: '⭐',
    color: 'blue',
  }))
}

function parseLanguagesBlock(lines) {
  const joined = lines.join(', ')
  const parts = joined
    .split(/[,•|·\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1 && s.length < 30)

  return [...new Set(parts)].slice(0, 8).map((name) => ({
    name: name.replace(/[-–:].*$/, '').trim(),
    level: 70,
    levelLabel: 'Conversational',
  }))
}

function parseCertificationsBlock(lines) {
  return lines
    .filter((l) => l.length > 3 && l.length < 120)
    .slice(0, 10)
    .map((title) => ({ title: title.replace(/^[•\-*]\s*/, '') }))
}

function extractDuration(line) {
  const m = line.match(
    /((19|20)\d{2})\s*[-–—]\s*((19|20)\d{2}|present|current)/i
  )
  return m ? m[0] : null
}

function isPureDateLine(line) {
  const d = extractDuration(line)
  if (!d) return false
  const rest = line.replace(d, '').trim()
  return rest.length <= 2
}

function parseExperienceBlock(lines) {
  const entries = []
  let current = null

  for (const line of lines) {
    if (isPureDateLine(line)) {
      if (current) current.duration = extractDuration(line)
      continue
    }

    const hasAt = / at /i.test(line)
    const inlineDuration = extractDuration(line)
    const looksLikeNewHeader =
      hasAt ||
      (inlineDuration &&
        line.replace(inlineDuration, '').trim().length > 3)

    if (looksLikeNewHeader || !current) {
      if (current) entries.push(current)
      current = {
        headerLine: line,
        duration: inlineDuration || '',
        descLines: [],
      }
      continue
    }

    current.descLines.push(line)
  }
  if (current) entries.push(current)

  return entries.slice(0, 8).map((e) => {
    let role = e.headerLine
    let company = ''

    if (/ at /i.test(e.headerLine)) {
      const [r, c] = e.headerLine.split(/ at /i)
      role = r.trim()
      company = (c || '').replace(e.duration, '').trim()
    } else if (e.headerLine.includes(' - ')) {
      const [r, c] = e.headerLine.split(' - ')
      role = r.trim()
      company = (c || '').replace(e.duration, '').trim()
    }

    role = role.replace(e.duration, '').trim()

    return {
      role: role || 'Role',
      company,
      duration: e.duration,
      description: e.descLines.join(' ').trim(),
      tags: [],
    }
  })
}

const DEGREE_KEYWORDS =
  /\b(bachelor|master|bsc|b\.?a\.?|msc|m\.?a\.?|mba|phd|diploma|associate|higher secondary|high school)\b/i

function parseEducationBlock(lines) {
  const entries = []
  let current = null

  for (const line of lines) {
    if (isPureDateLine(line)) {
      if (current) current.duration = extractDuration(line)
      continue
    }

    const looksLikeDegree = DEGREE_KEYWORDS.test(line)

    if (looksLikeDegree || !current) {
      if (current) entries.push(current)
      current = { degree: line, duration: '', institute: '' }
      continue
    }

    if (!current.institute) {
      current.institute = line
    }
  }
  if (current) entries.push(current)

  return entries.slice(0, 6).map((e) => ({
    degree: e.degree.replace(e.duration, '').trim() || 'Degree',
    institute: e.institute || '',
    duration: e.duration || '',
    result: '',
  }))
}

function parseResumeText(text) {
  const lines = normalizeLines(text)
  const fullText = lines.join('\n')

  const email = (fullText.match(EMAIL_REGEX) || [])[0] || ''
  const phone = (fullText.match(PHONE_REGEX) || []).find(
    (p) => p.replace(/\D/g, '').length >= 7
  ) || ''
  const socialUrls = fullText.match(URL_REGEX) || []

  const sections = splitIntoSections(lines)
  const name = guessName(lines)
  const title = guessTitle(lines, name)

  const result = {
    personal: {
      name: name || undefined,
      title: title || undefined,
      email: email || undefined,
      phone: phone || undefined,
      summary: sections.summary
        ? sections.summary.join(' ').slice(0, 800)
        : undefined,
      socials: socialUrls.length
        ? socialUrls.map((url) => ({
            platform: url.includes('linkedin')
              ? 'LinkedIn'
              : url.includes('github')
              ? 'GitHub'
              : 'Website',
            url,
          }))
        : undefined,
    },
    skills: sections.skills
      ? parseSkillsBlock(sections.skills)
      : undefined,
    experience: sections.experience
      ? parseExperienceBlock(sections.experience)
      : undefined,
    education: sections.education
      ? parseEducationBlock(sections.education)
      : undefined,
    certifications: sections.certifications
      ? parseCertificationsBlock(sections.certifications)
      : undefined,
    languages: sections.languages
      ? parseLanguagesBlock(sections.languages)
      : undefined,
  }

  // Strip undefined keys so the frontend merge only touches fields we
  // actually found something for.
  Object.keys(result.personal).forEach((k) => {
    if (result.personal[k] === undefined) delete result.personal[k]
  })
  Object.keys(result).forEach((k) => {
    if (result[k] === undefined) delete result[k]
  })

  return result
}

module.exports = { parseResumeText }
