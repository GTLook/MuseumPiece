import React from 'react'
import { Col, Row, Card, CardTitle } from 'react-materialize'
import { Link } from 'react-router-dom'


const MuseumCard = ({museum}) => (
  <div>
    <Row >
      <Col m={7} s={12}>
        <Card horizontal header={<CardTitle image={museum.museum_picture}></CardTitle>} actions={[<a href='#'>Link here?</a>]}>
          <Link to={`${museum.museum_name.replace(/\s+/g, '')}`}>
            <h5>{museum.museum_name}</h5>
          </Link>
        </Card>
      </Col>
    </Row>
  </div>
)

export default MuseumCard
