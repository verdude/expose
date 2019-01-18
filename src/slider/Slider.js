import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const IMG_WIDTH = 300
const IMG_HEIGHT = 300
const IMG_MARGIN = 5

const Selection = styled.div`
    width: ${(IMG_WIDTH+IMG_MARGIN*2)*4}px;
    margin-right: auto;
    margin-left: auto;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
`

const ImgContainer = styled.div`
    display: inline-block;
    position: relative;
    height: ${IMG_HEIGHT}px;
    width: ${IMG_WIDTH}px;
    padding: 0px;
    overflow: hidden;
    margin: ${IMG_MARGIN}px;
`

const SquareImg = styled.img`
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
`

const SliderContainer = styled.div`
    display: flex;
    flex-flow: row no wrap;
    align-items: center;
`

const Arrow = styled.a`
    display: inline-block;
    margin: 5px;
    border-top: 40px solid transparent;
    border-bottom: 40px solid transparent;
    width: 0;
    height: 0;
    opacity: 0.4;
    cursor: pointer;
    transition: 0.25s ease opacity;
    -webkit-transition: 0.25s ease opacity;
    -moz-transition: 0.25s ease opacity;
    -o-transition: 0.25s ease opacity;
    -ms-transition: 0.25s ease opacity;

    :hover {
        opacity: 1;
    }

    ${props => props.right ? css`
        right: 20px;
        border-left: 30px solid palevioletred;
    ` : css`
        left: 20px;
        border-right: 30px solid palevioletred;
    `}
`

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediums: [],
            transitioning: false
        };
    }

    shift(id, right){
        if (this.state.transitioning) { return; }
        else { this.setState({ transitioning: true }); }
        var neg = right ? 1 : -1;
        var els = document.querySelectorAll(id);
        var pos = 0;
        const ppf = 2;
        var m = Array.apply(null, this.state.mediums);
        if (right) {
            m.unshift(m.pop());
            m = m.map((el) => {
                el.left = '-'+(IMG_WIDTH+IMG_MARGIN*2)+'px';
                return el;
            });
            this.setState({ mediums: m });
        }
        var that = this;
        var interval = setInterval(frame, 5);

        function frame() {
            if (pos >= Math.abs(IMG_WIDTH+IMG_MARGIN*2)) {
                clearInterval(interval);
                m = Array.apply(null, that.state.mediums);
                if (!right) {
                    m.push(m.shift());
                }
                that.setState({ mediums: m });
                [].forEach.call(els, function(el) {
                    // The boys must snap back to reality
                    el.style.left = '0px';
                });
                that.setState({ transitioning: false });
            } else {
                pos+=ppf;
                [].forEach.call(els, ((elem) => {
                    let n = Number(elem.style.left.slice(0, -2)) || 0;
                    elem.style.left = (n+(ppf*neg)) + "px";
                }))
            }
        }
    }

    arrToHex(n) {
        const hexies = ['A', 'B', 'C', 'D', 'E', 'F'],
            byte = n & 0xff, lob = 0xf, hob = 0xf0
        let first = (hob & byte) >> 4
        first = first > 9 ? hexies[first % 10] : first+''
        let second = lob & byte
        second = second > 9 ? hexies[second % 10] : second+''
        return first + second
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

    render() {
        return (
            <SliderContainer>
                    <Arrow onClick={this.shift.bind(this, '.img', false)} />
                    <Selection>
                        {this.state.mediums.map((m) => {
                            return (
                                <ImgContainer style={{left: m.left}} className='img' key={m.key} >
                                    <SquareImg src={m.img} />
                                </ImgContainer>
                            )
                        })}
                    </Selection>
                    <Arrow right={true} onClick={this.shift.bind(this, '.img', true)} />
            </SliderContainer>
        )
    }
}

export default Slider;
