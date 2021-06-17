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
import controls from './assets/controls.png'

import './settings.css';

const Settings = props => {

  return (
    <div className="settingsOverlay">
      <div className="settingsContainer">
      <h2 className="settingsHeading">
        Settings :
      </h2>
      <Form onSubmit={props.onConfirm} className="form">
        <Form.Row>
          <Form.Group as={Col} controlId="gridSize" className="formGroup">
            <Form.Label className="formLabel">Grid Size: {props.gridWidth+1} x {props.gridWidth+1}</Form.Label>
            <Form.Control as="select">
              <option>10 x 10</option>
              <option>7 x 7</option>
              <option>4 x 4</option>
              <option>13 x 13</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="input" className="formGroup">
            <Form.Label className="formLabel">Input Source</Form.Label>
            <Form.Control as="select">
              <option>Keyboard</option>
              <option>Gamepad</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="humanPlayers" className="formGroup">
            <Form.Label className="formLabel">Human Players</Form.Label>
            <Form.Control as="select">
              <option>2</option>
              <option>1</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="aiPlayers" className="formGroup">
            <Form.Label className="formLabel">Ai Players</Form.Label>
            <Form.Control as="select">
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>


        <Form.Row className="formBtnRow">
          <div className="btnSubCont">
            <Button variant="success" type="submit" className="formBtn">Submit</Button>
            <Button variant="danger" className="formBtn" onClick={props.onCancel}>Cancel</Button>
          </div>
        </Form.Row>
        </Form>

        <h2 className="settingsHeading">
          Controls :
        </h2>
        <img src={controls} className="controlsImg"></img>


      </div>
    </div>
  )
};

export default Settings;
