import React from 'react'
import { Col, Row, Card, CardTitle } from 'react-materialize'
import { Link } from 'react-router-dom'


const GalleryCard = ({gallery, path}) => (
  <div>
    <Row>
      <Col>
        <Link to={`${path}/${gallery.gallery_title.replace(/\s+/g, '')}`}>
          <Card header={<CardTitle reveal image={gallery.gallery_picture} waves='light'/>}
            title={gallery.gallery_title}
            reveal={<p>{gallery.gallery_text}</p>}>
            <p>Link here</p>
          </Card>
        </Link>
      </Col>
    </Row>
  </div>
)

export default GalleryCard
