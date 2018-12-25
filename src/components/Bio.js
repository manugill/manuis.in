import React from 'react'

import pic from '../assets/me.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          // margin: `0 auto`,
          marginBottom: rhythm(1.25),
          maxWidth: rhythm(12.5),
        }}
      >
        <div
          title="Manu Gill"
          style={{
            background: '#eee',
            backgroundImage: `url(${pic})`,
            backgroundSize: 'cover',
            float: 'left',
            marginRight: rhythm(0.5),
            marginBottom: 0,
            // width: rhythm(1.75),
            // height: rhythm(1.75),
            width: 50,
            height: 50,
            minWidth: 50,
            borderRadius: '100%',
          }}
        />
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          I write about mental health, emotions, culture, society, philosophy
          and code.
        </p>
      </div>
    )
  }
}

export default Bio
