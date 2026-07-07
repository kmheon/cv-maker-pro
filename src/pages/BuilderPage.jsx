import { useEffect, useState } from 'react'

import EditorPanel from '../editor/EditorPanel'
import templates from '../templates'
import cvDataFile from '../data/cvData'
import { useTheme } from '../context/ThemeContext'
import WhatsNewModal, {
  useWhatsNew,
} from '../shared/WhatsNewModal'