import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import {MyContext} from '../MyContext'
import './index.css'

class Header extends Component {
  logoutClicked = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  darkImageClicked = (toggleLightMode, isLightMode) => {
    toggleLightMode()
    console.log('isLightMode clicked:', isLightMode)
  }

  render() {
    return (
      <MyContext.Consumer>
        {({isLightMode, toggleLightMode}) => (
          <nav
            className={`nav-bar ${
              isLightMode ? 'black-styling' : 'white-styling'
            }`}
          >
            <li>
              <Link to="/">
                {isLightMode ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                  />
                )}
              </Link>
            </li>

            <div className="nav-text">
              <li
                onClick={() =>
                  this.darkImageClicked(toggleLightMode, isLightMode)
                }
              >
                <button
                  type="button"
                  data-testid="theme"
                  aria-label="Toggle theme"
                >
                  <FaMoon />
                </button>
              </li>

              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  className="header-logos"
                  alt="profile"
                />
              </li>
            </div>
            <button onClick={this.logoutClicked} type="button">
              Logout
            </button>
          </nav>
        )}
      </MyContext.Consumer>
    )
  }
}

export default withRouter(Header)
