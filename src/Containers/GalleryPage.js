import React, { Component } from 'react'
import { Col, Row, Collection, CollectionItem, Divider, Tabs, Tab, Card, CardTitle, Button, Navbar, NavItem} from 'react-materialize'
import { Link, Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Swipeable } from 'react-touch'
import ReactPlayer from 'react-player'

import { getAllMuseums, getAllGalleries } from '../actions'
import { withAuthentication } from '../helpers'

import ArtCard from '../Components/ArtCard'
import ArtImage from '../Components/ArtImage'

class GalleryPage extends Component {

  constructor(props){
    super(props)
    this.museum = this.props.museumList.find(ele => ele.museum_name.replace(/\s+/g, '') === this.props.match.params.museumId)
    this.state = {
      activeArt: {},
      gallery: { art: []},
      searchForImage: false,
      showArt: true,
      audio: false
    }
  }

  static getDerivedStateFromProps = (props, state) =>{
    const gallery = props.galleryList.find(ele => ele.gallery_title.replace(/\s+/g, '') === props.match.params.galleryId)
    // console.log(state)
    if(state.activeArt.id){
      return {...state }
    }
    if(gallery && gallery.art && gallery.art[0]){
      return {...state, gallery, activeArt: gallery.art[0]}
    }
    else {
      return {...state }
    }
  }

  setActiveArt = (art) => {
    this.setState({activeArt: art})
  }

  scrollActiveArt = (direction) => {
    const index = this.state.gallery.art.findIndex(art => art.art_title == this.state.activeArt.art_title)
      if(direction === "up") return this.setActiveArt((index < (this.state.gallery.art.length-1)) ? this.state.gallery.art[index+1] : this.state.gallery.art[0] )
      if(direction === "down") return this.setActiveArt((index > 0) ? this.state.gallery.art[index-1] : this.state.gallery.art[this.state.gallery.art.length-1])
  }

  render() {
    // this.gallery = this.props.galleryList.find(ele => ele.gallery_title.replace(/\s+/g, '') === this.props.match.params.galleryId) || {art:[]}
    //
    if(!this.state.gallery.art.length) return <Redirect to={`/${this.props.match.params.museumId}`}/>
    return(
      <Swipeable
        onSwipeRight={() => this.props.history.goBack()}
        onSwipeUp={() => this.scrollActiveArt("up")}
        onSwipeDown={() => this.scrollActiveArt("down")} >
        <Row>
          <Navbar brand={this.state.gallery.gallery_title} right={true}>
            <NavItem onClick={() => this.setState({ showArt: true, searchForImage:false, audio:false})}>Art</NavItem>
            <NavItem onClick={() => this.setState({ showArt: false, searchForImage:true, audio:false})}>Find Art</NavItem>
            <NavItem onClick={() => this.setState({ showArt: false, searchForImage:false, audio:true})}>Audio</NavItem>
          </Navbar>
          {!this.state.showArt ? null : (
          <Col className="" s={12} m={12} l={3} xl={3}>
            <Collection>
              {
                this.state.gallery.art.map(art => {
                  return (
                    <CollectionItem active={(this.state.activeArt)?(this.state.activeArt.id===art.id):false} key={art.art_shortid} onClick={() => this.setActiveArt(art)}>
                      <p>{art.art_title}</p>
                    </CollectionItem> )
                  })
                }
              </Collection>
            </Col>
            <Col className="" s={12} m={12} l={9} xl={9}>
              <Card
                header={ <CardTitle reveal image={this.state.activeArt.art_picture_url} waves='light' /> }
                title={this.state.activeArt.art_title}
                reveal={
                  <div>
                    <p className="galleryText">{`${this.state.activeArt.art_flavor}`}</p>
                    <p className="galleryText">{`${this.state.gallery.gallery_title}`}</p>
                    <Divider/>
                    <p className="galleryText">{this.state.activeArt.art_flavor}</p>
                    <Divider/>
                    <p className="galleryText">{this.state.activeArt.art_text}</p>
                  </div>
                } >
                  <p>{this.state.activeArt.art_flavor}</p>
                </Card>
              </Col>
                    )
            }
        </Row>
      </Swipeable>
    )
  }
}

const mapStateToProps = ({museumList, galleryList}) => ({museumList, galleryList})
const mapDispatchToProps = dispatch => bindActionCreators({getAllGalleries}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(GalleryPage))
