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
        <Link to="/saved-videos">
          <p>Saved videos</p>
        </Link>
      </li>
    </ul>
    <div>
      <p>CONTACT US</p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
        className="logos"
        alt="facebook logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
        className="logos"
        alt="twitter logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
        className="logos"
        alt="linked in logo"
      />
      <p>Enjoy! Now to see your channels and recommendations!</p>
    </div>
  </div>
)

export default LeftContainer
