import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
// import {CiSearch} from 'react-icons'
import {BsX} from 'react-icons/bs'

import Header from '../Header/index'
import VideoCard from '../VideoCard/index'
import LeftContainer from '../LeftContainer/index'
import {MyContext} from '../MyContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    productsData: [],
    apiStatus: apiStatusConstants.initial,
    isBannerVisible: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const {productsData, apiStatus} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/all?search='
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.videos.map(eachVideo => ({
        channelName: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        productsData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  closeBanner = () => {
    this.setState({isBannerVisible: false})
  }

  renderVideosListView = () => {
    const {productsData} = this.state
    return (
      <MyContext.Consumer>
        {({isLightMode}) => (
          <div
            className={`videos-main-container ${
              isLightMode ? 'black-styling' : 'white-styling'
            }`}
          >
            <div>
              <LeftContainer />
            </div>
            <ul className="videos-container">
              {productsData.map(each => (
                <VideoCard each={each} key={each.id} />
              ))}
            </ul>
          </div>
        )}
      </MyContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <button type="button">Retry</button>
    </div>
  )

  renderAllVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {isBannerVisible} = this.state
    return (
      <div className="main-home-container">
        <Header />
        <h1>Home page</h1>
        {/* <div className="top-banner">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
          />
          <p>Buy Nxt Watch Premium UPIs with UPI</p>

          <button type="button">GET IT NOW</button>
        </div> */}
        {isBannerVisible && (
          <div className="top-banner">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="nxt watch logo"
            />
            <p>Buy Nxt Watch Premium UPIs with UPI</p>
            <button type="button">GET IT NOW</button>
            <button
              type="button"
              className="close-button"
              onClick={this.closeBanner}
              aria-label="Close"
            >
              <BsX />
            </button>
          </div>
        )}

        <div>{this.renderAllVideos()}</div>
      </div>
    )
  }
}

export default Home
