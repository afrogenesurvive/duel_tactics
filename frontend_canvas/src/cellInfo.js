import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover';
import {
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';


import './debugBox.css';

const CellInfo = props => {

  // console.log('cell info :',props.cell);

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
        <span>

        </span>
      </p>

      <FontAwesomeIcon icon={faTimesCircle} size="sm" className="cellInfoClose" onClick={props.close}/>

      <ul className="cellInfoList">
        <li className="cellInfoListItem">
          <p className="cellInfoText">
            No: {props.cell.number.x}, {props.cell.number.y}
          </p>
        </li>
        {props.cell.item.name !== "" && (
          <li className="cellInfoListItem">
          <OverlayTrigger
            placement={'left'}
            overlay={
              <Popover id={`popover-positioned-${'left'}`}>
                <Popover.Content>
                  <strong className="popoverHead">{props.cell.item.name} :</strong>
                  <ul className="popoverList">
                    <li>
                      <p>Type: {props.cell.item.type}</p>
                    </li>
                    <li>
                      <p>Effect: {props.cell.item.effect}</p>
                    </li>
                  </ul>
                </Popover.Content>
              </Popover>
            }
          >
          <p className="cellInfoText">
            Item: {props.cell.item.name}
          </p>
          </OverlayTrigger>

          </li>
        )}


        <li className="cellInfoListItem">
          <p className="cellInfoText">
            Level Data: {props.cell.levelData}
          </p>
        </li>
        <li className="cellInfoListItem">
          <p className="cellInfoText">
            Terrain: {props.cell.terrain.name}
          </p>
        </li>
        <li className="cellInfoListItem">
          <OverlayTrigger
            placement={'left'}
            overlay={
              <Popover id={`popover-positioned-${'left'}`}>
                <Popover.Content>
                  <strong>{props.cell.elevation.type}</strong>
                </Popover.Content>
              </Popover>
            }
          >
          <p className="cellInfoText">
            Elevation: {props.cell.elevation.number}
          </p>
          </OverlayTrigger>

        </li>
        <li className="cellInfoListItem">
          <p className="cellInfoText">
            Void: {props.cell.void.state.toString()}
          </p>
        </li>
        {props.cell.obstacle.state === true && (
          <li className="cellInfoListItem">
            <OverlayTrigger
              placement={'left'}
              overlay={
                <Popover id={`popover-positioned-${'left'}`}>
                  <Popover.Content>
                    <strong className="popoverHead">{props.cell.obstacle.name} :</strong>
                    <ul className="popoverList">
                      <li>
                        <p>Type: {props.cell.obstacle.type}</p>
                      </li>
                      <li>
                        <p>HP: {props.cell.obstacle.hp}</p>
                      </li>
                      <li>
                        <p>Height: {props.cell.obstacle.height}</p>
                      </li>
                      <li>
                        <p>Weight: {props.cell.obstacle.weight}</p>
                      </li>
                      <li>
                        <p>Destruct: {props.cell.obstacle.destructible.state.toString()}</p>
                      </li>
                    </ul>
                  </Popover.Content>
                </Popover>
              }
            >
            <p className="cellInfoText">
              Obstacle: {props.cell.obstacle.name}
            </p>
            </OverlayTrigger>

          </li>
        )}

        {props.cell.barrier.state === true && (
          <li className="cellInfoListItem">
            <OverlayTrigger
              placement={'left'}
              overlay={
                <Popover id={`popover-positioned-${'left'}`}>
                  <Popover.Content>
                    <strong className="popoverHead">{props.cell.barrier.name} :</strong>
                    <ul className="popoverList">
                      <li>
                        <p>Type: {props.cell.barrier.type}</p>
                      </li>
                      <li>
                        <p>HP: {props.cell.barrier.hp}</p>
                      </li>
                      <li>
                        <p>Height: {props.cell.barrier.height}</p>
                      </li>
                      <li>
                        <p>Destruct: {props.cell.barrier.destructible.state.toString()}</p>
                      </li>
                    </ul>
                  </Popover.Content>
                </Popover>
              }
            >
            <p className="cellInfoText">
              Barrier: {props.cell.barrier.name}
            </p>
            </OverlayTrigger>

          </li>
        )}
      </ul>
    </div>
  )
};

export default CellInfo;
