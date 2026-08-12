import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #111, #333)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          borderRadius: '5px',
          border: '1px solid #444',
          fontSize: 12,
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
        }}
      >
        KDP
      </div>
    ),
    {
      ...size,
    }
  )
}
