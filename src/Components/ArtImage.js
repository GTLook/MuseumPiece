import React, { Component } from 'react'
import {Col, Row } from 'react-materialize'
//import Camera from 'react-camera'
import Webcam from 'react-webcam'

import { connect } from 'react-redux'
import { museumList } from '../actions'
import { withAuthentication } from '../helpers'

import MuseumCard from '../Components/MuseumCard'

class ArtImage extends Component {

constructor(props) {
    super(props)
    this.constraints = { width: 1280, height: 720, facingMode: "environment" }
    this.state = {stream:null}
  }


  setRef = (webcam) => {
      this.webcam = webcam
    }

    capture = () => {
       const imageSrc = this.webcam.getScreenshot();
     }

render() {
  return (
      <div>
        <Webcam
          audio={false}
          height={1280}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={720}
          videoConstraints={this.constraints}
        />
        <button onClick={this.capture}>Capture photo</button>
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
