import React, {useState} from 'react';

import './debugBox.css';

const DebugBox = props => {

  // console.log(props.player1);

  return (
    <div className="debugBoxContainer">
      <ul className="debugBoxList">
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Action: {props.player.action}
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Current Position: {props.player.currentPosition.cell.number.x}, {props.player.currentPosition.cell.number.y}
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Target: {props.player.target.cell.number.x}, {props.player.target.cell.number.y}
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Direction: {props.player.direction}
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Points: {props.player.points}
          </p>
        </li>
      </ul>
    </div>
  )
};

export default DebugBox;
