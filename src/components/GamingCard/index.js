import {Link} from 'react-router-dom'

const GamingCard = props => {
  const {each} = props
  const {id, thumbnailUrl, title, viewCount} = each
  return (
    <li>
      <Link to={`/videos/${id}`}>
        <img
          src={thumbnailUrl}
          className="trending-images"
          alt="video thumbnail"
        />
        <p>{title}</p>
        <p>{viewCount} Views</p>
      </Link>
    </li>
  )
}

export default GamingCard
