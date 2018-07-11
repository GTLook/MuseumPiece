import React, { Component } from 'react'
import {Col, Row, Collection, CollectionItem, Divider, Tabs, Tab} from 'react-materialize'
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
      activeArt: {}
    }
  }

  setActiveArt = (art) => {
    this.setState({activeArt: art})
    // this.collapsibleInstance.open(int)
    // Collapsible.forceUpdate()
  }

  // <Col className="hide-on-med-and-up" >
  //   <Tabs className='z-depth-1'>
  //     <Tab title="Gallery List" active>
  //       <Collection>
  //         {
  //           this.gallery.art.map(art => {
  //             return (
  //               <CollectionItem key={art.art_shortid} onClick={() => this.setActiveArt(art)} >
  //                 <div >
  //                   <Divider/>
  //                   <p>{art.art_title}</p>
  //                   <Divider/>
  //                 </div>
  //               </CollectionItem> )
  //           })
  //         }
  //       </Collection>
  //     </Tab>
  //     <Tab title="Art Image">
  //       <img className="materialboxed responsive-img" src={this.state.activeArt.art_picture_url}/>
  //       <Divider/>
  //       <p>{this.state.activeArt.art_flavor}</p>
  //     </Tab>
  //     <Tab title="Image Search" >
  //       <ArtImage
  //         className="responsive-img"
  //         museum={this.museum}
  //         gallery={this.gallery}
  //         setActiveArt={this.setActiveArt}
  //       />
  //     </Tab>
  //     <Tab title="Audio">
  //       <p>Enable audio playing here</p>
  //     </Tab>
  //   </Tabs>
  // </Col>

  render() {
    console.log(this.state)
    if(!this.gallery) return <Redirect to="/"/>
    return(
      <div>
        <Row>
          <Col className="hide-on-small-only" m={6} l={6} xl={6}>
            <Collection>
              {
                this.gallery.art.map(art => {
                  return (
                    <CollectionItem key={art.art_shortid} onClick={() => this.setActiveArt(art)}>
                      <div>
                        <p>{art.art_title}</p>
                      </div>
                    </CollectionItem> )
                })
              }
            </Collection>
          </Col>
          <Col className="hide-on-small-only" l={6} xl={6}>
            <Tabs className='z-depth-1 swipeable'>
              <Tab title="Gallery Image" active>
                <img className="materialboxed responsive-img" src={this.state.activeArt.art_picture_url}/>
                <Divider/>
                <p>{this.state.activeArt.art_flavor}</p>
              </Tab>
              <Tab title="Image Search" >
                <ArtImage museum={this.museum} gallery={this.gallery} setActiveArt={this.setActiveArt}/>
              </Tab>
              <Tab title="Audio">Test 3</Tab>
            </Tabs>
          </Col>

          <p>The state is {this.state.activeArt.art_title}</p>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({museumList, galleryList}) => ({museumList, galleryList})
const mapDispatchToProps = dispatch => bindActionCreators({getAllGalleries}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(GalleryPage))
