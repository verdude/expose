import React, { Component } from 'react';
import styled from 'styled-components';

import Slider from './slider/Slider'

const Header = styled.header`
  display: flex;
  justify-content: center;
  background: palevioletred;
  font-family: 'Great Vibes', cursive;
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

const Page = styled.div`
`

const name = 'name'

class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <Page>
        <Header>
          <Name>{name}</Name>
        </Header>
        <Slider />
        <Footer>
          <Link>link1</Link>
          <Link>link2</Link>
          <Link>link4</Link>
        </Footer>
      </Page>
    );
  }
}

export default App
