import React from 'react'
import Layout from '../components/Layout'

class NotFoundPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>What the 404.</h1>
        <p>This page doesn't exist or has been removed.</p>
        <iframe
          width="100%"
          height="360"
          src="//www.youtube.com/embed/p5GB7eXW8Lw?controls=0"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullscreen
        />
        <p>It's probably my fault. So, here's some kpop for you.</p>
      </React.Fragment>
    )
  }
}

export default NotFoundPage
