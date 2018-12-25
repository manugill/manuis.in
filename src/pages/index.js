import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Bio from '../components/Bio'
import SEO from '../components/SEO'
import PostMeta from '../components/PostMeta'
import Footer from '../components/Footer'
import { rhythm, shadowUnderline } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges

    return (
      <React.Fragment>
        <SEO />
        <Bio />
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(0),
                }}
              >
                <Link
                  to={node.fields.slug}
                  style={shadowUnderline}
                >
                  {title}
                </Link>
              </h3>
              <PostMeta {...node} style={{ marginBottom: rhythm(0.25) }} />
              <p
                dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }}
              />
            </div>
          )
        })}
        <Footer />
      </React.Fragment>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "DD MMMM YYYY")
            title
            spoiler
          }
        }
      }
    }
  }
`
