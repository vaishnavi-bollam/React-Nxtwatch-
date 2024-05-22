import {createContext, Component} from 'react'

const MyContext = createContext()

class MyContextProvider extends Component {
  state = {
    isLightMode: false,
  }

  toggleLightMode = () => {
    const {isLightMode} = this.state
    this.setState(
      prevState => ({isLightMode: !prevState.isLightMode}),
      () => {
        console.log('isLightMode after toggle:', isLightMode)
      },
    )
  }

  render() {
    const {isLightMode} = this.state
    const {children} = this.props
    return (
      <MyContext.Provider
        value={{isLightMode, toggleLightMode: this.toggleLightMode}}
      >
        {children}
      </MyContext.Provider>
    )
  }
}

export {MyContextProvider, MyContext}
