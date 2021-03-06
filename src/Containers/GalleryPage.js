import React, { Component } from 'react'
import { Col, Row, Collection, CollectionItem, Divider, Card, CardTitle, Navbar, NavItem, Input } from 'react-materialize'
import { Redirect } from 'react-router-dom'
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
      audio_playing: false,
      audio_volume: 1,
      audio_loop: false,
    }
  }

  static getDerivedStateFromProps = (props, state) =>{
    const gallery = props.galleryList.find(ele => ele.gallery_title.replace(/\s+/g, '') === props.match.params.galleryId)
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
    const index = this.state.gallery.art.findIndex(art => art.art_title === this.state.activeArt.art_title)
      if(direction === "up") return this.setActiveArt((index < (this.state.gallery.art.length-1)) ? this.state.gallery.art[index+1] : this.state.gallery.art[0] )
      if(direction === "down") return this.setActiveArt((index > 0) ? this.state.gallery.art[index-1] : this.state.gallery.art[this.state.gallery.art.length-1])
      if(direction === "left") return this.setState({ showArt: false, searchForImage:true, audio:false})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeArt !== this.state.activeArt) {
    this.setState({ showArt: true, searchForImage:false, audio:false})
  }
}

  render() {
    if(!this.state.gallery.art.length) return <Redirect to={`/${this.props.match.params.museumId}`}/>
    return(
      <Swipeable
        onSwipeRight={() => this.props.history.goBack()}
        onSwipeUp={() => this.scrollActiveArt("up")}
        onSwipeDown={() => this.scrollActiveArt("down")}
        onSwipeLeft={() => this.scrollActiveArt("left")} >
        <Row>
          <Navbar brand={this.state.gallery.gallery_title} right={true}>
            <NavItem onClick={() => this.setState({ showArt: true, searchForImage:false, audio:false})}>Art</NavItem>
            <NavItem onClick={() => this.setState({ showArt: false, searchForImage:true, audio:false})}>Search Art</NavItem>
            <NavItem onClick={() => this.setState({ showArt: false, searchForImage:false, audio:true})}>Audio</NavItem>
            <NavItem ><i className="far fa-user"></i></NavItem>
          </Navbar>
          <Col s={1} m={1} l={1} xl={1} > </Col>
          <Col s={10} m={10} l={10} xl={10}>
            {!this.state.showArt ? null : (
            <div>
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
                        <Divider/>
                        <p className="galleryText flow-text">{`${this.state.activeArt.art_flavor}`}</p>
                        <p className="galleryText flow-text">{`${this.state.gallery.gallery_title}`}</p>
                        <Divider/>
                        <p className="galleryText flow-text">{this.state.activeArt.art_text}</p>
                        <Divider/>
                          {(this.state.audio_playing)? (
                            <ReactPlayer url={`${this.state.activeArt.art_audio}`}
                                          height={100}
                                          controls={true}
                                          playing={this.state.audio_playing}
                                          loop={this.state.audio_loop}
                                          volume={this.state.audio_volume} /> ):null}
                      </div>
                    }>
                      <div>
                        <p>{this.state.activeArt.art_flavor}</p>
                      </div>
                    </Card>
                  </Col>
                </div>
              )}
              {!this.state.searchForImage ? null :
                (
                  <ArtImage setActiveArt={this.setActiveArt}
                            museum={this.museum}
                            gallery={this.state.gallery}/>
                )}
              {!this.state.audio ? null : (
                <Col s={12} m={12} l={12} xl={12}>
                  <Collection>
                    <CollectionItem>
                       -  The Automatic Audio Tour is {`${this.state.audio_playing?"Enabled":"Disabled"}`}
                      <Input type='checkbox' value='green' label='Enable Audio Tour' defaultChecked='checked' onChange={() => this.setState({audio_playing: (!this.state.audio_playing)}) } />
                    </CollectionItem>
                    <CollectionItem>
                      -  The Looping Audio Tour is {`${this.state.audio_loop?"Enabled":"Disabled"}`}
                      <Input type='checkbox' value='green' label='Enable Looping Audio' defaultChecked='checked' onChange={() => this.setState({audio_loop: (!this.state.audio_loop)}) } />
                    </CollectionItem>
                  </Collection>
                </Col>
              )}
          </Col>
        </Row>
      </Swipeable>
    )
  }
}

const mapStateToProps = ({museumList, galleryList}) => ({museumList, galleryList})
const mapDispatchToProps = dispatch => bindActionCreators({getAllGalleries}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(GalleryPage))
