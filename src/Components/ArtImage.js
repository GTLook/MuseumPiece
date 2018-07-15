import React, { Component } from 'react'
import {Col, Row, Button } from 'react-materialize'
import Webcam from 'react-webcam'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

//import { visionAPI } from '../actions'
import { withAuthentication } from '../helpers'

class ArtImage extends Component {
  constructor(props) {
    super(props)
    this.constraints = { width: 400, height: 400, facingMode: "environment" }
    this.museum = this.props.museum
    this.gallery = this.props.gallery
  }

  setRef = (webcam) => {
      this.webcam = webcam
    }

  capture = () => {
    console.log(this.props)
     const img = this.webcam.getScreenshot()
     const googleJSONBody = this.googleJSON(img)
     axios.post(`https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCE2FbLX-ehm5HcHhnx5WcsLgIrbUpXuoY`, googleJSONBody)
         .then((response) => {
            this.gallery.art.forEach(art => {
              const findMatch = response.data.responses[0].logoAnnotations.find(logo => logo.description == art.art_title)
              findMatch ? this.props.setActiveArt(art) : null
            })
          })
         .catch((error) => console.log(`Vision API Error - ${error}`))
       }

   googleJSON = (imageString) => (
     {
      "requests":[
        {
          "image":{
           "content": imageString.split(',')[1]
          },
          "features":[
            {
              "type":"LOGO_DETECTION",
              "maxResults":10
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
          <Col s={8} m={8} l={8} xl={8}>
            <Webcam
              audio={false}
              height={400}
              width={400}
              ref={this.setRef}
              videoConstraints={this.constraints}
              screenshotFormat="image/jpeg"
              />
          </Col>
        </Row>
        <Row>
          <Col s={8} m={8} l={8} xl={8}>
            <Button waves='light' onClick={this.capture}>Search Art Database.</Button>

          </Col>
        </Row>
      </div>
    )
  }
}


const mapStateToProps = ({museumList, galleryList}) => ({museumList, galleryList})
export default connect(mapStateToProps)(withAuthentication(ArtImage))
