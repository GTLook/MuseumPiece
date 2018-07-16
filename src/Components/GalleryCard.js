import React from 'react'
import { Card, CardTitle, Divider } from 'react-materialize'
import { Link } from 'react-router-dom'
import { Swipeable } from 'react-touch'

const GalleryCard = ({props, gallery, path}) => (
    <Swipeable onSwipeLeft={ () => props.history.push(`${path}/${gallery.gallery_title.replace(/\s+/g, '')}`) }>
        <Card className="hoverable" header={<CardTitle reveal image={gallery.gallery_picture} waves='light'/>}
              title={gallery.gallery_title}
              reveal={
                <div>
                  <Divider/>
                  <p className="galleryText flow-text">{gallery.gallery_text}</p>
                  <Divider/>
                  <Link to={`${path}/${gallery.gallery_title.replace(/\s+/g, '')}`}>
                    <p> Explore the art in this gallery. </p>
                  </Link>
                </div> }>
          <Link to={`${path}/${gallery.gallery_title.replace(/\s+/g, '')}`}>
            <p> Explore the art in this gallery. </p>
          </Link>
        </Card>
      </Swipeable>
)

export default GalleryCard
