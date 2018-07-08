import React from 'react'
import { Card, CardTitle } from 'react-materialize'
import { Link } from 'react-router-dom'


const MuseumCard = ({museum}) => (
  <div>
    <Link to={`${museum.museum_name.replace(/\s+/g, '')}`}>
      <Card horizontal header={<CardTitle image={museum.museum_picture}></CardTitle>} actions={[<a >Explore Galleries</a>]}>
        <h4>{museum.museum_name}</h4>
      </Card>
    </Link>
  </div>
)

export default MuseumCard
