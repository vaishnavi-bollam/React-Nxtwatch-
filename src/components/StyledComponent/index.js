import styled from 'styled-components'

export const DarkMainContainer = styled.div`
  background-color: ${({isLightMode}) => (isLightMode ? '#0f0f0f' : 'white')};
  color: ${({isLightMode}) => (isLightMode ? 'white' : '#0f0f0f')};
`

export const NavEle = styled.nav`
  background-color: ${({isLightMode}) => (isLightMode ? '#0f0f0f' : 'white')};
  color: ${({isLightMode}) => (isLightMode ? 'white' : '#0f0f0f')};
`
