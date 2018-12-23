import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => ({
  html: {
    boxSizing: 'border-box',
  },
  body: {
    overflowX: 'hidden',
  },
  'html, body': {
    fontFamily: `-apple-system-body, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
  'h1, h2, h3, h4, h5, h6': {
    fontFamily: `-apple-system-headline, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    fontWeight: 700,
  },
  h2: { lineHeight: 1.15 },
  h3: { lineHeight: 1.25 },
  h4: { lineHeight: 1.35 },
  h5: { lineHeight: 1.45 },
  h6: { lineHeight: 1.45 },
  p: {
    lineHeight: 1.75,
  },
  a: {
    // color: `hsla(0, 60%, 60%, 1)`,
    color: `rgba(225, 50, 50, 1)`,
    boxShadow: 'none',
  },
  hr: {
    position: 'relative',
    height: '2px',
    // width: `calc(50vw + 50%)`,
    // width: `100vw`,
    // marginLeft: `calc(-50vw + 50%)`,
    background: `#000`,
    opacity: 0.1,
    margin: `2rem 0`,
    // transform: 'rotate(-0.5deg)',
  }
  // 'a.gatsby-resp-image-link': {
  //   boxShadow: 'none',
  // },
  // 'p code': {
  //   fontSize: '1.1rem',
  // },
})

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography

export const rhythm = typography.rhythm
export const scale = typography.scale
