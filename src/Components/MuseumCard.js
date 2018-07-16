import React from 'react'
import { Card, CardTitle, Divider } from 'react-materialize'
// import { Link } from 'react-router-dom'


const MuseumCard = ({museum}) => (
  <div>
    <Card className="hoverable" horizontal header={<CardTitle image={museum.museum_picture}></CardTitle>}>
      <h4 className="center">{museum.museum_name}</h4>
      <Divider/>
      <h6 className="galleryCardInfo">Explore the Open Galleries.</h6>
    </Card>
  </div>
)

export default MuseumCard
