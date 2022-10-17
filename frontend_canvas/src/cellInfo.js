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
            Coords: {props.clicked.cell.center.x.toFixed(2)}, {props.clicked.cell.center.y.toFixed(2)}
          </p>
        </li>
        <li className="cellInfoListItem">
          <p className="cellInfoText">
            No: {props.clicked.cell.number.x}, {props.clicked.cell.number.y}
          </p>
        </li>

        {props.clicked.player && (
          <li className="cellInfoListItem">
            <OverlayTrigger
              placement={'left'}
              overlay={
                <Popover id={`popover-positioned-${'left'}`}>
                  <Popover.Content>

                    <ul className="popoverList">
                      <li>
                        <p>No: {props.clicked.player.number}</p>
                      </li>
                      <li>
                        <p>HP: {props.clicked.player.hp}</p>
                      </li>
                      <li>
                        <p>A.I: {props.clicked.player.ai.state.toString()}</p>
                      </li>
                      {props.clicked.player.ai.state === true && (
                        <li>
                          <p>Mission: {props.clicked.player.ai.mission}</p>
                        </li>
                      )}
                    </ul>
                  </Popover.Content>
                </Popover>
              }
            >
            <p className="cellInfoText">
              Player: #{props.clicked.player.number}
            </p>
            </OverlayTrigger>

          </li>
        )}

        {props.clicked.cell.item.name !== "" && (
          <li className="cellInfoListItem">
          <OverlayTrigger
            placement={'left'}
            overlay={
              <Popover id={`popover-positioned-${'left'}`}>
                <Popover.Content>
                  <strong className="popoverHead">{props.clicked.cell.item.name} :</strong>
                  <ul className="popoverList">
                    <li>
                      <p>Type: {props.clicked.cell.item.type}</p>
                    </li>
                    <li>
                      <p>Effect: {props.clicked.cell.item.effect}</p>
                    </li>
                  </ul>
                </Popover.Content>
              </Popover>
            }
          >
          <p className="cellInfoText">
            Item: {props.clicked.cell.item.name}
          </p>
          </OverlayTrigger>

          </li>
        )}


        <li className="cellInfoListItem">
          <p className="cellInfoText">
            Level Data: {props.clicked.cell.levelData}
          </p>
        </li>
        <li className="cellInfoListItem">
          <p className="cellInfoText">
            Terrain: {props.clicked.cell.terrain.name}
          </p>
        </li>
        <li className="cellInfoListItem">
          <OverlayTrigger
            placement={'left'}
            overlay={
              <Popover id={`popover-positioned-${'left'}`}>
                <Popover.Content>
                  <strong>{props.clicked.cell.elevation.type}</strong>
                </Popover.Content>
              </Popover>
            }
          >
          <p className="cellInfoText">
            Elevation: {props.clicked.cell.elevation.number}
          </p>
          </OverlayTrigger>

        </li>
        <li className="cellInfoListItem">
          <p className="cellInfoText">
            Void: {props.clicked.cell.void.state.toString()}
          </p>
        </li>
        {props.clicked.cell.obstacle.state === true && (
          <li className="cellInfoListItem">
            <OverlayTrigger
              placement={'left'}
              overlay={
                <Popover id={`popover-positioned-${'left'}`}>
                  <Popover.Content>
                    <strong className="popoverHead">{props.clicked.cell.obstacle.name} :</strong>
                    <ul className="popoverList">
                      <li>
                        <p>Type: {props.clicked.cell.obstacle.type}</p>
                      </li>
                      <li>
                        <p>HP: {props.clicked.cell.obstacle.hp}</p>
                      </li>
                      <li>
                        <p>Height: {props.clicked.cell.obstacle.height}</p>
                      </li>
                      <li>
                        <p>Weight: {props.clicked.cell.obstacle.weight}</p>
                      </li>
                      <li>
                        <p>Destruct: {props.clicked.cell.obstacle.destructible.state.toString()}</p>
                      </li>
                    </ul>
                  </Popover.Content>
                </Popover>
              }
            >
            <p className="cellInfoText">
              Obstacle: {props.clicked.cell.obstacle.name}
            </p>
            </OverlayTrigger>

          </li>
        )}

        {props.clicked.cell.barrier.state === true && (
          <li className="cellInfoListItem">
            <OverlayTrigger
              placement={'left'}
              overlay={
                <Popover id={`popover-positioned-${'left'}`}>
                  <Popover.Content>
                    <strong className="popoverHead">{props.clicked.cell.barrier.name} :</strong>
                    <ul className="popoverList">
                      <li>
                        <p>Type: {props.clicked.cell.barrier.type}</p>
                      </li>
                      <li>
                        <p>Position: {props.clicked.cell.barrier.position}</p>
                      </li>
                      <li>
                        <p>HP: {props.clicked.cell.barrier.hp}</p>
                      </li>
                      <li>
                        <p>Height: {props.clicked.cell.barrier.height}</p>
                      </li>
                      <li>
                        <p>Destruct: {props.clicked.cell.barrier.destructible.state.toString()}</p>
                      </li>
                    </ul>
                  </Popover.Content>
                </Popover>
              }
            >
            <p className="cellInfoText">
              Barrier: {props.clicked.cell.barrier.name}
            </p>


            </OverlayTrigger>

          </li>
        )}

        {props.clicked.cell.rubble == true && (
          <li className="cellInfoListItem">
            <p className="cellInfoText">
              Rubble: {props.clicked.cell.rubble.toString()}
            </p>
          </li>
        )}
      </ul>
    </div>
  )
};

export default CellInfo;
