/** Very small formatter for **bold** chunks from the model */
export function FormattedReply({ text }) {
  if (!text) return null
  const segments = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <div className="reply-body">
      {segments.map((seg, i) => {
        if (seg.startsWith('**') && seg.endsWith('**')) {
          return <strong key={i}>{seg.slice(2, -2)}</strong>
        }
        return <span key={i}>{seg}</span>
      })}
    </div>
  )
}
