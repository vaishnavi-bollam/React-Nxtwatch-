import {Link} from 'react-router-dom'

import './index.css'

const TrendingCard = props => {
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
    <li className="trending-card">
      <Link to={`/videos/${id}`}>
        <img src={thumbnailUrl} className="trending-images" />
        <div>
          <p>{channelName}</p>
          <p>{title}</p>
          <p>{viewCount} Views</p>
          <img src={profileImageUrl} className="trending-profile-image" />
        </div>
      </Link>
    </li>
  )
}

export default TrendingCard
