import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const IMG_HEIGHT = 300

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

export default { ImgContainer, SquareImg }