import React from 'react'
import { Col, Row, CollapsibleItem } from 'react-materialize'
import { Link } from 'react-router-dom'


const ArtCard = ({art}) => (
  <CollapsibleItem header={art.art_title} icon=''>

    <Row className='artCard'>
      <Col></Col>
    </Row>
  </CollapsibleItem>
)

export default ArtCard
