import Popup from 'reactjs-popup'
import {BsX} from 'react-icons/bs'

import 'reactjs-popup/dist/index.css'

const ReactPopUp = () => (
  <div className="popup-container">
    <Popup
      trigger={
        <button className="trigger-button" type="button" aria-label="Close">
          <BsX />
        </button>
      }
    >
      <div className="top-banner">
        <p>Are you sure, you want to logout</p>
        <button type="button">Cancel</button>
        <button type="button">Confirm</button>
      </div>
    </Popup>
  </div>
)
export default ReactPopUp
