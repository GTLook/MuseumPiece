import React, { Component } from 'react'
import {Col, Row, Button } from 'react-materialize'
import Webcam from 'react-webcam'

import { connect } from 'react-redux'
import { museumList } from '../actions'
import { withAuthentication } from '../helpers'

class ArtImage extends Component {

constructor(props) {
    super(props)
    this.constraints = { width: 1280, height: 720, facingMode: "environment" }
    this.state = { stream:null, screenShot:null }
  }

  setRef = (webcam) => {
      this.webcam = webcam
    }

  capture = () => {
     this.state.screenShot = this.webcam.getScreenshot()
   }

render() {
  return (
      <div>
        <Col>
          <Row>
            <Webcam
              audio={false}
              height={720}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={720}
              videoConstraints={this.constraints}
              />
          </Row>
          <Row>
            <Button waves='light' onClick={this.capture}>Capture Image</Button>
          </Row>
        </Col>
      </div>
    )
  }
}
//
// const style = {
//   preview: {
//     position: 'relative',
//   },
//   captureContainer: {
//     display: 'flex',
//     position: 'absolute',
//     justifyContent: 'center',
//     zIndex: 1,
//     bottom: 0,
//     width: '100%'
//   },
//   captureButton: {
//     backgroundColor: '#fff',
//     borderRadius: '50%',
//     height: 56,
//     width: 56,
//     color: '#000',
//     margin: 20
//   },
//   captureImage: {
//     width: '100%',
//   }
// }


const mapStateToProps = ({museumList}) => ({museumList})
export default connect(mapStateToProps)(withAuthentication(ArtImage))
