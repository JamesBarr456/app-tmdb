import { YouTubeEmbed } from '@next/third-parties/google'

interface YouTubeTrailerProps {
  trailer_key: string | null
  width?: number 
  height?: number
}

export default function YouTubeTrailer({ trailer_key, width = 640, height = 360 }: YouTubeTrailerProps) {
  if (!trailer_key) {
    return <div>No trailer available</div>
  }

  return (
    <div className="aspect-video">
      <YouTubeEmbed
        videoid={trailer_key}
        height={height}
        width={width}
        params="rel=0"
      />
    </div>
  )
}

