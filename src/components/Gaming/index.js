import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header/index'
import GamingCard from '../GamingCard/index'
import LeftContainer from '../LeftContainer/index'
import {MyContext} from '../MyContext'
import {DarkMainContainer} from '../StyledComponent'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    trendingGamingData: [],
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
    const url = 'https://apis.ccbp.in/videos/gaming'
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
        id: eachVideo.id,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        trendingGamingData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
      console.log('failed')
    }
  }

  renderVideosListView = () => {
    const {trendingGamingData} = this.state
    return (
      <MyContext.Consumer>
        {({isLightMode}) => (
          <DarkMainContainer
            data-testid="gaming"
            className="videos-main-container"
            isLightMode={isLightMode}
          >
            <div>
              <LeftContainer />
            </div>

            <ul className="trending-videos-container">
              <h1>Gaming</h1>
              {trendingGamingData.map(each => (
                <GamingCard each={each} key={each.id} />
              ))}
            </ul>
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
      <p>We are having some trouble</p>
      <button type="button" onClick={this.retryClicked}>
        Retry
      </button>
    </div>
  )

  renderAllGamingVideos = () => {
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
    return (
      <div>
        <Header />
        <h1>Trending page</h1>
        <div>{this.renderAllGamingVideos()}</div>
      </div>
    )
  }
}

export default Gaming
