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
        {props.player.success.attackSuccess.state === true && (
          <li className="debugBoxListItem">
            <p className="debugBoxText">
              Attack Success!
            </p>
          </li>
        )}
        {props.player.success.defendSuccess.state === true && (
          <li className="debugBoxListItem">
            <p className="debugBoxText">
              Defend Success!
            </p>
          </li>
        )}
        {props.player.success.deflected.state === true && (
          <li className="debugBoxListItem">
            <p className="debugBoxText">
              Attack Deflected!!!
            </p>
          </li>
        )}
      </ul>
    </div>
  )
};

export default DebugBox;
