import React from 'react'

const config = {
  traceK: 0.4,
  timeDelta: 0.001,
}

const heartPos = rad => [
  Math.pow(Math.sin(rad), 3),
  -(
    15 * Math.cos(rad) -
    5 * Math.cos(2 * rad) -
    2 * Math.cos(3 * rad) -
    Math.cos(4 * rad)
  ),
]
// [Math.sin(rad), Math.cos(rad)] // for a sphere

const scaleModifier = 1
const scaleAndTranslate = (pos, sx, sy, dx, dy) => [
  dx + pos[0] * sx * scaleModifier,
  dy + pos[1] * sy * scaleModifier,
]

const rand = Math.random

class Graphic extends React.Component {
  state = { animate: true }
  pointsOrigin = []
  e = []
  width = 0
  height = 0

  heartPointsCount = () => this.pointsOrigin.length

  updateDimensions = (force = false) => {
    const { canvas } = this.refs
    if (canvas) {
      const { width, height } = canvas.getBoundingClientRect()
      const koef = 1.25
      const newWidth = koef * width
      const newHeight = koef * height

      if (force || newWidth !== this.width) {
        this.width = canvas.width = newWidth
        this.height = canvas.height = newHeight
      }
    }
  }

  // updateScroll = () => {
  //   const animate = window.scrollY < 450
  //   const refreshSize = !this.state.animate && animate
  //   this.setState({ animate }, () => refreshSize && this.updateDimensions(true))
  // }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
    // window.addEventListener('scroll', this.updateScroll)
  }

  async componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
    // window.addEventListener('scroll', this.updateScroll)

    const iOS =
      !!navigator.platform && /iPade|iPhone|iPod/.test(navigator.platform)
    const traceCount = iOS ? 10 : 30
    const dr = 0.05

    // I don't understand why PI * 2 is being used here.
    for (let i = 0; i < Math.PI * 2; i += dr)
      this.pointsOrigin.push(scaleAndTranslate(heartPos(i), 90, 5, 0, 0))
    for (let i = 0; i < Math.PI * 2; i += dr)
      this.pointsOrigin.push(scaleAndTranslate(heartPos(i), 150, 9, 0, 0))
    for (let i = 0; i < Math.PI * 2; i += dr)
      this.pointsOrigin.push(scaleAndTranslate(heartPos(i), 210, 13, 0, 0))

    for (let i = 0; i < this.heartPointsCount(); i++) {
      var x = rand() * this.width
      var y = rand() * this.height
      this.e[i] = {
        vx: 0,
        vy: 0,
        R: 2,
        speed: rand() + 3,
        q: ~~(rand() * this.heartPointsCount()),
        D: 2 * (i % 2) - 1,
        force: 0.2 * rand() + 0.5,
        f: `hsla(0, ${~~(40 * rand() + 60)}%, ${~~(60 * rand() + 20)}%, .4)`,
        trace: [],
      }
      for (let k = 0; k < traceCount; k++) this.e[i].trace[k] = { x: x, y: y }
    }
  }

  componentDidUpdate = () => {
    const { pointsOrigin, e, refs, props, state } = this
    const { time, n } = props
    const { animate } = state

    if (!animate && time > 100) return

    let targetPoints = []
    const ctx = refs.canvas.getContext('2d')

    // pulse
    // const kx = (1 + n) * 0.5
    // const ky = (1 + n) * 0.5
    const kx = 1 + n
    const ky = 1 + n

    for (let i = 0; i < pointsOrigin.length; i++) {
      targetPoints[i] = []

      // heart center position
      targetPoints[i][0] = kx * pointsOrigin[i][0] + this.width / 2 // centered
      // targetPoints[i][1] = ky * pointsOrigin[i][1] + this.height / 2 // centered
      targetPoints[i][1] = ky * pointsOrigin[i][1] + 250
    }

    ctx.fillStyle = `rgba(255,255,255,.05)` // background color
    ctx.fillRect(0, 0, this.width, this.height)

    for (let i = e.length; i--; ) {
      var u = e[i]
      var q = targetPoints[u.q]
      var dx = u.trace[0].x - q[0]
      var dy = u.trace[0].y - q[1]
      var length = Math.sqrt(dx * dx + dy * dy)
      if (10 > length) {
        if (0.95 < rand()) {
          u.q = ~~(rand() * this.heartPointsCount())
        } else {
          if (0.99 < rand()) {
            u.D *= -1
          }
          u.q += u.D
          u.q %= this.heartPointsCount()
          if (0 > u.q) {
            u.q += this.heartPointsCount()
          }
        }
      }
      u.vx += (-dx / length) * u.speed
      u.vy += (-dy / length) * u.speed
      u.trace[0].x += u.vx
      u.trace[0].y += u.vy
      u.vx *= u.force
      u.vy *= u.force
      for (let k = 0; k < u.trace.length - 1; ) {
        var T = u.trace[k]
        var N = u.trace[++k]
        N.x -= config.traceK * (N.x - T.x)
        N.y -= config.traceK * (N.y - T.y)
      }
      ctx.fillStyle = u.f
      for (let k = 0; k < u.trace.length; k++) {
        ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1)
      }
    }

    // shape tracer
    // ctx.fillStyle = 'rgba(0,0,0,1)'
    // for (let i = u.trace.length; i--; )
    //   ctx.fillRect(targetPoints[i][0], targetPoints[i][1], 4, 4)
  }

  render() {
    return (
      <canvas
        ref="canvas"
        style={{
          zIndex: -1,
          maxWidth: '100%',
          width: 630,
          height: 440,
          display: this.state.animate ? 'block' : 'none',
        }}
      />
    )
  }
}

class Heart extends React.PureComponent {
  state = { time: 0 }
  animationHandle = undefined

  componentDidMount = () => this.nextFrame()
  componentWillUnmount = () => cancelAnimationFrame(this.animationHandle)

  nextFrame = () => {
    this.setState({ time: this.newTime() })
    this.animationHandle = requestAnimationFrame(this.nextFrame)
  }

  // I don't understand any of this complex math.
  // But it just adds randomness to the value of n which is used for the pulse.
  // negative cos of time just makes the heart super tiny for certain values of time.
  // newTime = (time = this.state.time, n = this.n()) =>
  //   time + (Math.sin(time) < 0 ? 1 : n < 0.8 ? 0.5 : 1) * 0.5
  // n = () => (-Math.cos(this.state.time) * .2) * -.1

  // But I don't really want that.
  newTime = () => this.state.time + 1
  n = () => 0

  render = () => {
    return <Graphic time={this.state.time} n={this.n()} />
  }
}

export default Heart