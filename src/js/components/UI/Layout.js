import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Container } from "reactstrap";
import Nav from "./Nav";

const MainDiv = styled.div.attrs((props) => ({ className: props.classlist }))`
  background: #ccc;
  line-height: 1em;
`;
const Global = createGlobalStyle`
html{
box-sizing:border-box;
background:#fff;
font-size:16px;
}
body{
    width:100%;    
    background:#ccc;
    padding:1rem;
    margin:1rem auto;
    border:1px solid red;
    font-size:1rem;
    line-height:1em;
    font-family:raleway,helvetica;
}
.plot{

width:100%;
z-index:110;
padding:.75rem;
height:auto;
display:flex;
justify-content:center;
align-items:center;
background:#ddd;
}
.purple{
  font-size:2rem;
  transition:all .25s linear;
  text-align:center;
}

svg{

position:relative;
}
circle{
  opacity:1;
}
circle:hover{
  mouse:pointer;
  opacity:1;
  z-index:10;
  pointer-events:none;
  fill:red;
}
@media (max-width:480px){
  .plot{
background:#ddd;
margin:0;

z-index:100;
height:auto;
display:flex;

justify-content:center;
align-items:center;
}

.nav-item{
  padding:0;
  margin:0;
}
}
`;

export default function Layout({ children }) {
  return (
    <Container>
      <Nav />
      <Global />
      {children}
    </Container>
  );
}
