import React from 'react'
import { Col, Row, CollapsibleItem, Divider } from 'react-materialize'
import { Link } from 'react-router-dom'


const ArtCard = ({art}) => (
    <CollapsibleItem header={art.art_title} icon=''>
      {console.log(art)}
      <div className='artCard'>
          <p>{art.art_flavor}</p>
          <Divider/>
          <p>{art.art_text}</p>
      </div>
  </CollapsibleItem>
)

export default ArtCard
