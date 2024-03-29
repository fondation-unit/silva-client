import { css } from '@emotion/react'

export const API_URL = 'http://localhost:4000'
export const CLIENT_TOKEN_NAME = "silva_client_token"

export const theme = {
  colors: {
    primary: '#f25d27',
    secondary: '#5d2c20'
  },
  main: {
    paddingX: '40px',
    paddingY: '80px'
  },
  navbar: {
    paddingX: '20px',
  },
  navlink: {
    paddingY: '10px',
    paddingX: '5px',
    activeHeight: '3px'
  },
  table: {
    cellPadding: '10px'
  }
}

export const reset = css`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`

export const body = css`
  body {
    font-family: Arial,Helvetica,sans-serif,sans-serif;
    letter-spacing: normal;
    word-spacing: normal;
  }

  #root {
    width: 100%;
    height: 100vh;
  }
`

export const relative = css`position: relative;`

export const main = ({ withPadding }: any) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1040px;
  margin-left: auto;
  margin-right: auto;
  ${withPadding === true &&
  `
    padding: ${theme.main.paddingY} 0;
  `}
`

export const button = css`
  background-color: ${theme.colors.primary};
  color: white;
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
`

export const buttonLink = css`
  background-color: transparent;
  color: ${theme.colors.primary};
  padding: 0;
  border: none;
`

export const dropdown = css`
  position: absolute;
  right: 0;
  border: 0;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 10px;
  background-color: white;
`

export const dropdownList = css`
  display: flex;
  flex-direction: column !important;
  list-style: none;
  padding-right: 0 !important;
  li {
    padding: 0;
    width: 100%;
    
    a,
    button {
      padding: ${theme.navlink.paddingX};
      width: 100%;
    }
  }
`

export const resultRow = css`
  display: flex;
  flex-direction: row;
  align-self: flex-start;

  a {
    display: flex;

    div {
      flex-direction: row;
      padding: 5px;
    }
  }
`
