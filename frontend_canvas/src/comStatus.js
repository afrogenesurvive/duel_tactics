import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
// } from '@fortawesome/free-solid-svg-icons';


import './debugBox.css';

const ComStatus = props => {

  // let aiPlayers = [];
  // for (const plyr of props.players) {
  //   if (plyr.ai.state === true) {
  //     aiPlayers.push(plyr)
  //   }
  // }

  return (
    <div className="cellInfoBox2">
      <p className="cellInfoText">
        <strong>
          Ai Players:
        </strong>
      </p>
      <ul className="cellInfoList">
        <li className="cellInfoListItem">
          <p className="cellInfoText">
            No: {props.cell.number.x}, {props.cell.number.y}
          </p>
        </li>
      </ul>
    </div>
  )
};

export default ComStatus;
