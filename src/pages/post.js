import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import SEO from '../components/SEO'
import PostMeta from '../components/PostMeta'
import { rhythm, scale } from '../utils/typography'

const GITHUB_USERNAME = 'manugill'
const GITHUB_REPO_NAME = 'manuis.in'

class PostTemplate extends React.Component {
  render() {
    const { data } = this.props
    const post = data.markdownRemark
    const { title, description } = data.site.siteMetadata
    const { previous, next, slug = '' } = this.props.pageContext
    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/src/posts/${slug.replace(
      /\//g,
      ''
    )}.md`

    return (
      <React.Fragment>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.spoiler}
          slug={post.fields.slug}
        />
        <h1 style={{ marginTop: rhythm(1.25), marginBottom: rhythm(0.175) }}>
          {post.frontmatter.title}
        </h1>
        <PostMeta {...post} />

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <p
          style={{
            textAlign: 'right',
            marginTop: rhythm(2.75),
            marginBottom: rhythm(0.25),
          }}
        >
          <a
            style={{ opacity: 0.5, fontSize: 12 }}
            href={editUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Edit on GitHub
          </a>
        </p>

        <hr
          style={{
            marginTop: 0,
            marginBottom: rhythm(1.25),
            width: `100vw`,
            marginLeft: `calc(-50vw + 50%)`,
          }}
        />

        <h3
          style={{
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          <Link to={'/'} style={{ color: 'inherit' }}>
            {title}
          </Link>
        </h3>
        <p
          style={{
            margin: 0,
            opacity: 0.75,
            ...scale(0.1),
            marginBottom: rhythm(0.5),
          }}
        >
          {description}
        </p>
        <Bio />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
            marginBottom: `calc(-1.75rem / 2)`,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </React.Fragment>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String) {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        spoiler
      }
      fields {
        slug
      }
    }
  }
`
