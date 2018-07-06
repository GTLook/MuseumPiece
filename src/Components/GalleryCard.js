import React from 'react'
import { Col, Row, Card, CardTitle } from 'react-materialize'
import { Link } from 'react-router-dom'


const GalleryCard = ({gallery, path}) => (
  <Card header={<CardTitle reveal image={gallery.gallery_picture} waves='light'/>}
    title={gallery.gallery_title}
    reveal={<p>{gallery.gallery_text}</p>}>
    <Link to={`${path}/${gallery.gallery_title.replace(/\s+/g, '')}`}>
      <p>Link here</p>
    </Link>
  </Card>

)

export default GalleryCard
