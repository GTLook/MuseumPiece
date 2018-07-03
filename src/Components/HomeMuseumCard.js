import React from 'react'
import { Col, Row, Card, CardTitle } from 'react-materialize'
import { Link } from 'react-router-dom'


const HomeMuseumCard = ({info}) => (
  <div>
    <Row >
      <Col m={7} s={12}>
        <Card horizontal header={<CardTitle image={info.museum_picture}></CardTitle>} actions={[<a href='#'>Directions</a>]}>
          <Link to={`${info.museum_name.replace(/\s+/g, '')}`}>
            <h5>{info.museum_name}</h5>
          </Link>
        </Card>
      </Col>
    </Row>
  </div>
)

export default HomeMuseumCard
