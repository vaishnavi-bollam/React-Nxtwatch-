import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import LeftContainer from '../LeftContainer/index'

import Header from '../Header/index'
import {MyContext} from '../MyContext'
import {DarkMainContainer} from '../StyledComponent'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SavedVideos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
      console.log('failed')
    }
  }

  renderSavedVideosView = () => {
    console.log('saved videos route')

    return (
      <MyContext.Consumer>
        {({isLightMode}) => (
          <DarkMainContainer
            data-testid="saved-videos"
            className="videos-main-container"
            isLightMode={isLightMode}
          >
            <div>
              <h1>Left Container</h1>
              <LeftContainer />
            </div>
          </DarkMainContainer>
        )}
      </MyContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  retryClicked = () => this.getTrendingVideos()

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>

      <button type="button" onClick={this.retryClicked}>
        Retry
      </button>
    </div>
  )

  renderAllSavedVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSavedVideosView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Saved Videos</h1>
        <div>{this.renderAllSavedVideos()}</div>
      </div>
    )
  }
}

export default SavedVideos
