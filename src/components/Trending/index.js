import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header/index'
import TrendingCard from '../TrendingCard/index'
import LeftContainer from '../LeftContainer/index'
import {MyContext} from '../MyContext'
import {DarkMainContainer} from '../StyledComponent'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    trendingProductsData: [],
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
        trendingProductsData: updatedData,
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
    const {trendingProductsData} = this.state
    return (
      <MyContext.Consumer>
        {({isLightMode}) => (
          <DarkMainContainer
            data-testid="trending"
            className="videos-main-container"
            isLightMode={isLightMode}
          >
            <div>
              <LeftContainer />
            </div>
            {/* <h1>Trending</h1> */}
            <ul className="trending-videos-container">
              <h1>Trending</h1>
              {trendingProductsData.map(each => (
                <TrendingCard each={each} key={each.id} />
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

  renderAllTrendingVideos = () => {
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

        <div>{this.renderAllTrendingVideos()}</div>
      </div>
    )
  }
}

export default Trending
