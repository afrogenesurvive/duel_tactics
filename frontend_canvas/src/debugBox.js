import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover';
import {
  faCompass,
  faLocationArrow,
  faSkullCrossbones,
  faCrosshairs,
  faFistRaised,
  faMapMarked,
  faHeartbeat,
  faDice,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import attackInidcate from './assets/indicators/attack.png'
import attackSuccessInidcate from './assets/indicators/attackSuccess.png'
import defendInidcate from './assets/indicators/defend.png'
import deflectInidcate from './assets/indicators/deflect.png'
import deflectInjuredInidcate from './assets/indicators/deflectInjured.png';
import pushbackInidcate from './assets/indicators/pushback.png'
import ghostInidcate from './assets/indicators/ghost.png'
import deathInidcate from './assets/indicators/death.png'
import preAttackInidcate from './assets/indicators/preAttack.png'

import bow from './assets/items/bow.png';
import spear from './assets/items/spear.png';
import sword from './assets/items/sword.png';
import mail from './assets/items/mail1.png';
import greaves from './assets/items/greaves1.png';
import helmet from './assets/items/helmet1.png';

import speed from './assets/indicators/speed.png'


import './debugBox.css';

const DebugBox = props => {

  let singleHitCrit = Math.round((1/props.player.crits.singleHit)*100)
  let doubleHitCrit = Math.round((1/props.player.crits.doubleHit)*100)
  let defendPushBackCrit = Math.round((1/props.player.crits.pushBack)*100)
  let attackPushBackCrit = Math.round((1/(props.player.crits.pushBack*2))*100)
  let gearDropCrit = Math.round((1/(props.player.crits.pushBack+3))*100)
  let guardBreakCrit = Math.round((1/props.player.crits.guardBreak)*100)

  const [state, setState] = useState(false);
  const handleStateChange = () => {
    if (state === true) {
      setState(false);
    }
    if (state === false) {
      setState(true);
    }
   }

  return (
    <div className="debugBoxContainer">
    {state === false && (
      <ul className="debugBoxList">

          <li className="debugBoxListItem">
            <FontAwesomeIcon icon={faFistRaised} size="sm" className="debugBoxIcon" /> :
            <p className="debugBoxText">
             {props.player.action}
            </p>
          </li>

          <li className="debugBoxListItem">
            <FontAwesomeIcon icon={faMapMarked} size="sm" className="debugBoxIcon"/> :
            <p className="debugBoxText">
              {props.player.currentPosition.cell.number.x}, {props.player.currentPosition.cell.number.y}
            </p>
          </li>

          <li className="debugBoxListItem">
            <FontAwesomeIcon icon={faCrosshairs} size="sm" className="debugBoxIcon"/> :
            <p className="debugBoxText">
              {props.player.target.cell.number.x}, {props.player.target.cell.number.y}
            </p>
          </li>

        {props.player.strafing.state !== true &&(

            <li className="debugBoxListItem">
            <FontAwesomeIcon icon={faCompass} size="sm" className="debugBoxIcon"/> :
              <p className="debugBoxText">
                {props.player.direction}
              </p>
            </li>

        )}
        {props.player.strafing.state === true &&(

            <li className="debugBoxListItem">
            <FontAwesomeIcon icon={faCompass} size="sm" className="debugBoxIcon"/> :
              <p className="debugBoxText">
                {props.player.strafing.direction}
              </p>
            </li>

        )}
        {
        //   props.player.strafing.state === true && (
        //   <li className="debugBoxListItem">
        //     <p className="debugBoxText">
        //       <span className="bold">Dir:</span> {props.player.strafing.direction}
        //     </p>
        //   </li>
        // )
        }

        <li className="debugBoxListItem">
          <FontAwesomeIcon icon={faSkullCrossbones} size="sm" className="debugBoxIcon"/> :
          <p className="debugBoxText">
            {props.player.points}
          </p>
        </li>

      </ul>
    )}
    {state === false && (
      <ul className="debugBoxList">

        {
        //   props.player.strafing.state === true && (
        //   <li className="debugBoxListItem">
        //     <p className="debugBoxText">
        //       Strafing!
        //     </p>
        //   </li>
        // )
      }

      <li className="debugBoxListItem">
        <FontAwesomeIcon icon={faHeartbeat} size="sm" className="debugBoxIcon"/> :
        <p className="debugBoxText">
          {props.player.hp}
        </p>
      </li>

      <li className="debugBoxListItem">
      <img src={speed} className="debugBoxIcon" alt="logo"/>
        <p className="debugBoxText">
          {props.player.speed.move}
        </p>
      </li>



        {props.player.hp === 1 && (
          <li className="debugBoxListItem">
            <img src={deflectInjuredInidcate} className="debugBoxImg"></img>
          </li>
        )}
        {props.player.success.attackSuccess.state === true && (
          <li className="debugBoxListItem">
            <img src={attackInidcate} className="debugBoxImg"></img>
          </li>
        )}
        {props.player.success.defendSuccess.state === true && (
          <li className="debugBoxListItem">
            <img src={defendInidcate} className="debugBoxImg"></img>
          </li>
        )}
        {props.player.success.deflected.state === true && (
          <li className="debugBoxListItem">
            <img src={deflectInidcate} className="debugBoxImg"></img>
          </li>
        )}
        {props.player.pushBack.state === true && (
          <li className="debugBoxListItem">
            <img src={pushbackInidcate} className="debugBoxImg"></img>
          </li>
        )}
        {props.player.statusDisplay.state === true && (
          <li className="debugBoxListItem">
            <p className="debugBoxText">
              {props.player.statusDisplay.status}
            </p>
          </li>
        )}

        <li className="debugBoxListItem">
        <a href="javascript:" onClick={handleStateChange}>
          <Button variant="primary" type="button" className="showCritsBtn">
            <FontAwesomeIcon icon={faDice} size="lg" className="debugBoxIcon btnIcon" />
          </Button>
        </a>
        </li>
      </ul>

    )}
    {state === false && (
      <ul className="debugBoxList">
        {props.player.items.weapons.map((weapon) => (

            <li className="debugBoxListItem">
              {props.player.currentWeapon.name !== weapon.name &&
                weapon.type === 'sword' && (
                <img src={sword}></img>
              )}
              {props.player.currentWeapon.name !== weapon.name &&
                weapon.type === 'sword' && (
                <p className="debugBoxText">{weapon.effect}</p>
              )}

              {props.player.currentWeapon.name !== weapon.name &&
                weapon.type === 'spear' && (
                <img src={spear}></img>
              )}
              {props.player.currentWeapon.name !== weapon.name &&
                weapon.type === 'spear' && (
                <p className="debugBoxText">{weapon.effect}</p>
              )}

              {props.player.currentWeapon.name !== weapon.name &&
                weapon.type === 'crossbow' && (
                <img src={bow}></img>
              )}
              {
              //   props.player.currentWeapon.name !== weapon.name &&
              //   weapon.type === 'crossbow' && (
              //   <p className="debugBoxText">{weapon.effect}</p>
              //  )
              }

              {props.player.currentWeapon.name === weapon.name &&
                weapon.type === 'sword' && (
                <img src={sword} className="debugBoxImgSelected"></img>
              )}
              {props.player.currentWeapon.name === weapon.name &&
                weapon.type === 'sword' && (
                <p className="debugBoxText">{weapon.effect}</p>
              )}

              {props.player.currentWeapon.name === weapon.name &&
                weapon.type === 'spear' && (
                <img src={spear} className="debugBoxImgSelected"></img>
              )}
              {props.player.currentWeapon.name === weapon.name &&
                weapon.type === 'spear' && (
                <p className="debugBoxText">{weapon.effect}</p>
              )}

              {props.player.currentWeapon.name === weapon.name &&
                weapon.type === 'crossbow' && (
                <img src={bow} className="debugBoxImgSelected"></img>
              )}

              {props.player.currentWeapon.type === 'crossbow' &&
                weapon.type === 'crossbow' && (
                <p className="debugBoxText">
                  - {props.player.items.ammo}
                </p>
              )}
              {
              //   props.player.currentWeapon.name === weapon.name &&
              //   weapon.type === 'crossbow' && (
              //   <p className="debugBoxText">{weapon.effect}</p>
              // )
            }
            </li>


        ))}
        {props.player.items.armor.map((armor) => (

            <li className="debugBoxListItem">
              {props.player.currentArmor.name !== armor.name &&
                armor.type === 'mail' && (
                <img src={mail}></img>
              )}
              {
                // props.player.currentArmor.name !== armor.name &&
                // armor.type === 'mail' && (
                // <p className="debugBoxText">{armor.effect}</p>
                // )
              }

              {props.player.currentArmor.name !== armor.name &&
                armor.type === 'greaves' && (
                <img src={greaves}></img>
              )}
              {
                // props.player.currentArmor.name !== armor.name &&
                // armor.type === 'greaves' && (
                // <p className="debugBoxText">{armor.effect}</p>
                // )
              }

              {props.player.currentArmor.name !== armor.name &&
                armor.type === 'helmet' && (
                <img src={helmet}></img>
              )}
              {
                // props.player.currentArmor.name !== armor.name &&
                // armor.type === 'helmet' && (
                // <p className="debugBoxText">{armor.effect}</p>
                // )
              }

              {props.player.currentArmor.name === armor.name &&
                armor.type === 'mail' && (
                <img src={mail} className="debugBoxImgSelected"></img>
              )}
              {
                // props.player.currentArmor.name === armor.name &&
                // armor.type === 'mail' && (
                // <p className="debugBoxText">{armor.effect}</p>
                // )
              }

              {props.player.currentArmor.name === armor.name &&
                armor.type === 'greaves' && (
                <img src={greaves} className="debugBoxImgSelected"></img>
              )}
              {
                // props.player.currentArmor.name === armor.name &&
                // armor.type === 'greaves' && (
                // <p className="debugBoxText">{armor.effect}</p>
                // )
              }

              {props.player.currentArmor.name === armor.name &&
                armor.type === 'helmet' && (
                 <img src={helmet} className="debugBoxImgSelected"></img>
              )}
              {
               //  props.player.currentArmor.name === armor.name &&
               //  armor.type === 'helmet' && (
               //   <p className="debugBoxText">{armor.effect}</p>
               // )
              }
            </li>


        ))}

      </ul>

    )}

    {state === true && (

      <ul className="debugBoxList critList">
        <li className="debugBoxListItem">
          <a href="javascript:" onClick={handleStateChange}>
          <Button variant="primary" type="button" className="showCritsBtn">
            <FontAwesomeIcon icon={faUser} size="lg" className="debugBoxIcon btnIcon" />
          </Button>
          </a>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            1 Damage: {singleHitCrit} %
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            2 Damage: {doubleHitCrit} %
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Defend Pushback: {defendPushBackCrit} %
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Defend Deflect: {guardBreakCrit}
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Attack Deflect: {defendPushBackCrit} %
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Attack Pushback: {attackPushBackCrit} %
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Gear Drop: {gearDropCrit} %
          </p>
        </li>
      </ul>
    )}


    </div>
  )
};

export default DebugBox;
