import React, { Component } from 'react'
import {Col, Row, Collapsible, CollapsibleItem, Divider, Tabs, Tab} from 'react-materialize'
import { Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getAllMuseums, getAllGalleries } from '../actions'
import { withAuthentication } from '../helpers'

import ArtCard from '../Components/ArtCard'
import ArtImage from '../Components/ArtImage'

class GalleryPage extends Component {

  constructor(props){
    super(props)
    this.museum = this.props.museumList.find(ele => ele.museum_name.replace(/\s+/g, '') === this.props.match.params.museumId)
    this.gallery = this.props.galleryList.find(ele => ele.gallery_title.replace(/\s+/g, '') === this.props.match.params.galleryId)
    this.state = {
      activeArt: 0
    }
  }

  setActiveArt(int){
    this.setState({activeArt: int})
  }

    // componentDidMount(){
    //   if(!this.museum) this.props.getAllMuseums()
    //   if(this.museum && !this.gallery) this.props.getAllGalleries(this.museum.id)
    // }
  // <ArtCard activeArt={this.state.activeart} key={art.art_shortid} art={art}/>\
// <Link to={`/${this.props.match.params.museumId}/${this.props.match.params.galleryId}/FindArt`}>Find Art</Link>

  render() {
    if(!this.gallery) return <Redirect to="/"/>
    return(
      <div>
        <Row>
          <Col className="hide-on-small-only" l={6} xl={6}>
            <Collapsible defaultActiveKey={this.state.activeArt} accordion>
              {
                this.gallery.art.map((art, i) => {
                  return (
                    <CollapsibleItem key={art.art_shortid} onClick={() => this.setActiveArt(i)} header={art.art_title} icon=''>
                      <div >
                        <Divider/>
                        <p>{art.art_text}</p>
                        <Divider/>
                      </div>
                    </CollapsibleItem>
                  )
                })
              }
            </Collapsible>
          </Col>
          <Col className="hide-on-small-only" l={6} xl={6}>
            <Tabs className='z-depth-1'>
              <Tab title="Gallery Image" active>
                <img className="materialboxed responsive-img" src={this.gallery.art[this.state.activeArt].art_picture_url}/>
              </Tab>
              <Tab title="Image Search" >
                <ArtImage museum={this.museum} gallery={this.gallery} />
              </Tab>
              <Tab title="Audio">Test 3</Tab>
            </Tabs>
          </Col>
          <Col className="hide-on-med-and-up" >
            <Tabs className='z-depth-1'>
              <Tab title="Gallery List" active>
                <Collapsible defaultActiveKey={this.state.activeArt} accordion>
                  {
                    this.gallery.art.map((art, i) => {
                      return (
                        <CollapsibleItem key={art.art_shortid} onClick={() => this.setActiveArt(i)} header={art.art_title} icon=''>
                          <div >
                            <Divider/>
                            <p>{art.art_text}</p>
                            <Divider/>
                          </div>
                        </CollapsibleItem>
                      )
                    })
                  }
                </Collapsible>
              </Tab>
              <Tab title="Art Image">
                <img className="materialboxed responsive-img" src={this.gallery.art[this.state.activeArt].art_picture_url}/>
              </Tab>
              <Tab title="Image Search" >
                <ArtImage museum={this.museum} gallery={this.gallery} />
              </Tab>
              <Tab title="Audio">Test 3</Tab>
            </Tabs>
          </Col>
          <p>The state is {this.state.activeArt}</p>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({museumList, galleryList}) => ({museumList, galleryList})
const mapDispatchToProps = dispatch => bindActionCreators({getAllGalleries}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(GalleryPage))
