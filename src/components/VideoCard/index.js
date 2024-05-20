import {Link} from 'react-router-dom'
import './index.css'

const VideoCard = props => {
  const {each} = props
  const {
    name,
    profileImageUrl,
    id,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = each
  return (
    <li className="video-card">
      <Link to={`/videos/${id}`}>
        <img
          src={thumbnailUrl}
          className="thumbnail-url"
          alt="video thumbnail"
        />
        <br />
        <img
          src={profileImageUrl}
          className="profile-image"
          alt="channel logo"
        />
        <p>{title}</p>
        <p>{name}</p>
        <p>iB Cricket</p>
        <p>{viewCount}</p>

        <p>{publishedAt}</p>
      </Link>
    </li>
  )
}

export default VideoCard
