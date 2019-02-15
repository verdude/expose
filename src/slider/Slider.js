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

	Header = styled.div`
		display: grid;
		grid-template-columns: 18rem auto;
		justify-items: start;
		padding-bottom: 2rem;

		& > p {
			color: #a4a4a4;
		}

		& a {
			color: black;
			text-decoration: none;
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

		height: 10rem;
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

		this.scrollListener = this.scrollListener.bind(this)
		this.scrollLeft = this.scrollLeft.bind(this)
		this.scrollRight = this.scrollRight.bind(this)
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

	gen_hashes(mediums) {
        return mediums.map((m, i) => {
            m.key = i;
            return m;
        });
    }
	
	async componentDidMount() {
        let mediums = [
            {
                "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb",
                "title": "Sketch",
                "left": '0px'
            },
            {
                "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb",
                "title": "Acrylic",
                "left": '0px'
            },
            {
                "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb",
                "title": "Charcoal",
                "left": '0px'
            },
            {
                "img": "https://images.unsplash.com/photo-1546029115-712217181a58",
                "title": "Watercolor",
                "left": '0px'
            },
            {
                "img": "https://images.unsplash.com/photo-1527602433043-7d8923f324eb",
                "title": "Something Else",
                "left": '0px'
            }
        ]
        mediums = await this.gen_hashes(mediums)
        this.setState({mediums: mediums})
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
					<Arrow className='left' left={this.state.left} hideLeft={this.state.hideLeft} onClick={this.scrollLeft}>
						<div />
					</Arrow>
					<SlideWrapper count={this.state.mediums?this.state.mediums.length:0} onScroll={this.scrollListener} ref={this.wrapper} onScrollCapture={this.scrollListener}>
						{/* <SlideWrapper count={count} onScroll={this.scrollListener} onScrollCapture={this.scrollListener}> */}
						{
							this.state.mediums ? this.state.mediums.map(item => <SliderItem key={item.key} data={item} />) : <div>Nothing</div>
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
