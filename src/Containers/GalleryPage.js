import React, { Component } from 'react'
import {Col, Row, Collapsible, CollapsibleItem } from 'react-materialize'

import { connect } from 'react-redux'
import { museumList } from '../actions'
import { withAuthentication } from '../helpers'

import ArtCard from '../Components/ArtCard'

class GalleryPage extends Component {
  render() {
    return(
      <Collapsible accordion defaultActiveKey={1}>
        <CollapsibleItem header='First' icon='filter_drama'>
          Lorem ipsum dolor sit amet.
        </CollapsibleItem>
        <CollapsibleItem header='Second' icon='place'>
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
