import React, { Component } from 'react';
import styled from 'styled-components';

import { Route, Switch } from 'react-router-dom';

import Slider from './slider/Slider'
import Grid from './grid/Grid'

const Header = styled.header`
  display: flex;
  justify-content: center;
  background: aquamarine;
  font-family: 'Great Vibes', cursive;
  font-size: 7em;
  overflow: hidden;
  text-align: center;
  height: 250px;
`

const Name = styled.div`
  margin: 1em;
`

const Footer = styled.footer`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const Link = styled.a`

`

const Page = styled.div`
`

const name = 'Hannah Wong Art'

class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <Page>
        <Header>
          <Name>{name}</Name>
        </Header>
        <Switch>
            <Route exact path='/' component={Slider} />
            <Route exact path='/grid' component={Grid} />
        </Switch>
        <Footer>
          <Link href="https://instagram.com/hannahwong.art">Instagram</Link>
          <Link>Facebook</Link>
          <Link>Fiver</Link>
        </Footer>
      </Page>
    );
  }
}

export default App
