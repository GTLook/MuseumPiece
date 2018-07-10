import React from 'react'
import { Col, Row, Card, CardTitle, Divider } from 'react-materialize'
import { Link } from 'react-router-dom'


const GalleryCard = ({gallery, path}) => (
  <div>
    <Row>
      <Col>
        <Card className="hoverable" header={<CardTitle reveal image={gallery.gallery_picture} waves='light'/>}
              title={gallery.gallery_title}
              reveal={
                <div>
                  <Divider/>
                  <p className="galleryText">{gallery.gallery_text}</p>

                  <Link to={`${path}/${gallery.gallery_title.replace(/\s+/g, '')}`}>
                    <p> Explore the art in this gallery. </p>
                  </Link>
                </div>
              }>
          <Link to={`${path}/${gallery.gallery_title.replace(/\s+/g, '')}`}>
            <p> Explore the art in this gallery. </p>
          </Link>
        </Card>
      </Col>
    </Row>
  </div>
)

export default GalleryCard
