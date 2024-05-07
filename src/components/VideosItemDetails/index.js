import {Component} from 'react'
// import YouTube from 'react-youtube'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import LeftContainer from '../LeftContainer/index'
import Header from '../Header/index'
import SavedVideos from '../SavedVideos/index'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideosItemDetails extends Component {
  state = {
    eachVideosList: [],
    apiStatus: apiStatusConstants.initial,
    isSaveClicked: false,
  }

  componentDidMount() {
    this.getVideoData()
  }

  getFormattedData = data => ({
    publishedAt: data.published_at,
    description: data.description,
    thumbnailUrl: data.thumbnail_url,
    id: data.id,
    title: data.title,
    videoUrl: data.video_url,
    viewCount: data.view_count,
    name: data.channel.name,
    profileImageUrl: data.channel.profile_image_url,
    subscriberCount: data.subscriber_count,
  })

  getVideoData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = this.getFormattedData(fetchedData.video_details)

      this.setState({
        eachVideosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
      console.log('failed')
    }
  }

  getYouTubeVideoId = url => {
    const videoId = url.split('v=')[1]
    const ampersandPosition = videoId.indexOf('&')
    if (ampersandPosition !== -1) {
      return videoId.substring(0, ampersandPosition)
    }
    return videoId
  }

  toggleSave = () => {
    this.setState(prevState => ({
      isSaveClicked: !prevState.isSaveClicked,
    }))
  }

  renderVideosListView = () => {
    const {eachVideosList, isSaveClicked} = this.state
    const {
      publishedAt,
      description,
      thumbnailUrl,
      id,
      title,
      videoUrl,
      viewCount,
      name,
      profileImageUrl,
      subscriberCount,
    } = eachVideosList

    const opts = {
      height: '315',
      width: '700',
      playerVars: {
        autoplay: 1,
      },
    }

    const dateString = publishedAt
    const dateParts = dateString.split(' ')
    const month = dateParts[0]
    const day = parseInt(dateParts[1].replace(',', ''))
    const year = parseInt(dateParts[2])

    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    }
    const monthNumber = monthMap[month]

    // Create a new Date object
    const date = new Date(year, monthNumber, day)

    console.log(formatDistanceToNow(date))
    return (
      <div>
        <h1>video</h1>
        {/* <YouTube videoId={this.getYouTubeVideoId(videoUrl)} opts={opts} /> */}
        <img src={videoUrl} />
        <br />
        <p>{title}</p>
        <p>{viewCount} views</p>
        <p>{formatDistanceToNow(date)} ago</p>
        <p>Like</p>
        <p>Dislike</p>
        {/* <p onClick={this.toggleSave}>{isSaveClicked ? 'Unsave' : 'Save'}</p> */}
        {/* {isSaveClicked && <SavedVideos eachVideosList={eachVideosList} />} */}
        <hr />
        <img src={profileImageUrl} />
        <p>{name}</p>
        <p>{subscriberCount}</p>
        <p>{description}</p>
      </div>
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
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <p>We cannot seem to find the page you are looking for</p>
      <button>Retry</button>
    </div>
  )

  renderEachJob = () => {
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
        <div className="each-video-container">
          <div>
            <LeftContainer />
          </div>
          <div>{this.renderEachJob()}</div>
        </div>
      </div>
    )
  }
}

export default VideosItemDetails
