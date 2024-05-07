// import {Component} from 'react'

// class SavedVideos extends Component {
//   render() {
//     return (
//       <div>
//         <h1>Saved videos</h1>
//       </div>
//     )
//   }
// }

// export default SavedVideos

// import {Component} from 'react'

// class SavedVideos extends Component {
//   state = {
//     savedVideosList: [],
//   }

//   componentDidUpdate(prevProps) {
//     const {savedVideosList} = this.state
//     const {eachVideosList} = this.props
//     if (prevProps.eachVideosList !== this.props.eachVideosListt) {
//       const {eachVideosList} = this.props

//       const isAlreadySaved = savedVideosList.some(
//         video => video.id === eachVideosList.id,
//       )
//       if (!isAlreadySaved) {
//         // Add the video to the saved list
//         this.setState(prevState => ({
//           savedVideosList: [...prevState.savedVideosList, eachVideosList],
//         }))
//       } else {
//         // If the video is already saved, remove it from the saved list
//         this.removeFromSaved(eachVideosList.id)
//       }
//     }
//   }

//   removeFromSaved = id => {
//     // Remove the video from the saved list based on its id
//     this.setState(prevState => ({
//       savedVideosList: prevState.savedVideosList.filter(
//         video => video.id !== id,
//       ),
//     }))
//   }

//   render() {
//     const {savedVideosList} = this.state

//     return (
//       <div>
//         <h2>Saved Videos</h2>
//         {savedVideosList.length === 0 ? (
//           <p>No saved videos</p>
//         ) : (
//           <ul>
//             {savedVideosList.map(video => (
//               <li key={video.id}>
//                 <p>{video.title}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     )
//   }
// }

// export default SavedVideos
