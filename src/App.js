import './App.css'
import {Switch, Route} from 'react-router-dom'
import Login from './components/LoginForm'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import VideosItemDetails from './components/VideosItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/videos/:id" component={VideosItemDetails} />
    <ProtectedRoute exact path="/trending" component={Trending} />
    <ProtectedRoute exact path="/gaming" component={Gaming} />
  </Switch>
)

export default App
