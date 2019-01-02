import React from 'react'
import { Link } from 'gatsby'

import Heart from '../components/Heart'
import { rhythm, scale, shadowUnderline } from '../utils/typography'

class Layout extends React.Component {
  render() {
    const {
      path,
      children,
      data = { site: { siteMetadata: {} } },
    } = this.props
    const { title, description } = data.site.siteMetadata

    const pagePath = this.props['*']
    const isHome = path === '/*' && pagePath === ''

    const header = isHome ? (
      <div
        style={{
          marginTop: 405,
          marginBottom: rhythm(1),
          // textAlign: 'center',
        }}
      >
        <Heart />
        <h1
          style={{
            marginTop: 0,
            marginBottom: `0.4rem`,
            lineHeight: 1,
            fontSize: `2.775rem`,
          }}
        >
          {title}
        </h1>
        <p style={{ margin: 0, opacity: 0.75, ...scale(0.1) }}>{description}</p>
      </div>
    ) : (
      <h3
        style={{
          marginTop: 0,
          marginBottom: 0,
          fontSize: rhythm(0.7),
          lineHeight: 1,
        }}
      >
        <Link to={'/'} style={shadowUnderline}>
          {title}
        </Link>
      </h3>
    )

    return (
      <React.Fragment>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: 660,
            padding: `30px 15px`,
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
