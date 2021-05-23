import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompass,
  faLocationArrow,
  faSkullCrossbones,
  faCrosshairs,
  faFistRaised,
  faMapMarked,
  faHeartbeat,
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

  // console.log(props.player1);

  return (
    <div className="debugBoxContainer">
      <ul className="debugBoxList">
        <li className="debugBoxListItem">
          <FontAwesomeIcon icon={faFistRaised} size="sm" className="debugBoxIcon"/> :
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
      </ul>

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
            // )
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
            {props.player.currentArmor.name !== armor.name &&
              armor.type === 'mail' && (
              <p className="debugBoxText">{armor.effect}</p>
            )}

            {props.player.currentArmor.name !== armor.name &&
              armor.type === 'greaves' && (
              <img src={greaves}></img>
            )}
            {props.player.currentArmor.name !== armor.name &&
              armor.type === 'greaves' && (
              <p className="debugBoxText">{armor.effect}</p>
            )}

            {props.player.currentArmor.name !== armor.name &&
              armor.type === 'helmet' && (
              <img src={helmet}></img>
            )}
            {props.player.currentArmor.name !== armor.name &&
              armor.type === 'helmet' && (
              <p className="debugBoxText">{armor.effect}</p>
            )}

            {props.player.currentArmor.name === armor.name &&
              armor.type === 'mail' && (
              <img src={mail} className="debugBoxImgSelected"></img>
            )}
            {props.player.currentArmor.name === armor.name &&
              armor.type === 'mail' && (
              <p className="debugBoxText">{armor.effect}</p>
            )}

            {props.player.currentArmor.name === armor.name &&
              armor.type === 'greaves' && (
              <img src={greaves} className="debugBoxImgSelected"></img>
            )}
            {props.player.currentArmor.name === armor.name &&
              armor.type === 'greaves' && (
              <p className="debugBoxText">{armor.effect}</p>
            )}

            {props.player.currentArmor.name === armor.name &&
              armor.type === 'helmet' && (
               <img src={helmet} className="debugBoxImgSelected"></img>
            )}
            {props.player.currentArmor.name === armor.name &&
              armor.type === 'helmet' && (
               <p className="debugBoxText">{armor.effect}</p>
            )}
          </li>
        ))}

      </ul>
    </div>
  )
};

export default DebugBox;
