import React from 'react'
import { Col, Row, Card, CardTitle } from 'react-materialize'
import { Link } from 'react-router-dom'


const MuseumCard = ({museum}) => (
  <Card horizontal header={<CardTitle image={museum.museum_picture}></CardTitle>} actions={[<a href='#'>Explore Galleries</a>]}>
    <Link to={`${museum.museum_name.replace(/\s+/g, '')}`}>
      <h5>{museum.museum_name}</h5>
    </Link>
  </Card>
)

export default MuseumCard
