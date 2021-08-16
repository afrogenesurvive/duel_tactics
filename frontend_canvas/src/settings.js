import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
// let playerNumbers = [];


const Settings = (props) => {

  const [aiCount, setAiCount] = useState({
    count: 0,
    playerNumbers: [],
  });
  const handleAiCountStateChange = (args) => {
    console.log('log',args);
    let plyrNumbers = [];
    let multiAiFormAiColWidth;
    switch(args) {
      case '0':
        plyrNumbers = []
        multiAiFormAiColWidth = 0;
        setAiRandom = [];
      break;
      case '1':
        plyrNumbers = [1];
        multiAiFormAiColWidth = 8;
        setAiRandom([
          {
            plyrNo: 1,
            random: 'random'
          }
        ]);
      break;
      case '2':
        plyrNumbers = [1,2];
        multiAiFormAiColWidth = 6;
        setAiRandom([
          {
            plyrNo: 1,
            random: 'random'
          },
          {
            plyrNo: 2,
            random: 'random'
          },
        ]);
      break;
      case '3':
        plyrNumbers = [1,2,3];
        multiAiFormAiColWidth = 4;
        setAiRandom([
          {
            plyrNo: 1,
            random: 'random'
          },
          {
            plyrNo: 2,
            random: 'random'
          },
          {
            plyrNo: 3,
            random: 'random'
          },
        ]);
      break;
      case '4':
        plyrNumbers = [1,2,3,4];
        multiAiFormAiColWidth = 3;
        setAiRandom([
          {
            plyrNo: 1,
            random: 'random'
          },
          {
            plyrNo: 2,
            random: 'random'
          },
          {
            plyrNo: 3,
            random: 'random'
          },
          {
            plyrNo: 4,
            random: 'random'
          },
        ]);
      break;
    }
    setAiMission([])
    props.getCustomAiStartPosList([])

    setAiCount({
      count: args,
      playerNumbers: plyrNumbers,
    });

    setMultiAiFormAiColWidth(multiAiFormAiColWidth);

    // props.aiSettingsFormHandler.bind(this, '')
  }

  const [aiRandom, setAiRandom] = useState([]);
  const handleAiRandomStateChange = (plyrNumber,value) => {
    console.log('handleAiRandomStateChange',plyrNumber,value);

    let array = aiRandom;
    let plyr = array.find(elem => elem.plyrNo === plyrNumber)
    if (plyr) {
      plyr.random = value;
    }
    setAiRandom(array)

    console.log('aiRandom',aiRandom);
    let x = aiRandom.filter(elem => elem.random === 'custom' )
    let array2 = [];
    for (const plyr of x ) {
      array2.push({
        plyrNo: plyr.plyrNo,
        mission: 'pursue'
      })
    }
    setAiMission(array2);
    props.getCustomAiStartPosList(array2)

    let multiAiFormAiMissionColWidth;
    switch(x.length) {
      case 1:
        multiAiFormAiMissionColWidth = 8
      break;
      case 2:
        multiAiFormAiMissionColWidth = 6
      break;
      case 3:
        multiAiFormAiMissionColWidth = 4
      break;
      case 4:
        multiAiFormAiMissionColWidth = 3
      break;
    }
    setMultiAiFormAiMissionColWidth(multiAiFormAiMissionColWidth)

  }
  const [aiMission, setAiMission] = useState([]);
  const handleAiMissionStateChange = (plyrNo,value) => {

    let array = aiMission;
    let plyr2 = array.find(elem => elem.plyrNo === plyrNo)
    if (plyr2) {
      plyr2.mission = value;
    }
    setAiMission(array);
    console.log('setAiMission',aiMission);
    props.getCustomAiStartPosList(aiMission)

  }

  const [aiStartPos, setAiStartPos] = useState([]);
  const handleAiStartPosStateChange = (plyrNo,value) => {
    // setAiStartPos(args);
  }

  const [multiAiFormAiColWidth, setMultiAiFormAiColWidth] = useState(8);
  const handleMultiAiFormAiColWidthChange = (args) => {
    setMultiAiFormAiColWidth(args);
  }
  const [multiAiFormAiMissionColWidth, setMultiAiFormAiMissionColWidth] = useState(8);




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
            <Form.Control as="select" value={aiCount.count} onChange={e=>handleAiCountStateChange(e.target.value)}>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        {aiRandom.length > 0 && (
          <Row className="multiAiFormBox">
          {aiRandom.map((plyr) => (
            <Col className="multiAiFormAi" sm={multiAiFormAiColWidth}>
            <Form.Row>
              <Form.Group as={Col} controlId="aiRandom" className="formGroup">
                <Form.Label className="formLabel">Plyr {plyr.plyrNo} Random?</Form.Label>
                <Form.Control as="select" value={plyr.random} onChange={e=>handleAiRandomStateChange(plyr.plyrNo,e.target.value)}>
                  <option>random</option>
                  <option>custom</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            </Col>
          ))}
          </Row>
        )}


        {aiMission.length > 0 && (
          <Row className="multiAiFormBox">
            {aiMission.map((plyr) => (
              <Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                <Form.Row>
                  <Form.Group as={Col} controlId="aiStartPos" className="formGroup">
                    <Form.Label className="formLabel">Ai {plyr.plyrNo} Mission</Form.Label>
                    <Form.Control as="select"  onChange={e=>handleAiMissionStateChange(plyr.plyrNo,e.target.value)}>
                      <option>pursue</option>
                      <option>patrol</option>
                      <option>defend</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
              </Col>

            ))}
          </Row>
        )}



        {props.aiStartPosList.length > 0 && (
          <Row className="multiAiFormBox">
            {props.aiStartPosList.map((posArray) => {
              if (posArray.mission !== 'patrol' ) {
                return<Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="aiStartPos1" className="formGroup">
                      <Form.Label className="formLabel">Ai {posArray.plyrNo} Start Position</Form.Label>
                      <Form.Control as="select"  onChange={e=>handleAiStartPosStateChange(posArray.plyrNo,e.target.value)}>
                        {posArray.posArray.map((pos) => (
                          <option>{pos.x},{pos.y}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>
                </Col>
              }
              if (posArray.mission === 'patrol' ) {
                return<Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="aiStartPos1" className="formGroup">
                      <Form.Label className="formLabel">Ai {posArray.plyrNo} Start Position</Form.Label>
                      <Form.Control as="select"  onChange={e=>handleAiStartPosStateChange(posArray.plyrNo,e.target.value)}>
                        {posArray.posArray.map((pos) => (
                          <option>{pos.x},{pos.y}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="aiStartPos2" className="formGroup">
                      <Form.Label className="formLabel">Ai {posArray.plyrNo} Start Position</Form.Label>
                      <Form.Control as="select"  onChange={e=>handleAiStartPosStateChange(posArray.plyrNo,e.target.value)}>
                        {posArray.posArray.map((pos) => (
                          <option>{pos.x},{pos.y}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>
                </Col>
              }


            })}
          </Row>
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
