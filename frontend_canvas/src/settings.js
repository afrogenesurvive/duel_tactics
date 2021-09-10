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


  let preInput;
  if (props.gamepad !== true) {
    preInput = "Keyboard";
  } else {
    preInput = "Gamepad"
  }

  const [input, setInput] = useState(preInput);
  const handleInputChange = (args) => {
    setInput(args);
  }


  const [plyrCount, setPlyrCount] = useState('2');
  const handlePlyrCountStateChange = (args) => {

    let array = [];
    let plyrStartPosWidth;
    switch(parseInt(args)) {
      case 1:
        array = [
          {
            plyrNo: 1,
            selected: undefined,
            posArray: []
          }
        ]
        plyrStartPosWidth = 8;
      break;
      case 2:
        array = [
          {
            plyrNo: 1,
            selected: undefined,
            posArray: []
          },
          {
            plyrNo: 2,
            selected: undefined,
            posArray: []
          }
        ]
        plyrStartPosWidth = 6;
      break;
    }

    props.getCustomPlyrStartPosList(array)

    setPlyrCount(parseInt(args));

    setPlyrStartPosWidth(plyrStartPosWidth);


    if (aiCount.count > 0) {
      let newArray2 = props.aiStartPosList.map(y => y = {
        plyrNo: y.plyrNo,
        mission: y.mission,
        selected: y.selected,
      });
      props.getCustomAiStartPosList(newArray2)
    }

  }


  const [plyrStartPos, setPlyrStartPos] = useState([]);
  const handlePlyrStartPosStateChange = (plyrNo,value) => {
    // console.log('handlePlyrStartPosStateChange',props.plyrStartPosList);


    let newArray = props.plyrStartPosList.map(y => y = {
      plyrNo: y.plyrNo,
      selected: y.selected,
    });

    if (value === 'random') {

      let whichCell = props.rnJesus(1,props.plyrStartPosList.length)
      let posList = props.plyrStartPosList.find(j=>j.plyrNo === plyrNo).posArray;
      let randomPos = posList[whichCell-1]
      // console.log('randomPos',randomPos);
      value = ''+randomPos.x+','+randomPos.y+''

    }

    // console.log('props.aiStartPosList 2',props.aiStartPosList);

    let plyrChange = newArray.find(x => x.plyrNo === plyrNo);

    plyrChange.selected = {x:parseInt(value.split(",")[0]),y:parseInt(value.split(",")[1])};

    // if (plyrChange.selected.length === 0) {
    //   plyrChange.selected = {x:value.split(",")[0],y:value.split(",")[1]};
    // }
    // else {
    //   // console.log('plyrChange',plyrChange);
    //   let selectedElem = plyrChange.selected.find(j=>j.type === type)
    //   let indx = newArray.findIndex(j=>j.plyrNo === plyrChange.plyrNo)
    //   if (selectedElem) {
    //     selectedElem.cell = {x:parseInt(value.split(",")[0]),y:parseInt(value.split(",")[1])};
    //   }
    //   else {
    //     plyrChange.selected.push({type:type,cell:{x:parseInt(value.split(",")[0]),y:parseInt(value.split(",")[1])}});
    //   }
    // }

    props.getCustomPlyrStartPosList(newArray);

    if (aiCount.count > 0) {
      let newArray2 = props.aiStartPosList.map(y => y = {
        plyrNo: y.plyrNo,
        mission: y.mission,
        selected: y.selected,
      });
      props.getCustomAiStartPosList(newArray2)
    }

  }


  const [plyrStartPosWidth, setPlyrStartPosWidth] = useState(6);
  // const handlePlyrStartPosWidthChange = (args) => {
  //   setPlyrStartPosWidth(args);
  // }

  let preGridWidth = props.gridWidth;
  const [gridWidth, setGridWidth] = useState(preGridWidth);
  const handleGridWidthChange = (args) => {

    // let width = parseInt(args.split('x')[0])-1;
    let width = parseInt(args);
    setGridWidth(width);
    props.settingsFormGridWidthUpdate(width);

    setAiCount({
      count: 0,
      playerNumbers: [],
    })
    setAiRandom([])
    setAiMode([])
    setAiWeapon([])
    setAiMission([])
    props.getCustomAiStartPosList([])

  }


  const [aiCount, setAiCount] = useState({
    count: 0,
    playerNumbers: [],
  });
  const handleAiCountStateChange = (args) => {

    let plyrNumbers = [];
    let multiAiFormAiColWidth;
    switch(args) {
      case '0':
        plyrNumbers = []
        multiAiFormAiColWidth = 0;
        setAiRandom([]);
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
    setAiMode([])
    setAiWeapon([])
    setAiMission([])
    props.getCustomAiStartPosList([])

    setAiCount({
      count: args,
      playerNumbers: plyrNumbers,
    });

    setMultiAiFormAiColWidth(multiAiFormAiColWidth);

    let initArray = [];
    for (const plyr of plyrNumbers) {
      initArray.push({
        plyrNo: plyr,
        random: 'random'
      })
    }

    props.updateSettingsFormAiData({
      count: aiCount,
      random: initArray,
      mode: aiMode,
      weapon: aiWeapon,
      mission: aiMission,
    })


    let newArray2 = props.plyrStartPosList.map(y => y = {
      plyrNo: y.plyrNo,
      selected: y.selected,
    });

    props.getCustomPlyrStartPosList(newArray2)


  }


  const [aiRandom, setAiRandom] = useState([]);
  const handleAiRandomStateChange = (plyrNumber,value) => {

    let array = aiRandom;
    let plyr = array.find(elem => elem.plyrNo === plyrNumber)
    if (plyr) {
      plyr.random = value;
    }
    setAiRandom(array)


    // console.log('aiRandom',aiRandom);
    let x = aiRandom.filter(elem => elem.random === 'custom' )
    let array2 = [];
    for (const plyr of x ) {
      array2.push({
        plyrNo: plyr.plyrNo,
        mode: 'careful'
      })
      // handleAiModeStateChange(plyr.plyrNo,'careful')
    }
    setAiMode(array2);


    let array3 = [];
    for (const plyr of x ) {
      array3.push({
        plyrNo: plyr.plyrNo,
        weapon: 'sword'
      })
      // handleAiWeaponStateChange(plyr.plyrNo,'sword')
    }
    setAiWeapon(array3);


    let array4 = [];
    for (const plyr of x ) {
      array4.push({
        plyrNo: plyr.plyrNo,
        mission: 'pursue'
      })
      // handleAiMissionStateChange(plyr.plyrNo,'pursue')
    }
    setAiMission(array4);


    let newArray = array4.map(y => y = {
      plyrNo: y.plyrNo,
      mission: y.mission,
      selected: []
    });

    props.getCustomAiStartPosList(newArray)


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


      // console.log('aiCount',aiCount,'aiRandom',aiRandom,'aiMode',aiMode,'aiWeapon',aiWeapon,'aiMission',aiMission);

      props.updateSettingsFormAiData({
        count: aiCount,
        random: aiRandom,
        mode: array2,
        weapon: array3,
        mission: array4,
      })


      let newArray2 = props.plyrStartPosList.map(y => y = {
        plyrNo: y.plyrNo,
        selected: y.selected,
      });

      props.getCustomPlyrStartPosList(newArray2)


  }


  const [aiMode, setAiMode] = useState([]);
  const handleAiModeStateChange = (plyrNo,value) => {


    let array = aiMode;
    let plyr2 = array.find(elem => elem.plyrNo === plyrNo)
    if (plyr2) {
      plyr2.mode = value;
    }
    setAiMode(array);
    // console.log('setAiMode',aiMode);


    props.updateSettingsFormAiData({
        count: aiCount,
        random: aiRandom,
        mode: aiMode,
        weapon: aiWeapon,
        mission: aiMission,
      })

  }


  const [aiWeapon, setAiWeapon] = useState([]);
  const handleAiWeaponStateChange = (plyrNo,value) => {


    let array = aiWeapon;
    let plyr2 = array.find(elem => elem.plyrNo === plyrNo)

    if (plyr2) {
      plyr2.weapon = value;
    }
    setAiWeapon(array);
    // console.log('setAiWeapon',aiWeapon,value,array);


    props.updateSettingsFormAiData({
        count: aiCount,
        random: aiRandom,
        mode: aiMode,
        weapon: aiWeapon,
        mission: aiMission,
      })

  }


  const [aiMission, setAiMission] = useState([]);
  const handleAiMissionStateChange = (plyrNo,value) => {

    if (value === 'random') {
      let whatMission = props.rnJesus(1,3);
      switch(whatMission) {
        case 1:
          value = 'pursue'
        break;
        case 2:
          value = 'defend'
        break;
        case 3:
          value = 'patrol'
        break;
      }
    }

    let array = aiMission;
    let plyr2 = array.find(elem => elem.plyrNo === plyrNo)
    if (plyr2) {
      plyr2.mission = value;
    }
    setAiMission(array);
    // console.log('setAiMission',aiMission);

    let newArray = aiMission.map(y => y = {
      plyrNo: y.plyrNo,
      mission: y.mission,
      selected: []
    });

    props.getCustomAiStartPosList(newArray)

    props.updateSettingsFormAiData({
        count: aiCount,
        random: aiRandom,
        mode: aiMode,
        weapon: aiWeapon,
        mission: aiMission,
      })



  }


  const [aiStartPos, setAiStartPos] = useState([]);
  const handleAiStartPosStateChange = (mission,plyrNo,type,value) => {
    // setAiStartPos(args);
    // console.log('handleAiStartPosStateChange: mission ',mission,'plyrNo',plyrNo,'type',type,'value',value);

    let newArray = props.aiStartPosList.map(y => y = {
      plyrNo: y.plyrNo,
      mission: y.mission,
      selected: y.selected,
    });

    if (value === 'random') {

      let whichCell = props.rnJesus(1,props.aiStartPosList.length)
      let posList = props.aiStartPosList.find(j=>j.plyrNo === plyrNo).posArray;
      let randomPos = posList[whichCell-1]
      // console.log('randomPos',randomPos);
      value = ''+randomPos.x+','+randomPos.y+''

    }

    // console.log('props.aiStartPosList 2',props.aiStartPosList);

    let plyrChange = newArray.find(x => x.plyrNo === plyrNo);

    if (plyrChange.selected.length === 0) {
      plyrChange.selected.push({type:type,cell:{x:value.split(",")[0],y:value.split(",")[1]}})
    }
    else {
      // console.log('plyrChange',plyrChange);
      let selectedElem = plyrChange.selected.find(j=>j.type === type)
      let indx = newArray.findIndex(j=>j.plyrNo === plyrChange.plyrNo)
      if (selectedElem) {
        selectedElem.cell = {x:parseInt(value.split(",")[0]),y:parseInt(value.split(",")[1])};
      }
      else {
        plyrChange.selected.push({type:type,cell:{x:parseInt(value.split(",")[0]),y:parseInt(value.split(",")[1])}});
      }
    }

    props.getCustomAiStartPosList(newArray)

    // console.log('val',value,'newArray',newArray,'plyrChange2',plyrChange,'type',type);
    props.updateSettingsFormAiData({
      count: aiCount,
      random: aiRandom,
      mode: aiMode,
      weapon: aiWeapon,
      mission: aiMission,
    })


    let newArray2 = props.plyrStartPosList.map(y => y = {
      plyrNo: y.plyrNo,
      selected: y.selected,
    });

    props.getCustomPlyrStartPosList(newArray2)

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

      <div class="settingsCanvasContainer">

        <h3 className="settingsHeading">
          Choose Position :
        </h3>

        <canvas
          width={props.canvasWidth}
          height={props.canvasHeight}
          ref={props.canvasRef}
          className="settingsCanvas"
        />
      </div>

      <Form onSubmit={props.onConfirm} className="form">
        <Form.Row>
          <Form.Group as={Col} controlId="gridSize" className="formGroup">
            <Form.Label className="formLabel">Grid Size:</Form.Label>
            <Form.Control as="select" value={gridWidth} onChange={e=>handleGridWidthChange(e.target.value)}>
              <option value={9} >10 x 10</option>
              <option value={6} >7 x 7</option>
              <option value={3} >4 x 4</option>
              <option value={12} >13 x 13</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="input" className="formGroup">
            <Form.Label className="formLabel">Input Source</Form.Label>
            <Form.Control value={input} onChange={e=>handleInputChange(e.target.value)} as="select">
              <option>Keyboard</option>
              <option>Gamepad</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="humanPlayers" className="formGroup">
            <Form.Label className="formLabel">Players</Form.Label>
            <Form.Control as="select" value={props.plyrStartPosList.length.toString()} onChange={e=>handlePlyrCountStateChange(e.target.value)}>
              <option >2</option>
              <option >1</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>


        {props.plyrStartPosList.length > 0 && (
          <Row className="multiAiFormBox">
          {props.plyrStartPosList.map((posArray) => {
            return<Col className="multiAiFormAi" sm={plyrStartPosWidth}>
              <Form.Row>
                <Form.Group as={Col} controlId="plyrStartPos" className="formGroup">
                  <Form.Label className="formLabel">P{posArray.plyrNo} Start Position</Form.Label>

                  <Form.Control as="select" value={posArray.selected} onChange={e=>handlePlyrStartPosStateChange(posArray.plyrNo,e.target.value)}>
                    <option selected >{posArray.selected.x},{posArray.selected.y}</option>
                    {posArray.posArray.map((pos) => {
                      if (pos === 'random') {
                        return<option>{pos}</option>
                      } else {
                        return<option>{pos.x},{pos.y}</option>
                      }
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Col>
          })}
          </Row>
        )}


        <Form.Row>
          <Form.Group as={Col} controlId="aiCount" className="formGroup">
            <Form.Label className="formLabel">Ai</Form.Label>
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
                <Form.Label className="formLabel">Ai {plyr.plyrNo} Random?</Form.Label>
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


        {aiMode.length > 0 && (
          <Row className="multiAiFormBox">
            {aiMode.map((plyr) => (
              <Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                <Form.Row>
                  <Form.Group as={Col} controlId="aiStartPos" className="formGroup">
                    <Form.Label className="formLabel">Ai {plyr.plyrNo} Mode</Form.Label>
                    <Form.Control as="select" value={plyr.mode} onChange={e=>handleAiModeStateChange(plyr.plyrNo,e.target.value)}>
                      <option>careful</option>
                      <option>aggressive</option>
                      <option>random</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
              </Col>

            ))}
          </Row>
        )}


        {aiWeapon.length > 0 && (
          <Row className="multiAiFormBox">
            {aiWeapon.map((plyr) => (
              <Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                <Form.Row>
                  <Form.Group as={Col} controlId="aiStartPos" className="formGroup">
                    <Form.Label className="formLabel">Ai {plyr.plyrNo} Weapon</Form.Label>
                    <Form.Control as="select" onChange={e=>handleAiWeaponStateChange(plyr.plyrNo,e.target.value)}>
                      <option>sword</option>
                      <option>spear</option>
                      <option>crossbow</option>
                      <option>random</option>
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
                    <Form.Control as="select" onChange={e=>handleAiMissionStateChange(plyr.plyrNo,e.target.value)}>
                      <option>pursue</option>
                      <option>patrol</option>
                      <option>defend</option>
                      <option>random</option>
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


              if (posArray.mission === 'pursue' ) {
                return<Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="aiStartPos" className="formGroup">
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'start') {
                          return<Form.Label className="formLabel">Ai {posArray.plyrNo} Start Position</Form.Label>
                        }
                        else {
                          return <Form.Label className="formLabel">Ai {posArray.plyrNo} Start Position</Form.Label>
                        }
                      })}
                      <Form.Control as="select" value={posArray.selected.filter(x=>x.type==='start')[0]} onChange={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'start',e.target.value)}>
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'start') {
                          return<option selected >{selected.cell.x},{selected.cell.y}</option>
                        }
                      })}
                        {posArray.posArray.map((pos) => {
                          if (pos === 'random') {
                            return<option>{pos}</option>
                          } else {
                            return<option>{pos.x},{pos.y}</option>
                          }
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>
                </Col>
              }

              if (posArray.mission === 'defend' ) {
                return<Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="aiStartPos" className="formGroup">
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'start') {
                          return<Form.Label className="formLabel">Ai {posArray.plyrNo} Start Position</Form.Label>
                        }
                        else {
                          <Form.Label className="formLabel">Ai {posArray.plyrNo} Start Position</Form.Label>
                        }
                      })}
                      <Form.Control as="select" value={posArray.selected.filter(x=>x.type==='start')[0]} onChange={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'start',e.target.value)}>
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'start') {
                          return<option selected >{selected.cell.x},{selected.cell.y}</option>
                        }
                      })}
                        {posArray.posArray.map((pos) => {
                          if (pos === 'random') {
                            return<option>{pos}</option>
                          } else {
                            return<option>{pos.x},{pos.y}</option>
                          }
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} controlId="aiDefendPos" className="formGroup">
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'defend') {
                          return<Form.Label className="formLabel">Ai {posArray.plyrNo} {posArray.mission} Position</Form.Label>
                        }
                        else {
                          <Form.Label className="formLabel">Ai {posArray.plyrNo} {posArray.mission} Position</Form.Label>
                        }
                      })}
                      <Form.Control as="select" value={posArray.selected.filter(x=>x.type==='defend')[0]} onChange={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'defend',e.target.value)}>
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'defend') {
                          return<option selected >{selected.cell.x},{selected.cell.y}</option>
                        }
                      })}
                        {posArray.posArray.map((pos) => {
                          if (pos === 'random') {
                            return<option>{pos}</option>
                          } else {
                            return<option>{pos.x},{pos.y}</option>
                          }
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>
                </Col>
              }

              if (posArray.mission === 'patrol' ) {
                return<Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="aiStartPos1" className="formGroup">
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'start') {
                          return<Form.Label className="formLabel">Ai {posArray.plyrNo} Start Position</Form.Label>
                        }
                        else {
                          <Form.Label className="formLabel">Ai {posArray.plyrNo} Start Position</Form.Label>
                        }
                      })}
                      <Form.Control as="select" value={posArray.selected.filter(x=>x.type==='start')[0]} onChange={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'start',e.target.value)}>
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'start') {
                          return<option selected >{selected.cell.x},{selected.cell.y}</option>
                        }
                      })}
                        {posArray.posArray.map((pos) => {
                          if (pos === 'random') {
                            return<option>{pos}</option>
                          } else {
                            return<option>{pos.x},{pos.y}</option>
                          }
                        })}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="aiPatrolPos1" className="formGroup">
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'patrol1') {
                          return<Form.Label className="formLabel">Ai {posArray.plyrNo} {posArray.mission} Position 1 </Form.Label>
                        }
                        else {
                          <Form.Label className="formLabel">Ai {posArray.plyrNo} {posArray.mission} Position 1</Form.Label>
                        }
                      })}
                      <Form.Control as="select" value={posArray.selected.filter(x=>x.type==='patrol1')[0]} onChange={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'patrol1',e.target.value)}>
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'patrol1') {
                          return<option selected >{selected.cell.x},{selected.cell.y}</option>
                        }
                      })}
                        {posArray.posArray.map((pos) => {
                          if (pos === 'random') {
                            return<option>{pos}</option>
                          } else {
                            return<option>{pos.x},{pos.y}</option>
                          }
                        })}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="aiPatrolPos2" className="formGroup">
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'patrol2') {
                          return<Form.Label className="formLabel">Ai {posArray.plyrNo} {posArray.mission} Position 2</Form.Label>
                        }
                        else {
                          <Form.Label className="formLabel">Ai {posArray.plyrNo} {posArray.mission} Position 2</Form.Label>
                        }
                      })}
                      <Form.Control as="select" value={posArray.selected.filter(x=>x.type==='patrol2')[0]} onChange={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'patrol2',e.target.value)}>
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'patrol2') {
                          return<option selected >{selected.cell.x},{selected.cell.y}</option>
                        }
                      })}
                        {posArray.posArray.map((pos) => {
                          if (pos === 'random') {
                            return<option>{pos}</option>
                          } else {
                            return<option>{pos.x},{pos.y}</option>
                          }
                        })}
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
