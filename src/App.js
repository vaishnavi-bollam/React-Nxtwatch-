import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {MyContextProvider} from './components/MyContext'
import Login from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import VideosItemDetails from './components/VideosItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
// import Header from './components/Header'

// Ensure Header is imported if used directly in App.js

import './App.css'

class App extends Component {
  render() {
    return (
      <MyContextProvider>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideosItemDetails}
          />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </MyContextProvider>
    )
  }
}

export default App
