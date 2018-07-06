import React, { Component } from 'react'
import {Col, Row, Collapsible, CollapsibleItem } from 'react-materialize'
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { museumList } from '../actions'
import { withAuthentication } from '../helpers'

import ArtCard from '../Components/ArtCard'

class GalleryPage extends Component {

  constructor(props){
    super(props)
    this.gallery = true;
    }

  render() {
    if(!this.gallery) return <Redirect to="/"/>
    return(

      <Collapsible accordion defaultActiveKey={1}>
        <ArtCard art={"art"}/>
        <CollapsibleItem header='First' icon='filter_drama'>
          <img src="http://www.placekitten.com/500/500"/>
          Lorem ipsum dolor sit amet.
        </CollapsibleItem>

        <CollapsibleItem header='Third' icon='whatshot'>
          Lorem ipsum dolor sit amet.
        </CollapsibleItem>
      </Collapsible>

    )
  }
}

const mapStateToProps = ({museumList}) => ({museumList})
export default connect(mapStateToProps)(withAuthentication(GalleryPage))
