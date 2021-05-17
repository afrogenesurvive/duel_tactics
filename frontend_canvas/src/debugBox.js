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
            {props.player.currentWeapon.name !== weapon.name &&(
              <p className="debugBoxText">
               {weapon.name}
              </p>
            )}
            {props.player.currentWeapon.name === weapon.name &&(
              <p className="debugBoxText">
               {weapon.name}xx
              </p>
            )}
            {props.player.currentWeapon.type === 'crossbow' &&
              weapon.type === 'crossbow' && (
              <p className="debugBoxText">
                - {props.player.items.ammo}
              </p>
            )}
          </li>
        ))}
        {props.player.items.armor.map((armor) => (
          <li className="debugBoxListItem">
            {props.player.currentArmor.name !== armor.name &&(
              <p className="debugBoxText">
               {armor.name}
              </p>
            )}
            {props.player.currentArmor.name === armor.name &&(
              <p className="debugBoxText">
               {armor.name}xx
              </p>
            )}
          </li>
        ))}

      </ul>
    </div>
  )
};

export default DebugBox;
