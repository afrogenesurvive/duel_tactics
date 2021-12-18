import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faVideo,
  faSearchPlus,
  faExpandAlt,
  faUndo,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';


import './debugBox.css';

const CameraControl = (props) => {

  return (
    <div className="cameraControlBox">

      <a href="javascript:"  onClick={props.close}>
        <FontAwesomeIcon icon={faVideo} size="sm" className="cameraUIIcon"/>
      </a>
      {props.camera.mode === 'zoom' && (
        <div className="cameraBoxMode">
        <a href="javascript:" className="cameraModeHighlighted" onClick={props.toggleMode.bind(this, 'zoom')}>
          <FontAwesomeIcon icon={faSearchPlus} size="sm" className="cameraUIIcon"/>: {(props.camera.zoom.x-1).toFixed(2)}
          {props.camera.limits.state.zoom === true && (
            <FontAwesomeIcon icon={faExclamationTriangle} size="sm" className="cameraUIIconAlert"/>
          )}
        </a>


        <a href="javascript:" className="" onClick={props.toggleMode.bind(this, 'pan')}>
          <FontAwesomeIcon icon={faExpandAlt} size="sm" className="cameraUIIcon"/>: {props.camera.pan.x},{props.camera.pan.y}
          {props.camera.limits.state.pan === true && (
            <FontAwesomeIcon icon={faExclamationTriangle} size="sm" className="cameraUIIconAlert"/>
          )}
        </a>

        </div>
      )}
      {props.camera.mode === 'pan' && (
        <div className="cameraBoxMode">
        <a href="javascript:" onClick={props.toggleMode.bind(this, 'zoom')}>
          <FontAwesomeIcon icon={faSearchPlus} size="sm" className="cameraUIIcon"/>: {(props.camera.zoom.x-1).toFixed(2)}
          {props.camera.limits.state.zoom === true && (
            <FontAwesomeIcon icon={faExclamationTriangle} size="sm" className="cameraUIIconAlert"/>
          )}
        </a>

        <a href="javascript:" className=" cameraModeHighlighted" onClick={props.toggleMode.bind(this, 'pan')}>
          <FontAwesomeIcon icon={faExpandAlt} size="sm" className="cameraUIIcon"/>: {props.camera.panDirection}, {props.camera.pan.x},{props.camera.pan.y}
          {props.camera.limits.state.pan === true && (
            <FontAwesomeIcon icon={faExclamationTriangle} size="sm" className="cameraUIIconAlert"/>
          )}
        </a>

        </div>
      )}
      <a href="javascript:"  onClick={props.preReset}>
        <FontAwesomeIcon icon={faUndo} size="sm" className="cameraUIIcon"/>
      </a>

    </div>
  )
};

export default CameraControl;
