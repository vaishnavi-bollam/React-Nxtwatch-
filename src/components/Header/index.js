import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import Popup from 'reactjs-popup'

import {MyContext} from '../MyContext'
import {NavEle} from '../StyledComponent'
import './index.css'

class Header extends Component {
  state = {isCancel: true}

  logoutClicked = () => {
    this.setState({isCancel: true})
  }

  cancelClicked = () => {
    this.setState({isCancel: false})
  }

  confirmClicked = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  darkImageClicked = (toggleLightMode, isLightMode) => {
    toggleLightMode()
    console.log('isLightMode clicked:', isLightMode)
  }

  render() {
    const {isCancel} = this.state
    console.log(isCancel)

    return (
      <MyContext.Consumer>
        {({isLightMode, toggleLightMode}) => (
          // <nav
          //     className={`nav-bar ${
          //       isLightMode ? 'black-styling' : 'white-styling'
          //     }`}
          //   >

          <NavEle
            data-testid="header"
            className="nav-bar"
            isLightMode={isLightMode}
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

            <div className="popup-container">
              <Popup
                trigger={
                  <button
                    className="trigger-button"
                    type="button"
                    onClick={this.logoutClicked}
                  >
                    Logout
                  </button>
                }
                modal
                closeOnDocumentClick
              >
                {close => (
                  <div className="top-banner">
                    <p>Are you sure, you want to logout</p>
                    <button
                      type="button"
                      onClick={() => {
                        this.cancelClicked()
                        close()
                      }}
                    >
                      Cancel
                    </button>
                    <button type="button" onClick={this.confirmClicked}>
                      Confirm
                    </button>
                  </div>
                )}
              </Popup>
            </div>
          </NavEle>
        )}
      </MyContext.Consumer>
    )
  }
}

export default withRouter(Header)
