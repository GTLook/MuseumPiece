import React from 'react'
import { Card, CardTitle, Divider } from 'react-materialize'
import { Link } from 'react-router-dom'


const MuseumCard = ({museum}) => (
  <div>
    <Link to={`${museum.museum_name.replace(/\s+/g, '')}`}>
      <Card horizontal header={<CardTitle image={museum.museum_picture}></CardTitle>}>
        <h4 className="center">{museum.museum_name}</h4>
        <Divider/>
        <h6 className="galleryCardInfo">Explore Galleries</h6>
      </Card>
    </Link>
  </div>
)

export default MuseumCard
