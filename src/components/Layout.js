import React from 'react'
import { Link } from 'gatsby'

import Heart from '../components/Heart'
import { rhythm, scale, titleFont } from '../utils/typography'

const { host = 'manuis.in' } = window

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <div style={{
          marginTop: 500,
          marginBottom: rhythm(1.5),
          textAlign: 'center',
        }}>
          <h1
            style={{
              fontWeight: 400,
              ...scale(1.0),
              margin: 0,
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
          </h1>
          <p style={{ margin: 0, opacity: 0.75, ...scale(0.1) }}>Blog by Manu Gill — {host}</p>
        </div>
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
