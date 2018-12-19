import React from 'react'
import Layout from '../components/Layout'

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <h1>What the 404.</h1>
        <p>This page doesn't exist or has been removed.</p>
        <iframe
          width="560"
          height="315"
          src="https://youtu.be/p5GB7eXW8Lw?t=12"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullscreen
        />
        <p>It's probably my fault. So, here's some kpop for you.</p>
      </Layout>
    )
  }
}

export default NotFoundPage
