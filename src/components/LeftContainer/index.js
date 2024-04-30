import {Link} from 'react-router-dom'

const LeftContainer = () => (
  <div>
    <input type="text" />
    {/* <CiSearch /> */}

    <ul>
      <li>
        <Link to="/">
          <p>Home</p>
        </Link>
      </li>
      <li>
        <Link to="/trending">
          <p>Trending</p>
        </Link>
      </li>
      <li>
        <Link to="/gaming">
          <p>Gaming</p>
        </Link>
      </li>
      <li>
        <p>Saved Videos</p>
      </li>
    </ul>
    <div>
      <p>CONTACT US</p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
        className="logos"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
        className="logos"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
        className="logos"
      />
      <p>Enjoy now to see your channels and recommendations</p>
    </div>
  </div>
)

export default LeftContainer
