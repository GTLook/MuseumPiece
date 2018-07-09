import React, { Component } from 'react'
import {Col, Row, Button } from 'react-materialize'
import Webcam from 'react-webcam'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import { visionAPI } from '../actions'
import { withAuthentication } from '../helpers'

class ArtImage extends Component {

constructor(props) {
    super(props)
    this.constraints = { width: 1280, height: 720, facingMode: "environment" }
    this.state = { stream:null, screenShot:null }
    this.imageString = ''
  }

  setRef = (webcam) => {
      this.webcam = webcam
    }

  capture = () => {
     const img = this.webcam.getScreenshot()
     const googleJSONBody = this.googleJSON(img)

     axios.post(`https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCE2FbLX-ehm5HcHhnx5WcsLgIrbUpXuoY`, googleJSONBody)
         .then((response) => {
           console.log(response)
         })
         .catch((error) => console.log(`Vision API Error - ${error}`))
       }


   googleJSON = (imageString) => (
     {
      "requests":[
        {
          "image":{
            "content": imageString
          },
          "features":[
            {
              "type":"LABEL_DETECTION",
              "maxResults":1
            }
          ]
        }
      ]
    }
  )


render() {

  return (
      <div>
        <Row>
          <Col>
            <Link to={`/${this.props.match.params.museumId}/${this.props.match.params.galleryId} `}>Back</Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Webcam
              audio={false}
              height={500}
              width={500}
              ref={this.setRef}
              videoConstraints={this.constraints}
              screenshotFormat="image/jpeg"
              />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button waves='light' onClick={this.capture}>Capture Image</Button>
          </Col>
        </Row>
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


const mapStateToProps = ({museumList, galleryList}) => ({museumList, galleryList})
export default connect(mapStateToProps)(withAuthentication(ArtImage))
