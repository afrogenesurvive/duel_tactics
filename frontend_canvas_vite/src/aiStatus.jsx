import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretRight,
  faCaretLeft,
  faCompass,
  faLocationArrow,
  faSkullCrossbones,
  faCrosshairs,
  faFistRaised,
  faMapMarked,
  faHeartbeat,
  faDice,
  faUser,
  faBriefcase,
  faRobot,
  faPlus,
  faBullseye,
  faLungs,
} from '@fortawesome/free-solid-svg-icons';

import deflectInjuredInidcate from './assets/indicators/deflectInjured.png';
import bow from './assets/items/bow.png';
import spear from './assets/items/spear.png';
import sword from './assets/items/sword.png';
import mail from './assets/items/mail1.png';
import greaves from './assets/items/greaves1.png';
import helmet from './assets/items/helmet1.png';
import speed from './assets/indicators/speed.png'

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

  const [subMenustate, setSubMenuState] = useState("player");
  const handleSubMenuStateChange = (args) => {
    setSubMenuState(args)
   }

   let staminaPercent;
   let staminaColor;
   if (aiPlayers[state]) {
     staminaPercent = Math.round((aiPlayers[state].stamina.current/20)*100)
     staminaColor = "success";
     if (staminaPercent < 20) {
       staminaColor = "danger";
     }
     if (staminaPercent > 20 && staminaPercent < 60) {
       staminaColor = "warning";
     }
   }


  return (
    <div className="cellInfoBox2">
    <div className="aiStatHeadBox">
      <p className="cellInfoText">
        <strong>
          Ai Players:
        </strong>
      </p>
      <OverlayTrigger
        placement={'top'}
        overlay={
          <Popover id={`popover-positioned-${'top'}`}>
            <Popover.Body>
              <strong>Show Next AI</strong>
            </Popover.Body>
          </Popover>
        }
      >
        <a className="aiStatusBoxSwitch" role="button" data-slide="next" onClick={()=>handleStateChange()}>
          <FontAwesomeIcon icon={faCaretRight} size="sm" className="debugBoxIcon"/>
        </a>
      </OverlayTrigger>


    </div>

    <div className="aiStatHeadBox">

      <OverlayTrigger
        placement={'top'}
        overlay={
          <Popover id={`popover-positioned-${'top'}`}>
            <Popover.Body>
              <strong>Add New AI</strong>
            </Popover.Body>
          </Popover>
        }
      >
        <a className="" role="button" data-slide="next" onClick={props.onAiAdd.bind(this,'random')}>
          <FontAwesomeIcon icon={faPlus} size="sm" className="debugBoxIcon2"/>
        </a>
      </OverlayTrigger>

    </div>



    {aiPlayers[state] && (
      <div className="aiStatusBox">

        <ul className="cellInfoList">
          {
          //   <li className="debugBoxListItem">
          //   <p className="debugBoxText">
          //     # - {aiPlayers[state].number}
          //   </p>
          // </li>
          // <li className="debugBoxListItem">
          //   <FontAwesomeIcon icon={faFistRaised} size="sm" className="debugBoxIcon" /> :
          //   <p className="debugBoxText">
          //     {aiPlayers[state].action}
          //   </p>
          // </li>
          // <li className="debugBoxListItem">
          //   <FontAwesomeIcon icon={faMapMarked} size="sm" className="debugBoxIcon"/> :
          //   <p className="debugBoxText">
          //     {aiPlayers[state].currentPosition.cell.number.x}, {aiPlayers[state].currentPosition.cell.number.y}
          //   </p>
          // </li>
          // <li className="debugBoxListItem">
          //   <FontAwesomeIcon icon={faCrosshairs} size="sm" className="debugBoxIcon"/> :
          //   <p className="debugBoxText">
          //     {aiPlayers[state].target.cell.number.x}, {aiPlayers[state].target.cell.number.y}
          //   </p>
          // </li>
          // {aiPlayers[state].strafing.state !== true &&(
          //   <li className="debugBoxListItem">
          //   <FontAwesomeIcon icon={faCompass} size="sm" className="debugBoxIcon"/> :
          //     <p className="debugBoxText">
          //       {aiPlayers[state].direction}
          //     </p>
          //   </li>
          // )}
          // {aiPlayers[state].strafing.state === true &&(
          //   <li className="debugBoxListItem">
          //     <FontAwesomeIcon icon={faCompass} size="sm" className="debugBoxIcon"/> :
          //     <p className="debugBoxText">
          //       {aiPlayers[state].strafing.direction}
          //     </p>
          //   </li>
          // )}
        }

          <li className="debugBoxListItem">
            <OverlayTrigger
              placement={'top'}
              overlay={
                <Popover id={`popover-positioned-${'top'}`}>
                  <Popover.Body>
                    <strong>AI Player Number</strong>
                  </Popover.Body>
                </Popover>
              }
            >
              <FontAwesomeIcon icon={faUser} size="sm" className="aiStatusIcon"/>
            </OverlayTrigger>

            <p className="debugBoxText">
               - {aiPlayers[state].number}
            </p>
          </li>
          <li className="debugBoxListItem">
            <OverlayTrigger
              placement={'top'}
              overlay={
                <Popover id={`popover-positioned-${'top'}`}>
                  <Popover.Body>
                    <strong>AI Mission</strong>
                  </Popover.Body>
                </Popover>
              }
            >
              <FontAwesomeIcon icon={faBullseye} size="sm" className="aiStatusIcon"/>
            </OverlayTrigger>

            <p className="debugBoxText">
               - {aiPlayers[state].ai.mission}
            </p>
          </li>
          <li className="debugBoxListItem">
            <OverlayTrigger
              placement={'top'}
              overlay={
                <Popover id={`popover-positioned-${'top'}`}>
                  <Popover.Body>
                    <strong>Kills/Points</strong>
                  </Popover.Body>
                </Popover>
              }
            >
              <FontAwesomeIcon icon={faSkullCrossbones} size="sm" className="aiStatusIcon"/>
            </OverlayTrigger>

            <p className="debugBoxText">
               - {aiPlayers[state].points}
            </p>
          </li>
          <li className="debugBoxListItem3">
            <OverlayTrigger
              placement={'top'}
              overlay={
                <Popover id={`popover-positioned-${'top'}`}>
                  <Popover.Body>
                    <strong>Stamina</strong>
                  </Popover.Body>
                </Popover>
              }
            >
              <FontAwesomeIcon icon={faLungs} size="sm" className="aiStatusIcon"/>
            </OverlayTrigger>
             - <ProgressBar className="staminaProgress" now={staminaPercent} variant={staminaColor}/>
          </li>
          <li className="debugBoxListItem">
            <OverlayTrigger
              placement={'top'}
              overlay={
                <Popover id={`popover-positioned-${'top'}`}>
                  <Popover.Body>
                    <strong>HP</strong>
                  </Popover.Body>
                </Popover>
              }
            >
              <FontAwesomeIcon icon={faHeartbeat} size="sm" className="aiStatusIcon"/>
            </OverlayTrigger>
            <p className="debugBoxText">
               - {aiPlayers[state].hp}
            </p>
          </li>

          <li className="debugBoxListItem">
            <OverlayTrigger
              placement={'top'}
              overlay={
                <Popover id={`popover-positioned-${'top'}`}>
                  <Popover.Body>
                    <strong>Movement Speed</strong>
                  </Popover.Body>
                </Popover>
              }
            >
              <img src={speed} className="debugBoxIcon" alt="logo"/>
            </OverlayTrigger>

            <p className="debugBoxText">
               - {aiPlayers[state].speed.move}
            </p>
          </li>
          {aiPlayers[state].hp === 1 && (
            <li className="debugBoxListItem">
              <OverlayTrigger
                placement={'top'}
                overlay={
                  <Popover id={`popover-positioned-${'top'}`}>
                    <Popover.Body>
                      <strong>Player Injured</strong>
                    </Popover.Body>
                  </Popover>
                }
              >
                  <img src={deflectInjuredInidcate} className="debugBoxImg"></img>
              </OverlayTrigger>

            </li>
          )}

          {aiPlayers[state].items.weapons.map((weapon) => (
              <li className="debugBoxListItem">
                {aiPlayers[state].currentWeapon.name !== weapon.name &&
                  weapon.type === 'sword' && (
                    <OverlayTrigger
                      placement={'top'}
                      overlay={
                        <Popover id={`popover-positioned-${'top'}`}>
                          <Popover.Body>
                            <strong>Sword: {aiPlayers[state].currentWeapon.name}</strong>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <img src={sword}></img>
                    </OverlayTrigger>

                )}

                {aiPlayers[state].currentWeapon.name !== weapon.name &&
                  weapon.type === 'spear' && (
                    <OverlayTrigger
                      placement={'top'}
                      overlay={
                        <Popover id={`popover-positioned-${'top'}`}>
                          <Popover.Body>
                            <strong>Spear: {aiPlayers[state].currentWeapon.name}</strong>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <img src={spear}></img>
                    </OverlayTrigger>
                )}

                {aiPlayers[state].currentWeapon.name !== weapon.name &&
                  weapon.type === 'crossbow' && (
                    <OverlayTrigger
                      placement={'top'}
                      overlay={
                        <Popover id={`popover-positioned-${'top'}`}>
                          <Popover.Body>
                            <strong>Crossbow: {aiPlayers[state].currentWeapon.name}</strong>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <img src={bow}></img>
                    </OverlayTrigger>
                )}

                {aiPlayers[state].currentWeapon.name === weapon.name &&
                  weapon.type === 'sword' && (
                    <OverlayTrigger
                      placement={'top'}
                      overlay={
                        <Popover id={`popover-positioned-${'top'}`}>
                          <Popover.Body>
                            <strong>AI is using a Sword: {aiPlayers[state].currentWeapon.name}</strong>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <img src={sword} className="debugBoxImgSelected"></img>
                    </OverlayTrigger>

                )}
                {aiPlayers[state].currentWeapon.name === weapon.name &&
                  weapon.type === 'sword' && (
                  <p className="debugBoxText">{weapon.effect}</p>
                )}

                {aiPlayers[state].currentWeapon.name === weapon.name &&
                  weapon.type === 'spear' && (
                    <OverlayTrigger
                      placement={'top'}
                      overlay={
                        <Popover id={`popover-positioned-${'top'}`}>
                          <Popover.Body>
                            <strong>AI is using a Spear: {aiPlayers[state].currentWeapon.name}</strong>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <img src={spear} className="debugBoxImgSelected"></img>
                    </OverlayTrigger>
                )}
                {aiPlayers[state].currentWeapon.name === weapon.name &&
                  weapon.type === 'spear' && (
                  <p className="debugBoxText">{weapon.effect}</p>
                )}

                {aiPlayers[state].currentWeapon.name === weapon.name &&
                  weapon.type === 'crossbow' && (
                    <OverlayTrigger
                      placement={'top'}
                      overlay={
                        <Popover id={`popover-positioned-${'top'}`}>
                          <Popover.Body>
                            <strong>AI is using a Crossbow: {aiPlayers[state].currentWeapon.name}</strong>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <img src={bow} className="debugBoxImgSelected"></img>
                    </OverlayTrigger>
                )}

                {aiPlayers[state].currentWeapon.type === 'crossbow' &&
                  weapon.type === 'crossbow' && (
                    <OverlayTrigger
                      placement={'top'}
                      overlay={
                        <Popover id={`popover-positioned-${'top'}`}>
                          <Popover.Body>
                            <strong>Ammunition</strong>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <p className="debugBoxText">
                        - {aiPlayers[state].items.ammo}
                      </p>
                    </OverlayTrigger>

                )}
              </li>
          ))}

          {aiPlayers[state].items.armor.map((armor) => (

              <li className="debugBoxListItem">
                {aiPlayers[state].currentArmor.name !== armor.name &&
                  armor.type === 'mail' && (
                    <OverlayTrigger
                      placement={'top'}
                      overlay={
                        <Popover id={`popover-positioned-${'top'}`}>
                          <Popover.Body>
                            <strong>Mail: {armor.name}</strong>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <img src={mail}></img>
                    </OverlayTrigger>

                )}

                {aiPlayers[state].currentArmor.name !== armor.name &&
                  armor.type === 'greaves' && (
                    <OverlayTrigger
                      placement={'top'}
                      overlay={
                        <Popover id={`popover-positioned-${'top'}`}>
                          <Popover.Body>
                            <strong>Greaves: {armor.name}</strong>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <img src={greaves}></img>
                    </OverlayTrigger>
                )}

                {aiPlayers[state].currentArmor.name !== armor.name &&
                  armor.type === 'helmet' && (
                    <OverlayTrigger
                      placement={'top'}
                      overlay={
                        <Popover id={`popover-positioned-${'top'}`}>
                          <Popover.Body>
                            <strong>Helmet: {armor.name}</strong>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <img src={helmet}></img>
                    </OverlayTrigger>
                )}

                {aiPlayers[state].currentArmor.name === armor.name &&
                  armor.type === 'mail' && (
                    <OverlayTrigger
                      placement={'top'}
                      overlay={
                        <Popover id={`popover-positioned-${'top'}`}>
                          <Popover.Body>
                            <strong>AI is wearing Mail: {armor.name}</strong>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <img src={mail} className="debugBoxImgSelected"></img>
                    </OverlayTrigger>

                )}

                {aiPlayers[state].currentArmor.name === armor.name &&
                  armor.type === 'greaves' && (
                    <OverlayTrigger
                      placement={'top'}
                      overlay={
                        <Popover id={`popover-positioned-${'top'}`}>
                          <Popover.Body>
                            <strong>AI is wearing Greaves: {armor.name}</strong>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <img src={greaves} className="debugBoxImgSelected"></img>
                    </OverlayTrigger>
                )}

                {aiPlayers[state].currentArmor.name === armor.name &&
                  armor.type === 'helmet' && (
                    <OverlayTrigger
                      placement={'top'}
                      overlay={
                        <Popover id={`popover-positioned-${'top'}`}>
                          <Popover.Body>
                            <strong>AI is wearing a Helmet: {armor.name}</strong>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <img src={helmet} className="debugBoxImgSelected"></img>
                    </OverlayTrigger>
                )}
              </li>

          ))}
        </ul>



      </div>
    )}


    </div>
  )
};

export default AiStatus;
