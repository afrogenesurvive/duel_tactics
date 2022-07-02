import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar'
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
  faBriefcase,
  faLungs,
} from '@fortawesome/free-solid-svg-icons';
import attackInidcate from './assets/indicators/attackx.png'
import attackSuccessInidcate from './assets/indicators/attackSuccess.png'
import defendInidcate from './assets/indicators/defend.png'
import deflectInidcate from './assets/indicators/deflect.png'
import deflectInjuredInidcate from './assets/indicators/deflectInjured.png';
import pushbackInidcate from './assets/indicators/pushback.png'
import ghostInidcate from './assets/indicators/ghost.png'
import deathInidcate from './assets/indicators/death.png'
import preAttackInidcate from './assets/indicators/preAttack.png'
import stamina from './assets/indicators/stamina.png'

import bow from './assets/items/bow.png';
import spear from './assets/items/spear.png';
import sword from './assets/items/sword.png';
import mail from './assets/items/mail1.png';
import greaves from './assets/items/greaves1.png';
import helmet from './assets/items/helmet1.png';
import unarmed from './assets/items/unarmed.png';

import speed from './assets/indicators/speed.png'


import './debugBox.css';

const DebugBox = props => {



  let singleHitCrit = Math.round((1/(props.player.crits.singleHit+0))*100)
  let singleHitCritSpecialArmorMin = Math.round((1/(props.player.crits.singleHit+5))*100)
  let singleHitCritSpecialArmorMax = Math.round((1/(props.player.crits.singleHit+10))*100)
  let doubleHitCrit = Math.round((1/(props.player.crits.doubleHit+0))*100)
  let doubleHitCritSpear = Math.round((1/(props.player.crits.doubleHit+5))*100)
  let doubleHitCritBackAttack = Math.round((1/2)*100)
  let doubleHitCritSpecialArmorMin = Math.round((1/(props.player.crits.doubleHit+5))*100)
  let doubleHitCritSpecialArmorMax = Math.round((1/(props.player.crits.doubleHit+15))*100)
  let defendPushBackCrit = Math.round((1/(props.player.crits.pushBack*2))*100)
  let attackPushBackCrit = Math.round((1/(props.player.crits.pushBack))*100)
  let gearDropCrit = Math.round((1/(props.player.crits.pushBack+3))*100)
  let guardBreakCrit = Math.round((1/props.player.crits.guardBreak)*100)

  let staminaPercent = Math.round((props.player.stamina.current/20)*100)
  let staminaColor = "success";
  if (staminaPercent < 20) {
    staminaColor = "danger";
  }
  if (staminaPercent > 20 && staminaPercent < 60) {
    staminaColor = "warning";
  }


  const [state, setState] = useState("player");
  const handleStateChange = (type,plyrNo) => {
    setState(type)
    if (type === 'player') {
      props.minimize(plyrNo)
    } else {
      props.expand(plyrNo);
    }

   }

  return (
    <div className="debugBoxContainer">


    {state === 'player' && (
      <ul className="debugBoxList">


        <li className="debugBoxListItem">
          <OverlayTrigger
            placement={'bottom'}
            overlay={
              <Popover id={`popover-positioned-${'bottom'}`}>
                <Popover.Content>
                  <strong>Kills/Points</strong>
                </Popover.Content>
              </Popover>
            }
          >
            <FontAwesomeIcon icon={faSkullCrossbones} size="sm" className="debugBoxIcon"/>
          </OverlayTrigger>

          <p className="debugBoxText">
            {props.player.points}
          </p>
          {
            // <p className="debugBoxText">
            //   {props.player.direction}
            // </p>
          }

        </li>
        <li className="debugBoxListItem3">
          <OverlayTrigger
            placement={'bottom'}
            overlay={
              <Popover id={`popover-positioned-${'bottom'}`}>
                <Popover.Content>
                  <strong>Stamina</strong>
                </Popover.Content>
              </Popover>
            }
          >
            <FontAwesomeIcon icon={faLungs} size="sm" className="debugBoxIcon"/>
          </OverlayTrigger>
          <ProgressBar className="staminaProgress" now={staminaPercent} variant={staminaColor}/>
        </li>


        <li className="debugBoxListItem">
          <OverlayTrigger
            placement={'bottom'}
            overlay={
              <Popover id={`popover-positioned-${'bottom'}`}>
                <Popover.Content>
                  <strong>HP</strong>
                </Popover.Content>
              </Popover>
            }
          >
            <FontAwesomeIcon icon={faHeartbeat} size="sm" className="debugBoxIcon"/>
          </OverlayTrigger>

          <p className="debugBoxText">
            {props.player.hp}
          </p>
        </li>

        <li className="debugBoxListItem">
          <OverlayTrigger
            placement={'bottom'}
            overlay={
              <Popover id={`popover-positioned-${'bottom'}`}>
                <Popover.Content>
                  <strong>Movement Speed</strong>
                </Popover.Content>
              </Popover>
            }
          >
            <img src={speed} className="debugBoxIcon" alt="logo"/>
          </OverlayTrigger>
          <p className="debugBoxText">
            {props.player.speed.move}
          </p>
        </li>

        {props.player.hp === 1 && (
          <li className="debugBoxListItem">
            <OverlayTrigger
              placement={'bottom'}
              overlay={
                <Popover id={`popover-positioned-${'bottom'}`}>
                  <Popover.Content>
                    <strong>Player is Injured</strong>
                  </Popover.Content>
                </Popover>
              }
            >
              <img src={deflectInjuredInidcate} className="debugBoxImg"></img>
            </OverlayTrigger>

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
          {props.player.currentWeapon.name === '' && (
            <OverlayTrigger
              placement={'bottom'}
              overlay={
                <Popover id={`popover-positioned-${'bottom'}`}>
                  <Popover.Content>
                    <strong>Player is Unarmed</strong>
                  </Popover.Content>
                </Popover>
              }
            >
              <img src={unarmed} className="debugBoxImgSelected"></img>
            </OverlayTrigger>

          )}
          {props.player.currentWeapon.type === 'sword' && (
            <OverlayTrigger
              placement={'bottom'}
              overlay={
                <Popover id={`popover-positioned-${'bottom'}`}>
                  <Popover.Content>
                    <strong>Player using a Sword: {props.player.currentWeapon.name}</strong>
                  </Popover.Content>
                </Popover>
              }
            >
              <img src={sword} className="debugBoxImgSelected"></img>
            </OverlayTrigger>

          )}
          {props.player.currentWeapon.type === 'sword' && (
            <p className="debugBoxText">{props.player.currentWeapon.effect}</p>
          )}
          {props.player.currentWeapon.type === 'spear' && (
            <OverlayTrigger
              placement={'bottom'}
              overlay={
                <Popover id={`popover-positioned-${'bottom'}`}>
                  <Popover.Content>
                    <strong>Player using a Spear: {props.player.currentWeapon.name}</strong>
                  </Popover.Content>
                </Popover>
              }
            >
              <img src={spear} className="debugBoxImgSelected"></img>
            </OverlayTrigger>

          )}
          {props.player.currentWeapon.type === 'spear' && (
            <p className="debugBoxText">{props.player.currentWeapon.effect}</p>
          )}

          {props.player.currentWeapon.type === 'crossbow' && (
            <OverlayTrigger
              placement={'bottom'}
              overlay={
                <Popover id={`popover-positioned-${'bottom'}`}>
                  <Popover.Content>
                    <strong>Player using a Crossbow: {props.player.currentWeapon.name}</strong>
                  </Popover.Content>
                </Popover>
              }
            >
              <img src={bow} className="debugBoxImgSelected"></img>
            </OverlayTrigger>

          )}
          {props.player.currentWeapon.type === 'crossbow' && (
            <p className="debugBoxText">
              {props.player.items.ammo}
            </p>
          )}
          {
          //   props.player.currentWeapon.name === weapon.name &&
          //   weapon.type === 'crossbow' && (
          //   <p className="debugBoxText">{weapon.effect}</p>
          // )
          }

        </li>

        <li className="debugBoxListItem">

          {props.player.currentArmor.type === 'mail' && (
            <OverlayTrigger
              placement={'bottom'}
              overlay={
                <Popover id={`popover-positioned-${'bottom'}`}>
                  <Popover.Content>
                    <strong>Player is wearing Mail: {props.player.currentArmor.name}</strong>
                  </Popover.Content>
                </Popover>
              }
            >
              <img src={mail} className="debugBoxImgSelected"></img>
            </OverlayTrigger>

          )}
          {props.player.currentArmor.type === 'greaves' && (
            <OverlayTrigger
              placement={'bottom'}
              overlay={
                <Popover id={`popover-positioned-${'bottom'}`}>
                  <Popover.Content>
                    <strong>Player is wearing Greaves: {props.player.currentArmor.name}</strong>
                  </Popover.Content>
                </Popover>
              }
            >
              <img src={greaves} className="debugBoxImgSelected"></img>
            </OverlayTrigger>

          )}
          {props.player.currentArmor.type === 'helmet' && (
            <OverlayTrigger
              placement={'bottom'}
              overlay={
                <Popover id={`popover-positioned-${'bottom'}`}>
                  <Popover.Content>
                    <strong>Player is wearing a Helmet: {props.player.currentArmor.name}</strong>
                  </Popover.Content>
                </Popover>
              }
            >
              <img src={helmet} className="debugBoxImgSelected"></img>
            </OverlayTrigger>

          )}

        </li>

        <li className="debugBoxListItem">
          <a href="javascript:" onClick={()=>handleStateChange('gear',props.player.number)}>
            <OverlayTrigger
              placement={'bottom'}
              overlay={
                <Popover id={`popover-positioned-${'bottom'}`}>
                  <Popover.Content>
                    <strong>Inventory</strong>
                  </Popover.Content>
                </Popover>
              }
            >
              <Button variant="outline-secondary" type="button" className="showCritsBtn">
                <FontAwesomeIcon icon={faBriefcase} size="lg" className="debugBoxIcon btnIcon" />
              </Button>
            </OverlayTrigger>

          </a>
        </li>

        <li className="debugBoxListItem">
        <a href="javascript:" onClick={()=>handleStateChange("crits",props.player.number)}>
          <OverlayTrigger
            placement={'bottom'}
            overlay={
              <Popover id={`popover-positioned-${'bottom'}`}>
                <Popover.Content>
                  <strong>Crits</strong>
                </Popover.Content>
              </Popover>
            }
          >
          <Button variant="outline-secondary" type="button" className="showCritsBtn">
            <FontAwesomeIcon icon={faDice} size="lg" className="debugBoxIcon btnIcon" />
          </Button>
          </OverlayTrigger>

        </a>
        </li>
      </ul>

    )}
    {
      // state === 'player' && (
      // <ul className="debugBoxList">
      //
      //   <li className="debugBoxListItem">
      //     {props.player.currentWeapon.name === '' && (
      //       <img src={unarmed} className="debugBoxImgSelected"></img>
      //     )}
      //     {props.player.currentWeapon.type === 'sword' && (
      //       <img src={sword} className="debugBoxImgSelected"></img>
      //     )}
      //     {props.player.currentWeapon.type === 'sword' && (
      //       <p className="debugBoxText">{props.player.currentWeapon.effect}</p>
      //     )}
      //     {props.player.currentWeapon.type === 'spear' && (
      //       <img src={spear} className="debugBoxImgSelected"></img>
      //     )}
      //     {props.player.currentWeapon.type === 'spear' && (
      //       <p className="debugBoxText">{props.player.currentWeapon.effect}</p>
      //     )}
      //
      //     {props.player.currentWeapon.type === 'crossbow' && (
      //       <img src={bow} className="debugBoxImgSelected"></img>
      //     )}
      //     {props.player.currentWeapon.type === 'crossbow' && (
      //       <p className="debugBoxText">
      //         - {props.player.items.ammo}
      //       </p>
      //     )}
      //     {
      //     //   props.player.currentWeapon.name === weapon.name &&
      //     //   weapon.type === 'crossbow' && (
      //     //   <p className="debugBoxText">{weapon.effect}</p>
      //     // )
      //     }
      //
      //   </li>
      //
      //   <li className="debugBoxListItem">
      //
      //     {props.player.currentArmor.type === 'mail' && (
      //       <img src={mail} className="debugBoxImgSelected"></img>
      //     )}
      //     {props.player.currentArmor.type === 'greaves' && (
      //       <img src={greaves} className="debugBoxImgSelected"></img>
      //     )}
      //     {props.player.currentArmor.type === 'helmet' && (
      //        <img src={helmet} className="debugBoxImgSelected"></img>
      //     )}
      //
      //   </li>
      //
      //   {
      //   //   props.player.items.weapons.map((weapon) => (
      //   //     <li className="debugBoxListItem">
      //   //       {props.player.currentWeapon.name !== weapon.name &&
      //   //         weapon.type === 'sword' && (
      //   //         <img src={sword}></img>
      //   //       )}
      //   //
      //   //       {props.player.currentWeapon.name !== weapon.name &&
      //   //         weapon.type === 'spear' && (
      //   //         <img src={spear}></img>
      //   //       )}
      //   //
      //   //       {props.player.currentWeapon.name !== weapon.name &&
      //   //         weapon.type === 'crossbow' && (
      //   //         <img src={bow}></img>
      //   //       )}
      //   //
      //   //       {props.player.currentWeapon.name === weapon.name &&
      //   //         weapon.type === 'sword' && (
      //   //         <img src={sword} className="debugBoxImgSelected"></img>
      //   //       )}
      //   //       {props.player.currentWeapon.name === weapon.name &&
      //   //         weapon.type === 'sword' && (
      //   //         <p className="debugBoxText">{weapon.effect}</p>
      //   //       )}
      //   //
      //   //       {props.player.currentWeapon.name === weapon.name &&
      //   //         weapon.type === 'spear' && (
      //   //         <img src={spear} className="debugBoxImgSelected"></img>
      //   //       )}
      //   //       {props.player.currentWeapon.name === weapon.name &&
      //   //         weapon.type === 'spear' && (
      //   //         <p className="debugBoxText">{weapon.effect}</p>
      //   //       )}
      //   //
      //   //       {props.player.currentWeapon.name === weapon.name &&
      //   //         weapon.type === 'crossbow' && (
      //   //         <img src={bow} className="debugBoxImgSelected"></img>
      //   //       )}
      //   //
      //   //       {props.player.currentWeapon.type === 'crossbow' &&
      //   //         weapon.type === 'crossbow' && (
      //   //         <p className="debugBoxText">
      //   //           - {props.player.items.ammo}
      //   //         </p>
      //   //       )}
      //   //       {
      //   //       //   props.player.currentWeapon.name === weapon.name &&
      //   //       //   weapon.type === 'crossbow' && (
      //   //       //   <p className="debugBoxText">{weapon.effect}</p>
      //   //       // )
      //   //       }
      //   //     </li>
      //   // ))
      //   }
      //   {
      //   //   props.player.items.armor.map((armor) => (
      //   //
      //   //     <li className="debugBoxListItem">
      //   //       {props.player.currentArmor.name !== armor.name &&
      //   //         armor.type === 'mail' && (
      //   //         <img src={mail}></img>
      //   //       )}
      //   //       {
      //   //         // props.player.currentArmor.name !== armor.name &&
      //   //         // armor.type === 'mail' && (
      //   //         // <p className="debugBoxText">{armor.effect}</p>
      //   //         // )
      //   //       }
      //   //
      //   //       {props.player.currentArmor.name !== armor.name &&
      //   //         armor.type === 'greaves' && (
      //   //         <img src={greaves}></img>
      //   //       )}
      //   //       {
      //   //         // props.player.currentArmor.name !== armor.name &&
      //   //         // armor.type === 'greaves' && (
      //   //         // <p className="debugBoxText">{armor.effect}</p>
      //   //         // )
      //   //       }
      //   //
      //   //       {props.player.currentArmor.name !== armor.name &&
      //   //         armor.type === 'helmet' && (
      //   //         <img src={helmet}></img>
      //   //       )}
      //   //       {
      //   //         // props.player.currentArmor.name !== armor.name &&
      //   //         // armor.type === 'helmet' && (
      //   //         // <p className="debugBoxText">{armor.effect}</p>
      //   //         // )
      //   //       }
      //   //
      //   //       {props.player.currentArmor.name === armor.name &&
      //   //         armor.type === 'mail' && (
      //   //         <img src={mail} className="debugBoxImgSelected"></img>
      //   //       )}
      //   //       {
      //   //         // props.player.currentArmor.name === armor.name &&
      //   //         // armor.type === 'mail' && (
      //   //         // <p className="debugBoxText">{armor.effect}</p>
      //   //         // )
      //   //       }
      //   //
      //   //       {props.player.currentArmor.name === armor.name &&
      //   //         armor.type === 'greaves' && (
      //   //         <img src={greaves} className="debugBoxImgSelected"></img>
      //   //       )}
      //   //       {
      //   //         // props.player.currentArmor.name === armor.name &&
      //   //         // armor.type === 'greaves' && (
      //   //         // <p className="debugBoxText">{armor.effect}</p>
      //   //         // )
      //   //       }
      //   //
      //   //       {props.player.currentArmor.name === armor.name &&
      //   //         armor.type === 'helmet' && (
      //   //          <img src={helmet} className="debugBoxImgSelected"></img>
      //   //       )}
      //   //       {
      //   //        //  props.player.currentArmor.name === armor.name &&
      //   //        //  armor.type === 'helmet' && (
      //   //        //   <p className="debugBoxText">{armor.effect}</p>
      //   //        // )
      //   //       }
      //   //     </li>
      //   //
      //   //
      //   // ))
      //   }
      //   <li className="debugBoxListItem">
      //   <a href="javascript:" onClick={()=>handleStateChange('gear')}>
      //     <Button variant="primary" type="button" className="showCritsBtn">
      //       <FontAwesomeIcon icon={faBriefcase} size="lg" className="debugBoxIcon btnIcon" />
      //     </Button>
      //   </a>
      //   </li>
      //
      // </ul>
      // )
    }
    {state === 'crits' && (

      <div>
      <ul className="debugBoxList">
      <li className="debugBoxListItem">
        <a href="javascript:" onClick={()=>handleStateChange("player",props.player.number)}>
        <Button variant="outline-secondary" type="button" className="showCritsBtn">
          <FontAwesomeIcon icon={faUser} size="lg" className="debugBoxIcon btnIcon" />
        </Button>
        </a>
      </li>
      </ul>
      <ul className="debugBoxList">

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
            2 Damage w/ Spear: {doubleHitCritSpear} %
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            2 Damage from behind: max {doubleHitCritBackAttack} %
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Defend Pushback: {defendPushBackCrit} %
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Defend Deflect: {guardBreakCrit} %
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            Attack Deflect: 50 %
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
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            1 Damage vs Evasive Armor: from {singleHitCritSpecialArmorMin} % to {singleHitCritSpecialArmorMax} %
          </p>
        </li>
        <li className="debugBoxListItem">
          <p className="debugBoxText">
            2 Damage vs Evasive Armor: from {doubleHitCritSpecialArmorMin} % to {doubleHitCritSpecialArmorMax} %
          </p>
        </li>
      </ul>
      </div>

    )}
    {state === 'gear' &&(
      <div>
        <ul className="debugBoxList">
          <li className="debugBoxListItem">
          <a href="javascript:" onClick={()=>handleStateChange("player",props.player.number)}>
          <Button variant="outline-secondary" type="button" className="showCritsBtn">
            <FontAwesomeIcon icon={faUser} size="lg" className="debugBoxIcon btnIcon" />
          </Button>
          </a>
          </li>
        </ul>
        <ul className="debugBoxList">

            {props.player.currentWeapon.name === '' && (
              <div className="gearDetails">
              <img src={unarmed} className="debugBoxImgSelected"></img>
              <p className="debugBoxText">Name: Unarmed</p>
              </div>
            )}

            {props.player.items.weapons.map((weapon) => (

                <li className="debugBoxListItem">



                  {props.player.currentWeapon.name !== weapon.name &&
                    weapon.type === 'sword' && (
                    <div className="gearDetails">
                    <img src={sword}></img>
                    <p className="debugBoxText">Name: {weapon.name}</p>
                    <p className="debugBoxText">Type: {weapon.type}</p>
                    <p className="debugBoxText">Effect: {weapon.effect}</p>
                    </div>
                  )}


                  {props.player.currentWeapon.name !== weapon.name &&
                    weapon.type === 'spear' && (
                    <div className="gearDetails">
                    <img src={spear}></img>
                    <p className="debugBoxText">Name: {weapon.name}</p>
                    <p className="debugBoxText">Type: {weapon.type}</p>
                    <p className="debugBoxText">Effect: {weapon.effect}</p>
                    </div>
                  )}


                  {props.player.currentWeapon.name !== weapon.name &&
                    weapon.type === 'crossbow' && (
                    <div className="gearDetails">
                    <img src={bow}></img>
                    <p className="debugBoxText">Name: {weapon.name}</p>
                    <p className="debugBoxText">Type: {weapon.type}</p>
                    <p className="debugBoxText">Effect: {weapon.effect}</p>
                    <p className="debugBoxText">
                      Ammo: {props.player.items.ammo}
                    </p>
                    </div>
                  )}


                  {props.player.currentWeapon.name === weapon.name &&
                    weapon.type === 'sword' && (
                    <div className="gearDetails">
                    <img src={sword} className="debugBoxImgSelected"></img>
                    <p className="debugBoxText">Name: {weapon.name}</p>
                    <p className="debugBoxText">Type: {weapon.type}</p>
                    <p className="debugBoxText">Effect: {weapon.effect}</p>
                    </div>
                  )}


                  {props.player.currentWeapon.name === weapon.name &&
                    weapon.type === 'spear' && (
                    <div className="gearDetails">
                    <img src={spear} className="debugBoxImgSelected"></img>
                    <p className="debugBoxText">Name: {weapon.name}</p>
                    <p className="debugBoxText">Type: {weapon.type}</p>
                    <p className="debugBoxText">Effect: {weapon.effect}</p>
                    </div>
                  )}

                  {props.player.currentWeapon.name === weapon.name &&
                    weapon.type === 'crossbow' && (
                    <div className="gearDetails">
                    <img src={bow} className="debugBoxImgSelected"></img>
                    <p className="debugBoxText">Name: {weapon.name}</p>
                    <p className="debugBoxText">Type: {weapon.type}</p>
                    <p className="debugBoxText">Effect: {weapon.effect}</p>
                    <p className="debugBoxText">
                      Ammo: {props.player.items.ammo}
                    </p>
                    </div>
                  )}
                </li>


            ))}
            {props.player.items.armor.map((armor) => (

                <li className="debugBoxListItem">

                  {props.player.currentArmor.name !== armor.name &&
                    armor.type === 'mail' && (
                    <div className="gearDetails">
                      <img src={mail}></img>
                      <p className="debugBoxText">Name: {armor.name}</p>
                      <p className="debugBoxText">Type: {armor.type}</p>
                      <p className="debugBoxText">Effect: {armor.effect}</p>
                    </div>
                  )}


                  {props.player.currentArmor.name !== armor.name &&
                    armor.type === 'greaves' && (
                    <div className="gearDetails">
                      <img src={greaves}></img>
                      <p className="debugBoxText">Name: {armor.name}</p>
                      <p className="debugBoxText">Type: {armor.type}</p>
                      <p className="debugBoxText">Effect: {armor.effect}</p>
                    </div>
                  )}


                  {props.player.currentArmor.name !== armor.name &&
                    armor.type === 'helmet' && (
                    <div className="gearDetails">
                      <img src={helmet}></img>
                      <p className="debugBoxText">Name: {armor.name}</p>
                      <p className="debugBoxText">Type: {armor.type}</p>
                      <p className="debugBoxText">Effect: {armor.effect}</p>
                    </div>
                  )}


                  {props.player.currentArmor.name === armor.name &&
                    armor.type === 'mail' && (
                    <div className="gearDetails">
                      <img src={mail} className="debugBoxImgSelected"></img>
                      <p className="debugBoxText">Name: {armor.name}</p>
                      <p className="debugBoxText">Type: {armor.type}</p>
                      <p className="debugBoxText">Effect: {armor.effect}</p>
                    </div>
                  )}


                  {props.player.currentArmor.name === armor.name &&
                    armor.type === 'greaves' && (
                    <div className="gearDetails">
                      <img src={greaves} className="debugBoxImgSelected"></img>
                      <p className="debugBoxText">Name: {armor.name}</p>
                      <p className="debugBoxText">Type: {armor.type}</p>
                      <p className="debugBoxText">Effect: {armor.effect}</p>
                    </div>
                  )}


                  {props.player.currentArmor.name === armor.name &&
                    armor.type === 'helmet' && (
                    <div className="gearDetails">
                      <img src={helmet} className="debugBoxImgSelected"></img>
                       <p className="debugBoxText">Name: {armor.name}</p>
                       <p className="debugBoxText">Type: {armor.type}</p>
                       <p className="debugBoxText">Effect: {armor.effect}</p>
                     </div>
                   )}
                </li>


            ))}
        </ul>
      </div>

    )}

    </div>
  )
};

export default DebugBox;
