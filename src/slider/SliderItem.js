import React, { Component } from 'react'
import styled, { keyframes, css } from 'styled-components'

const shimmer = keyframes`
0% {
	background-position: -30rem 0;
}
100% {
		background-position: 30rem 0;
}
`,

Container = styled.div`
	& h4 {
		font-weight: 500;
	}
`,

Thumbnail = styled.div`
	width: 17.8rem;
	height: 10rem;

	margin-bottom: 1rem;
	
	${	
		props => !props.loaded ?
		css`animation: ${shimmer} 2s linear infinite;
		animation-fill-mode: forwards;
		background-color: #eee;
		background-image: linear-gradient(to right, #eee 0%, #fff 50%, #eee 100%);
		background-repeat: no-repeat;`
		:
		css`background: url(${props => {return props.src}}) center no-repeat;
		background-color: gray;
		background-size: cover;`
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
			<Container>
				<Thumbnail src={this.state.img} loaded={this.state.loaded} />
				<h4>{this.state.title}</h4>
			</Container>
		)
	}
}

export default SliderItem
