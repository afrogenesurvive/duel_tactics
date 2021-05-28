import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faCaretLeft,
} from '@fortawesome/free-solid-svg-icons';


import './debugBox.css';

const AiStatus = props => {

  let aiPlayers = [];
  for (const plyr of props.players) {
    if (plyr.ai.state === true) {
      aiPlayers.push(plyr)
    }
  }

  const [state, setState] = useState(0);
  const handleStateChange = () => {
    if (state + 1 > aiPlayers.length-1) {
      setState(0)
    } else {
      let newState = state+1;
      setState(newState)
    }
  }

  return (
    <div className="cellInfoBox2">
    <p className="cellInfoText">
      <strong>
        Ai Players:
      </strong>
    </p>

    {aiPlayers[state] && (
      <div className="aiStatusBox">

        <ul className="cellInfoList">
          <li className="cellInfoListItem">
            <p className="cellInfoText">
              {aiPlayers[state].number}
            </p>
          </li>
        </ul>

        <a className="aiStatusBoxSwitch" role="button" data-slide="next" onClick={()=>handleStateChange()}>
          <FontAwesomeIcon icon={faCaretRight} size="sm" className="debugBoxIcon"/>
        </a>

      </div>
    )}


    </div>
  )
};

export default AiStatus;
