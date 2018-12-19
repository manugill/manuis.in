import React from 'react'
import { Link } from 'gatsby'

import Heart from '../components/Heart'
import { rhythm, scale, titleFont } from '../utils/typography'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            fontWeight: 400,
            ...scale(1.0),
            marginBottom: rhythm(1.5),
            marginTop: 500,
            textAlign: 'center',
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            {title}
          </Link>
          <small style={{display: 'block', opacity: 0.75, ...scale(0.25)}}>manuis.in</small>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: titleFont,
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: '#ffa7c4',
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <React.Fragment>
        <Heart />
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {header}
          {children}
        </div>
      </React.Fragment>
    )
  }
}

export default Layout
