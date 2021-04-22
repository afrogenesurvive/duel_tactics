import React, {useState} from 'react';

import './debugBox.css';

const DebugBox = props => {

  // console.log(props.player1);

  return (
    <div className="debugBoxContainer">
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
            ...
          </p>
        </li>
      </ul>
    </div>
  )
};

export default DebugBox;
