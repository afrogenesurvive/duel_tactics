import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover';
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
        <OverlayTrigger
          placement={'top'}
          overlay={
            <Popover id={`popover-positioned-${'top'}`}>
              <Popover.Content>
                <strong>Toggle Camera Sub-menu</strong>
              </Popover.Content>
            </Popover>
          }
        >
          <FontAwesomeIcon icon={faVideo} size="sm" className="cameraUIIcon"/>
        </OverlayTrigger>

      </a>
      {props.camera.mode === 'zoom' && (
        <div className="cameraBoxMode">

        <OverlayTrigger
          placement={'top'}
          overlay={
            <Popover id={`popover-positioned-${'top'}`}>
              <Popover.Content>
                <strong>Toggle 'Zoom' mode</strong>
              </Popover.Content>
            </Popover>
          }
        >
        <a href="javascript:" className="cameraModeHighlighted" onClick={props.toggleMode.bind(this, 'zoom')}>

          <FontAwesomeIcon icon={faSearchPlus} size="sm" className="cameraUIIcon"/>: {(props.camera.zoom.x-1).toFixed(2)}
          {props.camera.limits.state.zoom === true && (
            <FontAwesomeIcon icon={faExclamationTriangle} size="sm" className="cameraUIIconAlert"/>
          )}
        </a>
        </OverlayTrigger>


        <OverlayTrigger
          placement={'top'}
          overlay={
            <Popover id={`popover-positioned-${'top'}`}>
              <Popover.Content>
                <strong>Toggle 'Pan' mode</strong>
              </Popover.Content>
            </Popover>
          }
        >
          <a href="javascript:" className="" onClick={props.toggleMode.bind(this, 'pan')}>
            <FontAwesomeIcon icon={faExpandAlt} size="sm" className="cameraUIIcon"/>: {props.camera.pan.x},{props.camera.pan.y}
            {props.camera.limits.state.pan === true && (
              <FontAwesomeIcon icon={faExclamationTriangle} size="sm" className="cameraUIIconAlert"/>
            )}
          </a>
        </OverlayTrigger>

        </div>
      )}

      {props.camera.mode === 'pan' && (
        <div className="cameraBoxMode">

        <OverlayTrigger
          placement={'top'}
          overlay={
            <Popover id={`popover-positioned-${'top'}`}>
              <Popover.Content>
                <strong>Toggle 'Zoom' mode</strong>
              </Popover.Content>
            </Popover>
          }
        >
          <a href="javascript:" onClick={props.toggleMode.bind(this, 'zoom')}>
            <FontAwesomeIcon icon={faSearchPlus} size="sm" className="cameraUIIcon"/>: {(props.camera.zoom.x-1).toFixed(2)}
            {props.camera.limits.state.zoom === true && (
              <FontAwesomeIcon icon={faExclamationTriangle} size="sm" className="cameraUIIconAlert"/>
            )}
          </a>
        </OverlayTrigger>

        <OverlayTrigger
          placement={'top'}
          overlay={
            <Popover id={`popover-positioned-${'top'}`}>
              <Popover.Content>
                <strong>Toggle 'Pan' mode</strong>
              </Popover.Content>
            </Popover>
          }
        >
          <a href="javascript:" className=" cameraModeHighlighted" onClick={props.toggleMode.bind(this, 'pan')}>
            <FontAwesomeIcon icon={faExpandAlt} size="sm" className="cameraUIIcon"/>: {props.camera.panDirection}, {props.camera.pan.x},{props.camera.pan.y}
            {props.camera.limits.state.pan === true && (
              <FontAwesomeIcon icon={faExclamationTriangle} size="sm" className="cameraUIIconAlert"/>
            )}
          </a>
        </OverlayTrigger>


        </div>
      )}

      <OverlayTrigger
        placement={'top'}
        overlay={
          <Popover id={`popover-positioned-${'top'}`}>
            <Popover.Content>
              <strong>Reset Camera</strong>
            </Popover.Content>
          </Popover>
        }
      >
        <a href="javascript:"  onClick={props.preReset}>
          <FontAwesomeIcon icon={faUndo} size="sm" className="cameraUIIcon"/>
        </a>
      </OverlayTrigger>


    </div>
  )
};

export default CameraControl;
