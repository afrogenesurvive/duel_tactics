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

let playerSettings = {
  three: {
    state: false,

  }
}



const Settings = props => {


  const [aiCount, setAiCount] = useState(0);
  const handleAiCountStateChange = (args) => {
    setAiCount(args);
  }
  const [aiRandom, setAiRandom] = useState('random');
  const handleAiRandomStateChange = (args) => {
    if (args === 'custom') {
      props.getCustomAiStartPosList.bind(this, [])
    }
    setAiRandom(args);
  }
  const [aiMission, setAiMission] = useState('pursue');
  const handleAiMissionStateChange = (args) => {
    setAiMission(args);
  }
  const [aiStartPos, setAiStartPos] = useState('pursue');
  const handleAiStartPosStateChange = (args) => {
    setAiStartPos(args);
  }



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

          <Form.Group as={Col} controlId="aiCount" className="formGroup">
            <Form.Label className="formLabel">Ai Players</Form.Label>
            <Form.Control as="select" value={aiCount} onChange={e=>handleAiCountStateChange(e.target.value)}>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        {aiCount > 0 && (
          <Form.Row>
            <Form.Group as={Col} controlId="aiRandom" className="formGroup">
              <Form.Label className="formLabel">Random Settings?</Form.Label>
              <Form.Control as="select" value={aiRandom} onChange={e=>handleAiRandomStateChange(e.target.value)}>
                <option>random</option>
                <option>custom</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        )}

        {aiRandom === 'custom' && (
          <Form.Row>
            <Form.Group as={Col} controlId="aiMission" className="formGroup">
              <Form.Label className="formLabel">Mission</Form.Label>
              <Form.Control as="select" value={aiMission} onChange={e=>handleAiMissionStateChange(e.target.value)}>
                <option>pursue</option>
                <option>patrol</option>
                <option>defend</option>
                <option>retrieve</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        )}

        {aiRandom === 'custom' && (
          <Form.Row>
            <Form.Group as={Col} controlId="aiStartPos" className="formGroup">
              <Form.Label className="formLabel">Start Position</Form.Label>
              <Form.Control as="select" value={aiStartPos} onChange={e=>handleAiStartPosStateChange(e.target.value)}>
                <option>pursue</option>
                <option>patrol</option>
                <option>defend</option>
                <option>retrieve</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        )}


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
