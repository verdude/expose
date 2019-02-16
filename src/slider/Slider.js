import React, { Component } from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import SliderItem from './SliderItem'

import arrowLeft from '../arrow-left.svg'
import arrowRight from '../arrow-right.svg'

const Container = styled.div`
	padding: 2rem;

	& > div {
		position: relative;
	}
`,

	SlideWrapper = styled.div`
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: ${props => 'repeat(' + props.count + ', 17.8rem)'};
		grid-gap: 5rem;

		overflow-x: scroll;
		overflow-y: hidden;

		will-change: overflow;

		scroll-behavior: smooth;

		::-webkit-scrollbar {
			background: transparent;
		}

		-ms-overflow-style: -ms-autohiding-scrollbar;

		& > div:last-child {
			padding-right: 6rem;
		}
	`,

	Arrow = styled.div`

		display: flex;
		align-items: center;
		justify-content: center;

		position: absolute;
		top: 0;

		height: 17.8rem;
		width: 6rem;

		cursor: pointer;

		&.right{
			right: 0;
			background-image: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0));

			& > div {
				height: 1.5rem;
				width: 1.5rem;

				transition: opacity .25s ease-in-out;
				opacity: ${props => props.right ? '0' : '1'};
				background-image: url(${arrowRight});
				background-size: cover;
			}
		}

		&.left {
			left: ${props => props.hideLeft ? '-100rem' : '0'};

			transition: opacity .25s ease-in-out;
			opacity: ${props => props.left ? '0' : '1'};
			background-image: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0));

			& > div {
				height: 1.5rem;
				width: 1.5rem;

				transition: opacity .25s ease-in-out;
				opacity: ${props => props.left ? '0' : '1'};
				background-image: url(${arrowLeft});
				background-size: cover;
			}
		}

	`

export default class Slider extends Component {
	constructor(props) {
		super(props)

		this.state = {
			left: true,
			hideLeft: true
		}

		this.wrapper = React.createRef()
		this.scrollLeft = this.scrollLeft.bind(this)
		this.scrollRight = this.scrollRight.bind(this)
		this.scrollListener = this.scrollListener.bind(this)
	}

	scrollListener(e) {
		if (e.target.scrollLeft === 0) {
			this.setState({
				left: true
			}, () => {
				setTimeout(() => {
					this.setState({
						hideLeft: true
					})
				}, 250)
			})
		} else if (e.target.scrollLeft !== 0) {
			this.setState({
				hideLeft: false
			}, () => {
				this.setState({
					left: false
				})
			})
		}
	}

	scrollLeft() {
		this.wrapper.current.scrollBy({
			left: -179
		})
	}

	scrollRight() {
		this.wrapper.current.scrollBy({
			left: 178
		})
	}

	render() {
		return (
			<Container>
				<div>
					<Arrow className='left' left={this.props.left} hideLeft={this.props.hideLeft} onClick={this.scrollLeft}>
						<div />
					</Arrow>
					<SlideWrapper count={this.props.mediums?this.props.mediums.length:0} onScroll={this.scrollListener} ref={this.wrapper} onScrollCapture={this.scrollListener}>
						{
							this.props.mediums ? this.props.mediums.map(item => <SliderItem key={item.key} data={item} />) : <div>Nothing</div>
						}
					</SlideWrapper>
					<Arrow className='right' onClick={this.scrollRight}>
						<div />
					</Arrow>
				</div>
			</Container>
		)
	}
}
