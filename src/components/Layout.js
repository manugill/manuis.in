import React from 'react'
import { Link } from 'gatsby'

import Heart from '../components/Heart'
import { rhythm, scale } from '../utils/typography'

const w = typeof window === 'undefined' ? {} : window
const { host = 'manuis.in' } = w

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    const header =
      location.pathname === rootPath ? (
        <div
          style={{
            marginTop: 400,
            marginBottom: rhythm(1.25),
            // textAlign: 'center',
          }}
        >
          <Heart />
          <h1
            style={{
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p style={{ margin: 0, opacity: 0.75, ...scale(0.1) }}>
            Blog by Manu Gill — {host}
          </p>
        </div>
      ) : (
        <h3
          style={{
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          <Link to={'/'}>{title}</Link>
        </h3>
      )

    return (
      <React.Fragment>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(0.75)}`,
          }}
        >
          <header>{header}</header>
          {children}
        </div>
      </React.Fragment>
    )
  }
}

export default Layout
