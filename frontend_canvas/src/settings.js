import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompass,
  faLocationArrow,
  faSkullCrossbones,
  faCrosshairs,
  faFistRaised,
  faMapMarked,

} from '@fortawesome/free-solid-svg-icons';
import attackInidcate from './assets/indicators/attack.png'
import attackSuccessInidcate from './assets/indicators/attackSuccess.png'
import defendInidcate from './assets/indicators/defend.png'
import deflectInidcate from './assets/indicators/deflect.png'
import pushbackInidcate from './assets/indicators/pushback.png'
import ghostInidcate from './assets/indicators/ghost.png'
import deathInidcate from './assets/indicators/death.png'
import preAttackInidcate from './assets/indicators/preAttack.png'


import './settings.css';

const Settings = props => {

  // console.log(props.player1);

  return (
    <div class="settingsOverlay">
      <div className="settingsContainer">
      <Form onSubmit={props.onConfirm}>
        <Form.Row>
            <Form.Group as={Col} controlId="gridSize" className="formGroup">
              <Form.Label className="formLabel">Grid Size </Form.Label>
              <Form.Control as="select">
                <option>4 x 4</option>
                <option>7 x 7</option>
                <option>10 x 10</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row className="formBtnRow">
            <Button variant="success" type="submit" className="addFormBtn">Submit</Button>
            <Button variant="danger" className="addFormBtn" onClick={props.onCancel}>Cancel</Button>
          </Form.Row>
        </Form>
      </div>
    </div>
  )
};

export default Settings;