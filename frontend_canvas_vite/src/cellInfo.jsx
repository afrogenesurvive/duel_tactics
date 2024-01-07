import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import "./debugBox.css";

const CellInfo = (props) => {
  return (
    <div
      className="cellInfoBox"
      onMouseEnter={props.setCellInfoMouseOver.bind(this, true, "cellInfo")}
      onMouseLeave={props.setCellInfoMouseOver.bind(this, false, "cellInfo")}>
      <p className="cellInfoText">
        <strong>Cell Info:</strong>
        <span></span>
      </p>

      <FontAwesomeIcon
        icon={faTimesCircle}
        size="sm"
        className="cellInfoClose"
        onClick={props.close}
      />

      <ul className="cellInfoList">
        <li className="cellInfoListItem">
          <p className="cellInfoText">
            X,Y: {props.clicked.cell.center.x.toFixed(2)},{" "}
            {props.clicked.cell.center.y.toFixed(2)}
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
              placement={"left"}
              overlay={
                <Popover id={`popover-positioned-${"left"}`}>
                  <Popover.Body className="popoverBody">
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
                  </Popover.Body>
                </Popover>
              }>
              <p className="cellInfoText">Player: #{props.clicked.player.number}</p>
            </OverlayTrigger>
          </li>
        )}

        {props.clicked.cell.item.name !== "" && (
          <li className="cellInfoListItem">
            <OverlayTrigger
              placement={"left"}
              overlay={
                <Popover id={`popover-positioned-${"left"}`}>
                  <Popover.Body className="popoverBody">
                    <strong className="popoverHead">
                      {props.clicked.cell.item.name} :
                    </strong>
                    <ul className="popoverList">
                      <li>
                        <p>Type: {props.clicked.cell.item.type}</p>
                      </li>
                      <li>
                        <p>Effect: {props.clicked.cell.item.effect}</p>
                      </li>
                    </ul>
                  </Popover.Body>
                </Popover>
              }>
              <p className="cellInfoText">Item: {props.clicked.cell.item.name}</p>
            </OverlayTrigger>
          </li>
        )}

        <li className="cellInfoListItem">
          <p className="cellInfoText">Level Data: {props.clicked.cell.levelData}</p>
        </li>
        <li className="cellInfoListItem">
          <p className="cellInfoText">Terrain: {props.clicked.cell.terrain.name}</p>
        </li>
        <li className="cellInfoListItem">
          <OverlayTrigger
            placement={"left"}
            overlay={
              <Popover id={`popover-positioned-${"left"}`}>
                <Popover.Body className="popoverBody">
                  <strong>{props.clicked.cell.elevation.type}</strong>
                </Popover.Body>
              </Popover>
            }>
            <p className="cellInfoText">
              Elevation: {props.clicked.cell.elevation.number}
            </p>
          </OverlayTrigger>
        </li>
        <li className="cellInfoListItem">
          <p className="cellInfoText">Void: {props.clicked.cell.void.state.toString()}</p>
        </li>
        {props.clicked.cell.obstacle.state === true && (
          <li className="cellInfoListItem">
            <OverlayTrigger
              placement={"left"}
              overlay={
                <Popover
                  id={`popover-positioned-${"left"}`}
                  onMouseEnter={props.setCellInfoMouseOver.bind(this, true, "popover")}
                  onMouseLeave={props.setCellInfoMouseOver.bind(this, false, "popover")}>
                  <Popover.Body className="popoverBody">
                    <strong className="popoverHead">
                      {props.clicked.cell.obstacle.name} :
                    </strong>
                    <ul className="popoverList">
                      <li>
                        <p>Id: {props.clicked.cell.obstacle.id}</p>
                      </li>
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
                        <p>
                          Destruct:{" "}
                          {props.clicked.cell.obstacle.destructible.state.toString()}
                        </p>
                      </li>
                      {props.clicked.cell.obstacle.trap.state === true && (
                        <ul className="popoverList">
                          <li>
                            <p>Trap: </p>
                          </li>
                          <li>
                            <p>
                              Target: {props.clicked.cell.obstacle.trap.target.x},
                              {props.clicked.cell.obstacle.trap.target.y}
                            </p>
                          </li>
                          <li>
                            <p>
                              Trigger: {props.clicked.cell.obstacle.trap.trigger.type}
                            </p>
                          </li>
                          <li>
                            <p>Action: {props.clicked.cell.obstacle.trap.action}</p>
                          </li>
                          <li>
                            <p>
                              Item: {props.clicked.cell.obstacle.trap.item.name} (
                              {props.clicked.cell.obstacle.trap.ammo})
                            </p>
                          </li>
                          <li>
                            <p>
                              Persitent:{" "}
                              {props.clicked.cell.obstacle.trap.persistent.toString()}
                            </p>
                          </li>
                          {!props.clicked.cell.obstacle.trap.persistent && (
                            <li>
                              <p>
                                Remaining: {props.clicked.cell.obstacle.trap.remaining}
                              </p>
                            </li>
                          )}
                        </ul>
                      )}
                    </ul>
                  </Popover.Body>
                </Popover>
              }>
              <p className="cellInfoText">Obstacle: {props.clicked.cell.obstacle.name}</p>
            </OverlayTrigger>
          </li>
        )}

        {props.clicked.cell.barrier.state === true && (
          <li className="cellInfoListItem">
            <OverlayTrigger
              placement={"left"}
              overlay={
                <Popover id={`popover-positioned-${"left"}`}>
                  <Popover.Body className="popoverBody">
                    <strong className="popoverHead">
                      {props.clicked.cell.barrier.name} :
                    </strong>
                    <ul className="popoverList">
                      <li>
                        <p>Id: {props.clicked.cell.barrier.id}</p>
                      </li>
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
                        <p>
                          Destruct:{" "}
                          {props.clicked.cell.barrier.destructible.state.toString()}
                        </p>
                      </li>
                      {props.clicked.cell.barrier.trap.state === true && (
                        <ul className="popoverList">
                          <li>
                            <p>Trap: </p>
                          </li>
                          <li>
                            <p>
                              Target: {props.clicked.cell.barrier.trap.target.x},
                              {props.clicked.cell.barrier.trap.target.y}
                            </p>
                          </li>
                          <li>
                            <p>Trigger: {props.clicked.cell.barrier.trap.trigger.type}</p>
                          </li>
                          <li>
                            <p>Action: {props.clicked.cell.barrier.trap.action}</p>
                          </li>
                          <li>
                            <p>
                              Item: {props.clicked.cell.barrier.trap.item.name} (
                              {props.clicked.cell.barrier.trap.ammo})
                            </p>
                          </li>
                          <li>
                            <p>
                              Persistent:{" "}
                              {props.clicked.cell.barrier.trap.persistent.toString()}
                            </p>
                          </li>
                          {props.clicked.cell.barrier.trap.persistent !== true && (
                            <li>
                              <p>
                                Remaining: {props.clicked.cell.barrier.trap.remaining}
                              </p>
                            </li>
                          )}
                        </ul>
                      )}
                    </ul>
                  </Popover.Body>
                </Popover>
              }>
              <p className="cellInfoText">Barrier: {props.clicked.cell.barrier.name}</p>
            </OverlayTrigger>
          </li>
        )}

        {props.clicked.cell.rubble == true && (
          <li className="cellInfoListItem">
            <p className="cellInfoText">Rubble: {props.clicked.cell.rubble.toString()}</p>
          </li>
        )}
      </ul>
    </div>
  );
};

