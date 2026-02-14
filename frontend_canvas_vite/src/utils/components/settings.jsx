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
  faTh,
  faDice,
} from '@fortawesome/free-solid-svg-icons';
import gamepadDefaultDiagram from './assets/inputMap/pad.png'
import plyr1KeyboardDefaultDiagram from './assets/inputMap/keyboard1.png'
import plyr2KeyboardDefaultDiagram from './assets/inputMap/keyboard2.png'

import './settings.css';

let playerSettings = {
  three: {
    state: false,

  }
}
// let playerNumbers = [];


const Settings = (props) => {


  const weaponSet = ['sword','spear','crossbow'];
  const armorSet = ['helmet','mail','greaves'];
  let preInput;
  if (props.gamepad !== true) {
    preInput = "Keyboard";
  } else {
    preInput = "Gamepad"
  }
  let preAiCount;
  if (!props.updateSettingsFormAiDataData.random) {
    preAiCount = {
      count: 0,
      playerNumbers: [],
    }
  } else {
    switch(props.updateSettingsFormAiDataData.random.length) {
      case 0:
        preAiCount = {
          count: 0,
          playerNumbers: [],
        }
      break;
      case 1:
        preAiCount = {
          count: 1,
          playerNumbers: [1],
        }
      break;
      case 2:
        preAiCount = {
          count: 2,
          playerNumbers: [1,2],
        }
      break;
      case 3:
        preAiCount = {
          count: 3,
          playerNumbers: [1,2,3],
        }
      break;
      case 4:
        preAiCount = {
          count: 4,
          playerNumbers: [1,2,3,4],
        }
      break;
    }
  }

  let preAiRandom;
  if (!props.updateSettingsFormAiDataData.random) {
    preAiRandom = []
  } else {
    preAiRandom = props.updateSettingsFormAiDataData.random;
  }

  let preAiMode = [];
  if (!props.updateSettingsFormAiDataData.mode) {
    preAiMode = []
    // setAiMode([])
  } else {
    preAiMode = props.updateSettingsFormAiDataData.mode;
    // setAiMode(props.updateSettingsFormAiDataData.mode);
  }

  let preAiWeapons = [];
  if (!props.updateSettingsFormAiDataData.weapon) {
    preAiWeapons = []
    // setAiWeapon([])
  } else {
    preAiWeapons = props.updateSettingsFormAiDataData.weapon;
    // setAiWeapon(props.updateSettingsFormAiDataData.weapon);
  }

  let preAiArmor = [];
  if (!props.updateSettingsFormAiDataData.armor) {
    preAiArmor = []
    // setAiArmor([])
  } else {
    preAiArmor = props.updateSettingsFormAiDataData.armor;
    // setAiArmor(props.updateSettingsFormAiDataData.armor);
  }

  let preAiTeam = [];
  if (!props.updateSettingsFormAiDataData.team) {
    preAiTeam = []
    // setAiTeam([])
  } else {
    preAiTeam = props.updateSettingsFormAiDataData.team;
    // setAiTeam(props.updateSettingsFormAiDataData.team);
  }

  let preAiMission = [];
  if (!props.updateSettingsFormAiDataData.mission) {
    preAiMission = []
    // setAiMission([])
  } else {
    preAiMission = props.updateSettingsFormAiDataData.mission;
    // setAiMission(props.updateSettingsFormAiDataData.mission);
  }

  let preStartItems = false;
  if (props.disableInitItems !== true ) {
    preStartItems = true;
  }

  let prePlayerInput;
  if (!props.settingsFormPlayerData.input) {
    prePlayerInput = [
      {plyrNo: 1,input: 'keyboard'},
      {plyrNo: 2,input: 'keyboard'},
    ];
  }
  else {
    prePlayerInput = props.settingsFormPlayerData.input;
  }
  let prePlayerTeam;
  if (!props.settingsFormPlayerData.team) {
    prePlayerTeam = [
      {plyrNo: 1,team: 'Red'},
      {plyrNo: 2,team: 'Blue'}
    ];
  }
  else {
    prePlayerTeam = props.settingsFormPlayerData.team;
  }
  let prePlayerWeapons;
  if (!props.settingsFormPlayerData.weapon) {
    prePlayerWeapons = [
      {plyrNo: 1,weapons: ['sword','spear','crossbow']},
      {plyrNo: 2,weapons: ['sword','spear','crossbow']},
    ];
  }
  else {
    prePlayerWeapons = props.settingsFormPlayerData.weapon;
  }
  let prePlayerArmor;
  if (!props.settingsFormPlayerData.armor) {
    prePlayerArmor = [
      {plyrNo: 1,armor: []},
      {plyrNo: 2,armor: []},
    ];
  }
  else {
    prePlayerArmor = props.settingsFormPlayerData.armor;
  }



  // console.log('1',props.plyrStartPosList);
  // console.log('2',props.aiStartPosList);
  // console.log('3',props.updateSettingsFormAiDataData);

  const [startItems, setStartItems] = useState(preStartItems);
  const handleStartItemsChange = (args) => {

    let val;
    if (args === 'true') {
      val = true;
    }
    else {
      val = false;
    }
    setStartItems(val);

    props.updateSettingsFormAiData({
      startItems: val,
      count: aiCount,
      random: aiRandom,
      mode: aiMode,
      weapon: aiWeapons,
      armor: aiArmor,
      team: aiTeam,
      mission: aiMission,
    })
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


    if (parseInt(args) === 1) {
      props.updateSettingsFormPlayerData(
        {
          input: [
            {plyrNo: 1,input: 'keyboard'},
          ],
          weapon: [
            {plyrNo: 1,weapons: ['sword','spear','crossbow']},
          ],
          armor: [
            {plyrNo: 1,armor: []},
          ],
          team: [
            {plyrNo: 1,team: 'Red'},
          ]
        }
      )
      setPlayerWeapons([
        playerWeapons[0]
      ])
      setPlayerArmor([
        playerArmor[0]
      ])
      setPlayerTeam([playerTeam[0]])
      setPlayerInput([playerInput[0]])
    }
    if (parseInt(args) === 2) {
      props.updateSettingsFormPlayerData(
        {
          input: [
            {plyrNo: 1,input: 'keyboard'},
            {plyrNo: 2,input: 'keyboard'},
          ],
          weapon: [
            {plyrNo: 1,weapons: ['sword','spear','crossbow']},
            {plyrNo: 2,weapons: ['sword','spear','crossbow']},
          ],
          armor: [
            {plyrNo: 1,armor: []},
            {plyrNo: 2,armor: []},
          ],
          team: [
            {plyrNo: 1,team: 'Red'},
            {plyrNo: 2,team: 'Blue'}
          ]
        }
      )

      setPlayerWeapons([playerWeapons[0],{plyrNo: 2,weapons: ['sword','spear','crossbow']}])
      setPlayerArmor([playerArmor[0],{plyrNo: 2,armor: []}])
      setPlayerTeam([playerTeam[0],{plyrNo: 2,team: 'Blue'}])
      setPlayerInput([playerInput[0],{plyrNo: 2,input: 'keyboard'}])

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


      let posList = props.plyrStartPosList.find(j=>j.plyrNo === plyrNo).posArray;
      let whichCell = props.rnJesus(1,posList.length)
      let randomPos = posList[whichCell-1]
      // console.log('randomPos',randomPos,posList.length);
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

  const [playerInput, setPlayerInput] = useState(prePlayerInput);
  const handlePlayerInputStateChange = (plyrNo,value) => {


    let array = playerInput;
    let plyr2 = array.find(elem => elem.plyrNo === plyrNo)

    if (plyr2) {
      plyr2.input = value;
    }
    setPlayerInput(array);


    props.updateSettingsFormPlayerData({
        input: playerInput,
        weapon: playerWeapons,
        armor: playerArmor,
        team: playerTeam,
      })

  }


  const [playerTeam, setPlayerTeam] = useState(prePlayerTeam);
  const handlePlayerTeamStateChange = (plyrNo,value) => {


    let array = playerTeam;
    let plyr2 = array.find(elem => elem.plyrNo === plyrNo)

    if (plyr2) {
      plyr2.team = value;
    }
    setPlayerTeam(array);


    props.updateSettingsFormPlayerData({
        input: playerInput,
        weapon: playerWeapons,
        armor: playerArmor,
        team: playerTeam,
      })

  }

  const [playerWeapons, setPlayerWeapons] = useState(prePlayerWeapons);
  const handlePlayerWeaponsStateChange = (plyrNo,action,value) => {


    let array = playerWeapons;
    let plyr2 = array.find(elem => elem.plyrNo === plyrNo)
    let plyr3 = playerArmor.find(elem => elem.plyrNo === plyrNo)

    if (value !== 'random' && action === true && plyr3.armor.length+plyr2.weapons.length === 4) {
      console.log('inventory full ');
    }
    else {

      if (value === 'random') {

        plyr2.weapons = [weaponSet[props.rnJesus(0,armorSet.length-1)]]

      }
      else {
        if (action === true) {
          plyr2.weapons.push(value)
        }
        else (
          plyr2.weapons.splice(plyr2.weapons.indexOf(value),1)
        )
      }
      setPlayerWeapons(array);
      // console.log('setPlayerArmor',playerArmor,value,array);


      props.updateSettingsFormPlayerData({
          input: playerInput,
          weapon: playerWeapons,
          armor: playerArmor,
          team: playerTeam,
        })

    }




  }

  const [playerArmor, setPlayerArmor] = useState(prePlayerArmor);
  const handlePlayerArmorStateChange = (plyrNo,action,value) => {


    let array = playerArmor;
    let plyr2 = array.find(elem => elem.plyrNo === plyrNo)
    let plyr3 = playerWeapons.find(elem => elem.plyrNo === plyrNo)

    if (value !== 'random' && action === true && plyr2.armor.length+plyr3.weapons.length === 4) {
      console.log('inventory full ');
    }
    else {

      if (value === 'random') {

        plyr2.armor = [armorSet[props.rnJesus(0,armorSet.length-1)]]

      }
      else {
        if (action === true) {
          plyr2.armor.push(value)
        }
        else (
          plyr2.armor.splice(plyr2.armor.indexOf(value),1)
        )
      }
      setPlayerArmor(array);


      props.updateSettingsFormPlayerData({
          input: playerInput,
          weapon: playerWeapons,
          armor: playerArmor,
          team: playerTeam,
        })

    }




  }



  let preGridWidth = props.gridWidth;
  const [gridWidth, setGridWidth] = useState(preGridWidth);
  const handleGridWidthChange = (args) => {



    let width = parseInt(args);
    setGridWidth(width);
    props.settingsFormGridWidthUpdate(width);



    if (width < props.gridWidth) {

      if (parseInt(args) < 7 && parseInt(args) > 3) {
        handleAiCountOptionsStateChange(2);

      }

      if (parseInt(args) < 7 && parseInt(args) <= 3) {
        handleAiCountOptionsStateChange(1);

      }

      let array = [];
      switch(parseInt(plyrCount)) {
        case 1:
          array = [
            {
              plyrNo: 1,
              selected: undefined,
              posArray: []
            }
          ]
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
        break;
      }

      props.getCustomPlyrStartPosList(array)

    }
    else {
      handleAiCountOptionsStateChange(4);
    }



    setAiCount({
      count: 0,
      playerNumbers: [],
    })
    setAiRandom([])
    setAiMode([])
    setAiWeapons([])
    setAiArmor([])
    setAiTeam([])
    setAiMission([])
    props.getCustomAiStartPosList([])

    setMultiAiFormAiColWidth(0);

    let initArray = [];

    props.updateSettingsFormAiData({
      startItems: startItems,
      count: aiCount,
      random: initArray,
      mode: aiMode,
      weapon: aiWeapons,
      armor: aiArmor,
      team: aiTeam,
      mission: aiMission,
    })


  }


  const [aiCountOptions, setAiCountOptions] = useState([1,2,3,4]);
  const handleAiCountOptionsStateChange = (args) => {

    switch (args) {
      case 1:
          setAiCountOptions([1])
        break;
      case 2:
          setAiCountOptions([1,2])
        break;
      case 3:
          setAiCountOptions([1,2,3])
        break;
      case 4:
          setAiCountOptions([1,2,3,4])
        break;
      default:

    }

  }


  const [aiCount, setAiCount] = useState(preAiCount);
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
    setAiWeapons([])
    setAiArmor([])
    setAiTeam([])
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
      startItems: startItems,
      count: aiCount,
      random: initArray,
      mode: aiMode,
      weapon: aiWeapons,
      armor: aiArmor,
      team: aiTeam,
      mission: aiMission,
    })


    let newArray2 = props.plyrStartPosList.map(y => y = {
      plyrNo: y.plyrNo,
      selected: y.selected,
    });

    props.getCustomPlyrStartPosList(newArray2)

    if (parseInt(args) === 0) {
      props.updateSettingsCanvasData({type:'human_start',plyrNo:1})
    }


  }


  const [aiRandom, setAiRandom] = useState(preAiRandom);
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
        weapons: ['sword']
      })
      // handleAiWeaponStateChange(plyr.plyrNo,'sword')
    }
    setAiWeapons(array3);

    let array4 = [];
    for (const plyr of x ) {
      array4.push({
        plyrNo: plyr.plyrNo,
        armor: []
      })
      // handleAiWeaponStateChange(plyr.plyrNo,'sword')
    }
    setAiArmor(array4);

    let array5 = [];
    for (const plyr of x ) {
      array5.push({
        plyrNo: plyr.plyrNo,
        team: '',
      })
      // handleAiWeaponStateChange(plyr.plyrNo,'sword')
    }
    setAiTeam(array5);


    let array6 = [];
    for (const plyr of x ) {
      array6.push({
        plyrNo: plyr.plyrNo,
        mission: 'pursue'
      })
      // handleAiMissionStateChange(plyr.plyrNo,'pursue')
    }
    setAiMission(array6);


    let newArray = array6.map(y => y = {
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
        startItems: startItems,
        count: aiCount,
        random: aiRandom,
        mode: array2,
        weapon: array3,
        armor: array4,
        team: array5,
        mission: array6,
      })


      let newArray2 = props.plyrStartPosList.map(y => y = {
        plyrNo: y.plyrNo,
        selected: y.selected,
      });

      props.getCustomPlyrStartPosList(newArray2)

      if (x.length === 0) {
        props.updateSettingsCanvasData({type:'human_start',plyrNo:1})
      }


  }


  const [aiMode, setAiMode] = useState(preAiMode);
  const handleAiModeStateChange = (plyrNo,value) => {


    let array = aiMode;
    let plyr2 = array.find(elem => elem.plyrNo === plyrNo)
    if (plyr2) {
      plyr2.mode = value;
    }
    setAiMode(array);
    // console.log('setAiMode',aiMode);


    props.updateSettingsFormAiData({
        startItems: startItems,
        count: aiCount,
        random: aiRandom,
        mode: aiMode,
        weapon: aiWeapons,
        armor: aiArmor,
        team: aiTeam,
        mission: aiMission,
      })

  }


  const [aiWeapons, setAiWeapons] = useState(preAiWeapons);
  const handleAiWeaponsStateChange = (plyrNo,action,value) => {
    // console.log('handleAiWeaponsStateChange',action);

    let array = aiWeapons;

    let plyr2 = array.find(elem => elem.plyrNo === plyrNo)
    let plyr3 = aiArmor.find(elem => elem.plyrNo === plyrNo)

    if (value !== 'random' && action === true && plyr3.armor.length+plyr2.weapons.length === 4) {
      console.log('inventory full ');
    }
    else {

      if (plyr2) {

        if (value === 'random') {

          plyr2.weapons = [weaponSet[props.rnJesus(0,weaponSet.length-1)]];

        }
        else {
          if (action === true) {
            plyr2.weapons.push(value)
          }
          else (
            plyr2.weapons.splice(plyr2.weapons.indexOf(value),1)
          )
        }


      }
      setAiWeapons(array);
      // console.log('setAiWeapons',aiWeapons,value,array);


      props.updateSettingsFormAiData({
          startItems: startItems,
          count: aiCount,
          random: aiRandom,
          mode: aiMode,
          weapon: aiWeapons,
          armor: aiArmor,
          team: aiTeam,
          mission: aiMission,
        })


    }



  }

  const [aiArmor, setAiArmor] = useState(preAiArmor);
  const handleAiArmorStateChange = (plyrNo,action,value) => {
    // console.log('handleAiArmorStateChange',action);

    let array = aiArmor;
    let plyr2 = array.find(elem => elem.plyrNo === plyrNo)
    let plyr3 = aiWeapons.find(elem => elem.plyrNo === plyrNo)

    if (value !== 'random' && action === true && plyr2.armor.length+plyr3.weapons.length === 4) {
      console.log('inventory full ');
    }
    else {

      if (value === 'random') {

        plyr2.armor = [armorSet[props.rnJesus(0,armorSet.length-1)]]

      }
      else {
        if (action === true) {
          plyr2.armor.push(value)
        }
        else (
          plyr2.armor.splice(plyr2.armor.indexOf(value),1)
        )
      }
      setAiArmor(array);
      console.log('setAiArmor',aiArmor,value,array);


      props.updateSettingsFormAiData({
          startItems: startItems,
          count: aiCount,
          random: aiRandom,
          mode: aiMode,
          weapon: aiWeapons,
          armor: aiArmor,
          team: aiTeam,
          mission: aiMission,
        })

    }



  }


  const [aiTeam, setAiTeam] = useState(preAiTeam);
  const handleAiTeamStateChange = (plyrNo,value) => {


    let array = aiTeam;
    let plyr2 = array.find(elem => elem.plyrNo === plyrNo)
    if (plyr2) {
      plyr2.team = value;
    }
    setAiTeam(array);
    // console.log('setAiMode',aiMode);


    props.updateSettingsFormAiData({
        startItems: startItems,
        count: aiCount,
        random: aiRandom,
        mode: aiMode,
        weapon: aiWeapons,
        armor: aiArmor,
        team: aiTeam,
        mission: aiMission,
      })

  }


  const [aiMission, setAiMission] = useState(preAiMission);
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
        startItems: startItems,
        count: aiCount,
        random: aiRandom,
        mode: aiMode,
        weapon: aiWeapons,
        armor: aiArmor,
        team: aiTeam,
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

      let posList = props.aiStartPosList.find(j=>j.plyrNo === plyrNo).posArray;
      let whichCell = props.rnJesus(1,posList.length)
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
      startItems: startItems,
      count: aiCount,
      random: aiRandom,
      mode: aiMode,
      weapon: aiWeapons,
      armor: aiArmor,
      team: aiTeam,
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

      <Form onSubmit={props.onConfirm} className="form">

      <Row className="formBtnRow">
        <div className="btnSubCont">
          <Button variant="success" type="submit" className="formBtn">Submit</Button>
          <Button variant="danger" className="formBtn" onClick={props.onCancel}>Cancel</Button>
        </div>
      </Row>

        <Row>
          <Form.Group as={Col} controlId="gridSize" className="formGroup">
            <Form.Label className="formLabel">Grid Size:</Form.Label>
            <Form.Control as="select" value={gridWidth} onChange={e=>handleGridWidthChange(e.target.value)}>
              <option value={9} >10 x 10</option>
              <option value={6} >7 x 7</option>
              <option value={3} >4 x 4</option>
              <option value={12} >13 x 13</option>
            </Form.Control>
          </Form.Group>


          <Form.Group as={Col} className="formGroup" controlId="startItems">
            <Form.Label className="formLabel">Start Items</Form.Label>

            <Form.Control as="select" value={startItems} onChange={e=>handleStartItemsChange(e.target.value)}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Form.Control>
          </Form.Group>

        </Row>


        <Row>

          <Form.Group as={Col} controlId="humanPlayers" className="formGroup">
            <Form.Label className="formLabel">Players</Form.Label>
            <Form.Control as="select" value={props.plyrStartPosList.length.toString()} onChange={e=>handlePlyrCountStateChange(e.target.value)}>
              <option>2</option>
              <option>1</option>
            </Form.Control>
          </Form.Group>

        </Row>


        {props.settingsFormPlayerData.input && (
          <Row className="multiAiFormBox">

          {props.settingsFormPlayerData.input.map((plyr) => (
            <Col key={plyr.plyrNo} className="multiAiFormAi" sm={plyrStartPosWidth}>
            <Row>
              <Form.Group as={Col} controlId="playerInput" className="formGroup">
                <Form.Label className="formLabel">Player {plyr.plyrNo} Input</Form.Label>
                <Form.Control as="select" value={plyr.input} onChange={e=>handlePlayerInputStateChange(plyr.plyrNo,e.target.value)}>
                  <option>Keyboard</option>
                  <option>Gamepad</option>
                </Form.Control>
              </Form.Group>
            </Row>
            </Col>

          ))}

          {props.settingsFormPlayerData.team.map((plyr) => (
            <Col className="multiAiFormAi" sm={plyrStartPosWidth}>
            <Row>
              <Form.Group as={Col} controlId="playerTeam" className="formGroup">
                <Form.Label className="formLabel">Player {plyr.plyrNo} Team</Form.Label>
                <Form.Control as="select" value={plyr.team} onChange={e=>handlePlayerTeamStateChange(plyr.plyrNo,e.target.value)}>
                  <option>Red</option>
                  <option>Blue</option>
                </Form.Control>
              </Form.Group>
            </Row>
            </Col>
          ))}

          </Row>


        )}


        {playerWeapons.length > 0 && (
          <Row className="multiAiFormBox">
            {playerWeapons.map((plyr) => (
              <Col className="multiAiFormAi" sm={plyrStartPosWidth}>
                <Row>
                  <Form.Group as={Col} controlId="playerWeapons" className="formGroup">
                    <Form.Label className="formLabel">Player {plyr.plyrNo} Weapons (Inventory size: 4!)</Form.Label>
                    {weaponSet.map((weapon) => (
                      <Form.Check type="checkbox" checked={plyr.weapons.includes(weapon)} onChange={e=>handlePlayerWeaponsStateChange(plyr.plyrNo,e.target.checked,weapon)} label={weapon}/>
                    ))}
                    <FontAwesomeIcon onClick={e=>handlePlayerWeaponsStateChange(plyr.plyrNo,null,'random')} icon={faDice} size="sm" className="icon"/>
                  </Form.Group>
                </Row>
              </Col>

            ))}
          </Row>
        )}


        {playerArmor.length > 0 && (
          <Row className="multiAiFormBox">
            {playerArmor.map((plyr) => (
              <Col className="multiAiFormAi" sm={plyrStartPosWidth}>
                <Row>
                  <Form.Group as={Col} controlId="playerArmor" className="formGroup">
                    <Form.Label className="formLabel">Player {plyr.plyrNo} Armor (Inventory size: 4!)</Form.Label>
                    {armorSet.map((armor) => (
                      <Form.Check type="checkbox" checked={plyr.armor.includes(armor)} onChange={e=>handlePlayerArmorStateChange(plyr.plyrNo,e.target.checked,armor)} label={armor}/>
                    ))}
                    <FontAwesomeIcon onClick={e=>handlePlayerArmorStateChange(plyr.plyrNo,null,'random')} icon={faDice} size="sm" className="icon"/>
                  </Form.Group>
                </Row>
              </Col>

            ))}
          </Row>
        )}


        {props.showCanvasData.state === true &&
          (
            <div className="settingsCanvasContainer">

              <h3 className="settingsHeading">
                Choose Plyr {props.showCanvasData.plyrNo} {props.showCanvasData.type} Position:
              </h3>

              <canvas
                width={props.canvasWidth}
                height={props.canvasHeight}
                ref={props.canvasRef}
                className="settingsCanvas"
              />
            </div>
          )
        }



        {props.plyrStartPosList.length > 0 && (
          <Row className="multiAiFormBox">
          {props.plyrStartPosList.map((posArray) => {
            return<Col className="multiAiFormAi" sm={plyrStartPosWidth}>
              <Row>
                <Form.Group as={Col} controlId="plyrStartPos" className="formGroup">
                  <Form.Label className="formLabel">P{posArray.plyrNo} Start Position
                  </Form.Label>
                  <FontAwesomeIcon onClick={props.updateSettingsCanvasData.bind(this, {type:'human_start',plyrNo:posArray.plyrNo})} icon={faTh} size="sm" className="icon"/>
                  <FontAwesomeIcon onClick={e=>handlePlyrStartPosStateChange(posArray.plyrNo,'random')} icon={faDice} size="sm" className="icon"/>
                  <Form.Control as="select" value={posArray.selected} onChange={e=>handlePlyrStartPosStateChange(posArray.plyrNo,e.target.value)}>
                    <option >{posArray.selected.x},{posArray.selected.y}</option>
                    {posArray.posArray.map((pos) => {
                      if (pos === 'random') {
                        return<option>{pos}</option>
                      } else {
                        return<option>{pos.x},{pos.y}</option>
                      }
                    })}
                  </Form.Control>
                </Form.Group>
              </Row>
            </Col>
          })}
          </Row>
        )}


        <Row>
          <Form.Group as={Col} controlId="aiCount" className="formGroup">
            <Form.Label className="formLabel">Ai</Form.Label>
            <Form.Control as="select" value={aiCount.count} onChange={e=>handleAiCountStateChange(e.target.value)}>
              <option></option>
              {aiCountOptions.map((option) => (
                <option>{option}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>


        {aiRandom.length > 0 && (
          <Row className="multiAiFormBox">
          {aiRandom.map((plyr) => (
            <Col className="multiAiFormAi" sm={multiAiFormAiColWidth}>
            <Row>
              <Form.Group as={Col} controlId="aiRandom" className="formGroup">
                <Form.Label className="formLabel">Ai {plyr.plyrNo} Random?</Form.Label>
                <Form.Control as="select" value={plyr.random} onChange={e=>handleAiRandomStateChange(plyr.plyrNo,e.target.value)}>
                  <option>random</option>
                  <option>custom</option>
                </Form.Control>
              </Form.Group>
            </Row>
            </Col>
          ))}
          </Row>
        )}


        {aiMode.length > 0 && (
          <Row className="multiAiFormBox">
            {aiMode.map((plyr) => (
              <Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                <Row>
                  <Form.Group as={Col} controlId="aiStartPos" className="formGroup">
                    <Form.Label className="formLabel">Ai {plyr.plyrNo} Mode</Form.Label>
                    <Form.Control as="select" value={plyr.mode} onChange={e=>handleAiModeStateChange(plyr.plyrNo,e.target.value)}>
                      <option>careful</option>
                      <option>aggressive</option>
                      <option>random</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
              </Col>

            ))}
          </Row>
        )}


        {aiWeapons.length > 0 && (
          <Row className="multiAiFormBox">
            {aiWeapons.map((plyr) => (
              <Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                <Row>
                  <Form.Group as={Col} controlId="aiStartPos" className="formGroup">
                    <Form.Label className="formLabel">Ai {plyr.plyrNo} Weapons (Inventory size: 4!)</Form.Label>
                    {weaponSet.map((weapon) => (
                      <Form.Check type="checkbox" checked={plyr.weapons.includes(weapon)} onChange={e=>handleAiWeaponsStateChange(plyr.plyrNo,e.target.checked,weapon)} label={weapon}/>
                    ))}
                    <FontAwesomeIcon onClick={e=>handleAiWeaponsStateChange(plyr.plyrNo,null,'random')} icon={faDice} size="sm" className="icon"/>

                  </Form.Group>
                </Row>
              </Col>

            ))}
          </Row>
        )}

        {aiArmor.length > 0 && (
          <Row className="multiAiFormBox">
            {aiArmor.map((plyr) => (
              <Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                <Row>
                  <Form.Group as={Col} controlId="aiStartPos" className="formGroup">
                    <Form.Label className="formLabel">Ai {plyr.plyrNo} Armor (Inventory size: 4!)</Form.Label>
                    {armorSet.map((armor) => (
                      <Form.Check type="checkbox" checked={plyr.armor.includes(armor)} onChange={e=>handleAiArmorStateChange(plyr.plyrNo,e.target.checked,armor)} label={armor}/>
                    ))}
                    <FontAwesomeIcon onClick={e=>handleAiArmorStateChange(plyr.plyrNo,null,'random')} icon={faDice} size="sm" className="icon"/>

                  </Form.Group>
                </Row>
              </Col>

            ))}
          </Row>
        )}


        {aiMission.length > 0 && (
          <Row className="multiAiFormBox">
            {aiMission.map((plyr) => (
              <Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                <Row>
                  <Form.Group as={Col} controlId="aiStartPos" className="formGroup">
                    <Form.Label className="formLabel">Ai {plyr.plyrNo} Mission</Form.Label>
                    <Form.Control as="select" value={plyr.mission} onChange={e=>handleAiMissionStateChange(plyr.plyrNo,e.target.value)}>
                      <option>pursue</option>
                      <option>patrol</option>
                      <option>defend</option>
                      <option>random</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
              </Col>

            ))}
          </Row>
        )}

        {aiTeam.length > 0 && (
          <Row className="multiAiFormBox">
            {aiTeam.map((plyr) => (
              <Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                <Row>
                  <Form.Group as={Col} controlId="aiStartPos" className="formGroup">
                    <Form.Label className="formLabel">Ai {plyr.plyrNo} Team</Form.Label>
                    <Form.Control as="select" value={plyr.team} onChange={e=>handleAiTeamStateChange(plyr.plyrNo,e.target.value)}>
                      <option>Red</option>
                      <option>Blue</option>
                    </Form.Control>
                  </Form.Group>
                </Row>
              </Col>

            ))}
          </Row>
        )}


        {
          props.showCanvasData.state === true && props.showCanvasData.field.split("_")[0] === 'ai' && (
          <div className="settingsCanvasContainer">

            <h3 className="settingsHeading">
              Choose Plyr {props.showCanvasData.plyrNo} {props.showCanvasData.type} Position:
            </h3>

            <canvas
              width={props.canvasWidth}
              height={props.canvasHeight}
              ref={props.canvasRef2}
              className="settingsCanvas"
              id="settingsCanvas2"
            />
          </div>
        )
      }


        {props.aiStartPosList.length > 0 && (
          <Row className="multiAiFormBox">
            {props.aiStartPosList.map((posArray) => {

              if (posArray.mission === 'pursue' ) {
                return<Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                  <Row>
                    <Form.Group as={Col} controlId="aiStartPos" className="formGroup">
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'start') {
                          return<Form.Label className="formLabel">Ai {posArray.plyrNo} Start Position
                          <FontAwesomeIcon onClick={props.updateSettingsCanvasData.bind(this, {type:'ai_start',plyrNo:posArray.plyrNo})} icon={faTh} size="sm" className="icon"/>
                          <FontAwesomeIcon onClick={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'start','random')} icon={faDice} size="sm" className="icon"/>
                          </Form.Label>
                        }
                        else {
                          return<Form.Label className="formLabel">Ai {posArray.plyrNo} Start Position
                          <FontAwesomeIcon onClick={props.updateSettingsCanvasData.bind(this, {type:'ai_start',plyrNo:posArray.plyrNo})} icon={faTh} size="sm" className="icon"/>
                          <FontAwesomeIcon onClick={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'start','random')} icon={faDice} size="sm" className="icon"/>
                          </Form.Label>
                        }
                      })}
                      <Form.Control as="select" value={posArray.selected.filter(x=>x.type==='start')[0]} onChange={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'start',e.target.value)}>
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'start') {
                          return<option >{selected.cell.x},{selected.cell.y}</option>
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
                  </Row>
                </Col>
              }

              if (posArray.mission === 'defend' ) {
                return<Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                  <Row>
                    <Form.Group as={Col} controlId="aiStartPos" className="formGroup">
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'start') {
                          return<Form.Label className="formLabel">Ai {posArray.plyrNo} Start Position
                          <FontAwesomeIcon onClick={props.updateSettingsCanvasData.bind(this, {type:'ai_start',plyrNo:posArray.plyrNo})} icon={faTh} size="sm" className="icon"/>
                          <FontAwesomeIcon onClick={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'start','random')} icon={faDice} size="sm" className="icon"/>
                          </Form.Label>
                        }
                        else {
                          // <Form.Label className="formLabel">Ai {posArray.plyrNo} Start Position
                          // <FontAwesomeIcon onClick={props.updateSettingsCanvasData.bind(this, {type:'ai_start',plyrNo:posArray.plyrNo})} icon={faTh} size="sm" className="icon"/>
                          // <FontAwesomeIcon onClick={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'start','random')} icon={faDice} size="sm" className="icon"/>
                          // </Form.Label>
                        }
                      })}
                      <Form.Control as="select" value={posArray.selected.filter(x=>x.type==='start')[0]} onChange={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'start',e.target.value)}>
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'start') {
                          return<option >{selected.cell.x},{selected.cell.y}</option>
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
                  </Row>
                  <Row>
                    <Form.Group as={Col} controlId="aiDefendPos" className="formGroup">
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'defend') {
                          return<Form.Label className="formLabel">Ai {posArray.plyrNo} {posArray.mission} Position
                          <FontAwesomeIcon onClick={props.updateSettingsCanvasData.bind(this, {type:'ai_defend',plyrNo:posArray.plyrNo})} icon={faTh} size="sm" className="icon"/>
                          <FontAwesomeIcon onClick={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'defend','random')} icon={faDice} size="sm" className="icon"/>
                          </Form.Label>
                        }
                        else {
                          // <Form.Label className="formLabel">Ai {posArray.plyrNo} {posArray.mission} Position
                          // <FontAwesomeIcon onClick={props.updateSettingsCanvasData.bind(this, {type:'ai_defend',plyrNo:posArray.plyrNo})} icon={faTh} size="sm" className="icon"/>
                          // <FontAwesomeIcon onClick={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'defend','random')} icon={faDice} size="sm" className="icon"/>
                          // </Form.Label>
                        }
                      })}
                      <Form.Control as="select" value={posArray.selected.filter(x=>x.type==='defend')[0]} onChange={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'defend',e.target.value)}>
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'defend') {
                          return<option >{selected.cell.x},{selected.cell.y}</option>
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
                  </Row>
                </Col>
              }

              if (posArray.mission === 'patrol' ) {
                return<Col className="multiAiFormAi" sm={multiAiFormAiMissionColWidth}>
                  <Row>
                    <Form.Group as={Col} controlId="aiStartPos1" className="formGroup">
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'start') {
                          return<Form.Label className="formLabel">Ai {posArray.plyrNo} Start Position
                          <FontAwesomeIcon onClick={props.updateSettingsCanvasData.bind(this, {type:'ai_start',plyrNo:posArray.plyrNo})} icon={faTh} size="sm" className="icon"/>
                          <FontAwesomeIcon onClick={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'start','random')} icon={faDice} size="sm" className="icon"/>
                          </Form.Label>
                        }
                        else {
                          // <Form.Label className="formLabel">Ai {posArray.plyrNo} Start Position
                          // <FontAwesomeIcon onClick={props.updateSettingsCanvasData.bind(this, {type:'ai_start',plyrNo:posArray.plyrNo})} icon={faTh} size="sm" className="icon"/>
                          // <FontAwesomeIcon onClick={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'start','random')} icon={faDice} size="sm" className="icon"/>
                          // </Form.Label>
                        }
                      })}
                      <Form.Control as="select" value={posArray.selected.filter(x=>x.type==='start')[0]} onChange={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'start',e.target.value)}>
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'start') {
                          return<option >{selected.cell.x},{selected.cell.y}</option>
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
                          return<Form.Label className="formLabel">Ai {posArray.plyrNo} {posArray.mission} Position 1
                          <FontAwesomeIcon onClick={props.updateSettingsCanvasData.bind(this, {type:'ai_patrol1',plyrNo:posArray.plyrNo})} icon={faTh} size="sm" className="icon"/>
                          <FontAwesomeIcon onClick={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'patrol1','random')} icon={faDice} size="sm" className="icon"/>
                          </Form.Label>
                        }
                        else {
                          // <Form.Label className="formLabel">Ai {posArray.plyrNo} {posArray.mission} Position 1
                          //   <FontAwesomeIcon onClick={props.updateSettingsCanvasData.bind(this, {type:'ai_patrol1',plyrNo:posArray.plyrNo})} icon={faTh} size="sm" className="icon"/>
                          //   <FontAwesomeIcon onClick={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'patrol1','random')} icon={faDice} size="sm" className="icon"/>
                          // </Form.Label>
                        }
                      })}
                      <Form.Control as="select" value={posArray.selected.filter(x=>x.type==='patrol1')[0]} onChange={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'patrol1',e.target.value)}>
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'patrol1') {
                          return<option >{selected.cell.x},{selected.cell.y}</option>
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
                          return<Form.Label className="formLabel">Ai {posArray.plyrNo} {posArray.mission} Position 2
                          <FontAwesomeIcon onClick={props.updateSettingsCanvasData.bind(this, {type:'ai_patrol2',plyrNo:posArray.plyrNo})} icon={faTh} size="sm" className="icon"/>
                          <FontAwesomeIcon onClick={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'patrol2','random')} icon={faDice} size="sm" className="icon"/>
                          </Form.Label>
                        }
                        else {
                          // <Form.Label className="formLabel">Ai {posArray.plyrNo} {posArray.mission} Position 2
                          // <FontAwesomeIcon onClick={props.updateSettingsCanvasData.bind(this, {type:'ai_patrol2',plyrNo:posArray.plyrNo})} icon={faTh} size="sm" className="icon"/>
                          // <FontAwesomeIcon onClick={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'patrol2','random')} icon={faDice} size="sm" className="icon"/>
                          // </Form.Label>
                        }
                      })}
                      <Form.Control as="select" value={posArray.selected.filter(x=>x.type==='patrol2')[0]} onChange={e=>handleAiStartPosStateChange(posArray.mission,posArray.plyrNo,'patrol2',e.target.value)}>
                      {posArray.selected.map((selected) => {
                        if (selected.type === 'patrol2') {
                          return<option >{selected.cell.x},{selected.cell.y}</option>
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
                  </Row>
                </Col>
              }


            })}
          </Row>
        )}


        <Row className="formBtnRow">
          <div className="btnSubCont">
            <Button variant="success" type="submit" className="formBtn">Submit</Button>
            <Button variant="danger" className="formBtn" onClick={props.onCancel}>Cancel</Button>
          </div>
        </Row>
      </Form>

      <h2 className="settingsHeading">
        Controls :
      </h2>
      <img src={plyr1KeyboardDefaultDiagram} className="controlsImg gamepad"></img>
      <img src={plyr2KeyboardDefaultDiagram} className="controlsImg keyboard1"></img>
      <img src={gamepadDefaultDiagram} className="controlsImg keyboard2"></img>

      </div>
    </div>
  )
};

export default Settings;
