import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { request, AuthenticationService } from '../helpers'

import Footer  from '../Components/Footer'
import Home from './Home'
import MuseumPage from './MuseumPage'
import GalleryPage from './GalleryPage'
import ArtPage from './ArtPage'
// import ArtImage from '../Components/ArtImage'

//CSS
import '../css/App.css';

class App extends Component {

  render(){
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/' component={ Home } />
              <Route exact path='/:museumId' component={ MuseumPage } />
              <Route exact path='/:museumId/:galleryId' component={ GalleryPage } />
              <Route exact path='/:museumId/:galleryId/:artId' component={ ArtPage } />
            </Switch>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(null, mapDispatchToProps)(App)
