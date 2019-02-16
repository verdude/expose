import React, { Component } from 'react';
import styled from 'styled-components';

import { Route, Switch, Link } from 'react-router-dom';

import Slider from './slider/Slider'
import Grid from './grid/Grid'

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
        });
    }

    async componentDidMount() {
        let mediums = [
            {
                "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb",
                "title": "Graphite"
            },
            {
                "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb",
                "title": "Acrylic"
            },
            {
                "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb",
                "title": "Watercolor"
            },
            {
                "img": "https://images.unsplash.com/photo-1546029115-712217181a58",
                "title": "Digital"
            },
            {
                "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb",
                "title": "Marker"
            },
            {
                "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb",
                "title": "Pastel"
            },
            {
                "title": "Colored Pencil",
                "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb"
            }
        ]
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
                    <Route exact path='/grid/:title' render={(props) => <Grid {...props} urls={[]} />} />
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
