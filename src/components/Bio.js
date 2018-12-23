import React from 'react'

// Import typefaces
// import 'typeface-montserrat'
// import 'typeface-merriweather'
// import 'typeface-emilys-candy'

import pic from '../assets/me.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          // margin: `0 auto`,
          marginBottom: rhythm(3),
          maxWidth: rhythm(12.5),
        }}
      >
        <img
          src={pic}
          title={`Manu Gill`}
          style={{
            float: 'right',
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '100%',
            background: '#eee',
          }}
        />
        <p style={{
          fontSize: 15,
          lineHeight: 1.6,
          marginTop: 4,
          marginBottom: 0,
        }}>
          I write about mental health, emotions, culture, society, philosophy
          and code.
        </p>
      </div>
    )
  }
}

export default Bio
