import { useEffect } from 'react'

const SECTION_IDS = ['top', 'how', 'languages', 'care']

/** @param {(id: string) => void} onChange */
export function useScrollSpySections(onChange) {
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    )

    if (els.length === 0) return undefined

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          onChange(visible[0].target.id)
        }
      },
      {
        rootMargin: '-12% 0px -38% 0px',
        threshold: [0, 0.1, 0.2, 0.35, 0.5],
      },
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [onChange])
}
