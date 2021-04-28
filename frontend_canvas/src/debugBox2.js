import React, {useState} from 'react';

import './debugBox.css';

const DebugBox = props => {

  // console.log(props.player1);

  return (
    <div className="debugBoxContainer2">
      <ul className="debugBoxList">
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Action: {props.player1.action}
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Current Position: {props.player1.currentPosition.cell.number.x}, {props.player1.currentPosition.cell.number.y}
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Target: {props.player1.target.cell.number.x}, {props.player1.target.cell.number.y}
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Direction: {props.player1.direction}
          </p>
        </li>
      </ul>
    </div>
  )
};

export default DebugBox;
