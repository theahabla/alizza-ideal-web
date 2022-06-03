// i18next-extract-mark-ns-start footer-component
import * as React from "react"
import styled from "styled-components"
import { Trans, useI18next, Link } from "gatsby-plugin-react-i18next"

export const FooterStyles = styled.footer`
  margin-top: 0;
  font-size: var(--footnote);
  font-weight: reset;
  background-color: var(--key-color);
  color: darkorange;
  border-top: 4px solid red;

  a {
    color: white;
    font-size: inherit;
  }
`

const CopyrightStyle = styled.div`
  font-size: 7pt;
  font-weight: 500;
`

export const Footer = () => {
  const { t } = useI18next()

  return (
    <FooterStyles>
      <div className="footer">
        <CopyrightStyle>
          Copyright &copy; 2022, TSUTSUMI Kikuo (
          <a href="https://www.alizza-ideal.com">Alizza Ideal</a>
          ). All rights reserved.
          <Link to="/policy">
            [ <Trans>個人情報保護</Trans> ]
          </Link>
          -
          <Link to="/legal">
            [ <Trans>特定商取引法</Trans> ]
          </Link>
        </CopyrightStyle>
      </div>
    </FooterStyles>
  )
}