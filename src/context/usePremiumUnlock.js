import { useEffect, useState } from 'react'

const STORAGE_KEY = 'cv-maker-unlocked-templates'

export function usePremiumUnlock() {
  const [unlockedIds, setUnlockedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(unlockedIds)
    )
  }, [unlockedIds])

  const isUnlocked = (templateId) =>
    unlockedIds.includes(templateId)

  const unlock = (templateId) => {
    setUnlockedIds((prev) =>
      prev.includes(templateId)
        ? prev
        : [...prev, templateId]
    )
  }

  return { unlockedIds, isUnlocked, unlock }
}
