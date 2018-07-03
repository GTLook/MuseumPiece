import React from 'react'
import {Col, Row} from 'react-materialize'
import { Link } from 'react-router-dom'

const NotFound = () => (

<section className='notFound'>
  <Row>
    <Col s={12} className='grid-example'>
      <img class="materialboxed" width="650" src="Assets/404.jpg">
      <h1>Sorry, Something went wrong!</h1>
      <p className="grey-text text-darken-3 lighten-3"><Link to='/'> Take me Home!<Link></p>
    </Col>
  </Row>
</section>
)

export default NotFound
