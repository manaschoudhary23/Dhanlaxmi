/**
 * SplitText.jsx
 * Splits text into word-spans for GSAP stagger animations.
 * Usage:
 *   <SplitText className="split-word">Your heading here</SplitText>
 */
export function SplitText({ children, className = 'split-word', tag: Tag = 'span', style }) {
  if (typeof children !== 'string') return <>{children}</>

  const words = children.split(' ')

  return (
    <>
      {words.map((word, i) => (
        <Tag
          key={i}
          className={className}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            marginRight: i < words.length - 1 ? '0.28em' : 0,
            ...style,
          }}
        >
          {word}
        </Tag>
      ))}
    </>
  )
}

/**
 * Splits into lines (block-level, for paragraph reveals)
 */
export function SplitLines({ children, className = 'split-line' }) {
  if (typeof children !== 'string') return <>{children}</>

  const lines = children.split('\n').filter(Boolean)
  return (
    <div>
      {lines.map((line, i) => (
        <div key={i} style={{ overflow: 'hidden' }}>
          <span className={className} style={{ display: 'block' }}>{line}</span>
        </div>
      ))}
    </div>
  )
}
