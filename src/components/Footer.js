import React from 'react'

import { rhythm } from '../utils/typography'

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(2.5),
        }}
      >
        <div style={{ float: 'right' }}>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
          >rss</a>
        </div>
        <a
          href="https://github.com/manugill"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
      </footer>
    )
  }
}

export default Footer
