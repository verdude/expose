import React, { Component } from 'react';
import styled from 'styled-components';

import { Route, Switch, Link } from 'react-router-dom';

import Slider from './slider/Slider'
import Grid from './grid/Grid'
import { images } from './imgs'

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background: aquamarine;
  font-family: 'Great Vibes', cursive;
  font-size: 7em;
  height: 250px;
`

const Name = styled.div`
  margin: 1em;
  text-align: center;
  text-decoration: none;
  color: black;
`

const Footer = styled.footer`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const Anchor = styled.a``

const Page = styled.div``

const name = 'Hannah Wong Art'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mediums: []
        }
    }

    gen_keys(mediums) {
        return mediums.map((m, i) => {
            m.key = i;
            return m;
        })
    }

    async componentDidMount() {
        let mediums = Object.keys(images).map((medium) => {
            return {
                title: medium,
                "img": images[medium].length > 0 ?
                    images[medium][0] : "https://images.unsplash.com/photo-1527602433043-7d8923f324eb"
            }
        })
        mediums = await this.gen_keys(mediums)
        this.setState({ mediums: mediums })
    }

    render() {
        return (
            <Page>
                <Header>
                    <Name as={Link} to={'/'}>{name}</Name>
                </Header>
                <Switch>
                    <Route exact path='/' render={(props) => <Slider {...props} mediums={this.state.mediums} />} />
                    <Route exact path='/:title' render={(props) => <Grid {...props} />} />
                </Switch>
                <Footer>
                    <Anchor href="https://instagram.com/hannahwong.art">Instagram</Anchor>
                    <Anchor>Facebook</Anchor>
                    <Anchor>Fiver</Anchor>
                </Footer>
            </Page>
        );
    }
}

export default App
