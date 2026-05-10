export default function AnnouncementBar() {
  return (
    <div
      style={{
        height: '36px',
        background: 'var(--parchment)',
        borderBottom: '1px solid rgba(196,120,74,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.58rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--terra)',
        }}
      >
        Commissions open for 2025 — Narain Niwas Palace, Jaipur
      </span>
    </div>
  )
}