// <path stroke="#9f99ab" d="M16 3h4M17 4h3M16 5h5M22 5h1M17 6h5M16 7h11M17 8h7M26 8h1M16 9h8M26 9h1M17 10h10M16 11h11M17 12h10M16 13h11M17 14h10M16 15h11M7 16h1M9 16h1M11 16h1M13 16h1M15 16h1M17 16h1M19 16h1M21 16h1M23 16h1M25 16h1M6 17h11M18 17h1M20 17h1M22 17h1M24 17h1M26 17h1M6 18h2M10 18h6M17 18h1M7 19h1M10 19h7M7 20h9M17 20h1M7 21h10M8 22h8M17 22h1M8 23h9M9 24h3M14 24h2M17 24h1M10 25h2M14 25h3M11 26h5M17 26h1M12 27h5M13 28h3M14 29h2M15 30h1M15 31h2" />

// <path stroke="#000000" d="M14 1h6M13 2h1M20 2h1M12 3h1M21 3h1M9 4h3M22 4h3M6 5h3M25 5h3M5 6h1M28 6h1M4 7h1M29 7h1M4 8h1M29 8h1M4 9h1M8 9h1M25 9h1M29 9h1M4 10h1M29 10h1M4 11h1M29 11h1M4 12h1M29 12h1M4 13h1M29 13h1M4 14h1M29 14h1M4 15h1M29 15h1M4 16h1M29 16h1M4 17h1M29 17h1M4 18h1M29 18h1M5 19h1M9 19h1M25 19h1M28 19h1M5 20h1M28 20h1M5 21h1M28 21h1M6 22h1M27 22h1M6 23h1M27 23h1M7 24h1M26 24h1M8 25h1M13 25h1M21 25h1M25 25h1M9 26h1M24 26h1M10 27h1M23 27h1M11 28h1M22 28h1M12 29h1M17 29h1M21 29h1M13 30h1M20 30h1M14 31h1M19 31h1M15 32h4" />

export default CellInfo;
4;
