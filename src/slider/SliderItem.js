import React from 'react'
import styled, { keyframes } from 'styled-components'

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
	background-color: gray;
	background: url(${props => props.src}) center no-repeat;
	background-size: cover;

	width: 17.8rem;
	height: 10rem;

	margin-bottom: 1rem;
`

const SliderItem = props => {
	const { title, img } = { ...props.data }
	return (
		<Container>
			<Thumbnail src={img} />
			<h4>{title}</h4>
		</Container>
	)
}

export default SliderItem
