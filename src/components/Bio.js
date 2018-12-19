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
          margin: `0 auto`,
          marginBottom: rhythm(2.5),
          maxWidth: rhythm(17),
        }}
      >
        <img
          src={pic}
          alt={`Manu Gill`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '100%',
          }}
        />
        <p>
          My name is Manu. I write about mental health, emotions, cultures,
          society, philosophy and code.
        </p>
      </div>
    )
  }
}

export default Bio
