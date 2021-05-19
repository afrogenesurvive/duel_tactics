import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
// } from '@fortawesome/free-solid-svg-icons';


import './debugBox.css';

const CellInfo = props => {

  let lvlData;
  switch (props.cell.levelData.charAt(0)) {
    case "x":
      lvlData = "free space"
    break;
    case "y":
      lvlData = "obstacle height 1"
    break;
    case "z":
      lvlData = "obstacle height 2"
    break;
  }

  return (
    <div className="cellInfoBox">
      <p className="cellInfoText">
        <strong>
          Cell Info:
        </strong>
      </p>
      <ul class="cellInfoList">
        <li class="cellInfoListItem">
          <p className="cellInfoText">
            No: {props.cell.number.x}, {props.cell.number.y}
          </p>
        </li>
        <li class="cellInfoListItem">
          <p className="cellInfoText">
            Item: {props.cell.item.name}, {props.cell.item.effect}
          </p>
        </li>
        <li class="cellInfoListItem">
          <p className="cellInfoText">
            Item type: {props.cell.item.type}, {props.cell.item.subType}
          </p>
        </li>
        <li class="cellInfoListItem">
          <p className="cellInfoText">
            Level Data: {lvlData}
          </p>
        </li>
        <li class="cellInfoListItem">
          <p className="cellInfoText">
            Void: {props.cell.void.state}
          </p>
        </li>
      </ul>
    </div>
  )
};

export default CellInfo;
