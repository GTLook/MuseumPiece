import React from 'react'
import { CollapsibleItem, Divider } from 'react-materialize'

const ArtCard = ({art}) => (
    <CollapsibleItem header={art.art_title} icon=''>
      <div >
          <Divider/>
          <p>{art.art_text}</p>
      </div>
  </CollapsibleItem>
)

export default ArtCard
