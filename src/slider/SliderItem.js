import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import Thumbnail from '../Thumbnail'
import { Link } from 'react-router-dom'


const Container = styled.div`
	text-decoration:none;
	color: black;
	& h4 {
		font-weight: 500;
	}
`

class SliderItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			img: props.data.img,
			title: props.data.title,
			loaded: false
		}
	}

	componentWillMount() {
		var that = this
		var temp = new Image();
		temp.onload = () => {
			that.setState({loaded: true})
		}
		temp.src = this.state.img
	}

	render() {
		return (
			<Container as={Link} to={`/grid/${this.state.title}`}>
				<Thumbnail src={this.state.img} loaded={this.state.loaded} />
				{this.state.title?<h4>{this.state.title}</h4>:null}
			</Container>
		)
	}
}

export default SliderItem
