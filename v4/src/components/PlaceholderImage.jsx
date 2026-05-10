import { useState } from 'react'

export default function PlaceholderImage({ src, alt, aspectRatio, style = {}, loading = 'lazy', fetchpriority }) {
  const [failed, setFailed] = useState(false)

  const containerStyle = {
    aspectRatio,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    ...style,
  }

  if (failed) {
    return (
      <div style={{
        ...containerStyle,
        background: 'var(--parchment-deep)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'Jost, sans-serif',
          fontWeight: 200,
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          color: 'var(--muted)',
          textAlign: 'center',
          padding: '1rem',
        }}>
          {src.split('/').pop()}
        </span>
      </div>
    )
  }

  return (
    <div style={containerStyle}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchpriority={fetchpriority}
        onError={() => setFailed(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  )
}
