import react from 'react'
import styled, { keyframes, css } from 'styled-components'

const shimmer = keyframes`
0% {
	background-position: -30rem 0;
}
100% {
		background-position: 30rem 0;
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

export default Thumbnail