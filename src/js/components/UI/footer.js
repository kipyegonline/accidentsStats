import React from "react";
import styled from "styled-components";
const FooterTag = styled.footer`
  padding: 0.25rem;

  margin: 0.5rem 0 0;
  background: #000;
  width: 100%;
  color: gray;
`;
const Footer = () => (
  <FooterTag>
    <p
      className="text-center my-2 "
      style={{ fontSize: "1.3rem", lineHeight: "1.6em" }}
    >
      All rights reserved. {new Date().getFullYear()}
    </p>
  </FooterTag>
);
export default Footer;
