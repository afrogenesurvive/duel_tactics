import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import loading from './assets/loading1.gif'


import './settings.css';

const Loading = props => {

  return (
    <div className="loadingOverlay">
      
        <img src={loading} className='loadingImg' alt="logo" />
      
    </div>
  )
};

export default Loading;
