const VideoCard = props => {
  const {each} = props
  const {
    channelName,
    profileImageUrl,
    id,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = each
  return (
    <div>
      <img src={thumbnailUrl} />
      <img src={profileImageUrl} />
      <p>{title}</p>
      <p>iB Cricket</p>
      <p>{viewCount}</p>

      <p>{publishedAt}</p>
    </div>
  )
}

export default VideoCard
