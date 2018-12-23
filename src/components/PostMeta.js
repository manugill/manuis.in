import React from 'react'
import { formatReadingTime } from '../utils/helpers'
import { rhythm, scale } from '../utils/typography'

const PostMeta = ({ style = {}, ...post }) => (
  <p
    style={{
      fontSize: 13,
      display: 'block',
      opacity: 0.75,
      ...style,
    }}
  >
    {post.frontmatter.date}
    {` — ${formatReadingTime(post.timeToRead)}`}
  </p>
)

export default PostMeta
