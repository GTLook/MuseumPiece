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
    this.constraints = { width: 500, height: 500, facingMode: "environment" }
    // this.museum = this.props.museumList.find(ele => ele.museum_name.replace(/\s+/g, '') === this.props.match.params.museumId)
    // this.gallery = this.props.galleryList.find(ele => ele.gallery_title.replace(/\s+/g, '') === this.props.match.params.galleryId)
    this.state = {
      activeArtObj: {}
    }
  }

  setRef = (webcam) => {
      this.webcam = webcam
    }

  capture = () => {
     const img = this.webcam.getScreenshot()
     const googleJSONBody = this.googleJSON(img)
     axios.post(`https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCE2FbLX-ehm5HcHhnx5WcsLgIrbUpXuoY`, googleJSONBody)
         .then((response) => {
            this.gallery.art.forEach((art, i) => {
              const findMatch = response.data.responses[0].logoAnnotations.find(logo => logo.description == art.art_title)
              findMatch ? this.setState({activeArt: i}) : null
            })
           // response.data.responses[0].logoAnnotations.forEach(data => {
           //   const findMatch = this.gallery.art.find(art => art.art_title == data.description)
           //    findMatch ? this.setState({activeArt: findMatch}) : null
           // })
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
            <Button waves='light' onClick={this.capture}>Search Art Database.</Button>
          </Col>
        </Row>
      </div>
    )
  }
}


const mapStateToProps = ({museumList, galleryList}) => ({museumList, galleryList})
export default connect(mapStateToProps)(withAuthentication(ArtImage))
