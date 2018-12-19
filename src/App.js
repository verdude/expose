import React, { Component } from 'react';
import styled from 'styled-components';

import Slider from './slider/Slider'

const Header = styled.header`
  display: flex;
  justify-content: center;
  background: palevioletred;
`

const Name = styled.div`
  margin: 1em;
`

const Footer = styled.footer`
  background: lightgrey;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const Link = styled.a`
  
`

var name = "Bookmarks"

class App extends Component {
  render() {
    return (
      <div>
        <Header>
          <Name>{name}</Name>
        </Header>
        <Slider mediums={mediums} />
        <Footer>
          <Link>Instagram</Link>
          <Link>Facebook</Link>
          <Link>Blog</Link>
        </Footer>
      </div>
    );
  }
}

var mediums = [
  {
    "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    "title": "Sketch"
  },
  {
    "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    "title": "Acrylic"
  },
  {
    "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    "title": "Charcoal"
  },
  {
    "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    "title": "Watercolor"
  },
  {
    "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    "title": "Something Else"
  }
]

export default App;
