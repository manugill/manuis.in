import React from 'react'

const config = {
  traceK: 0.4,
  timeDelta: 0.01,
}

const heartPosition = rad => {
  //return [Math.sin(rad), Math.cos(rad)];
  return [
    Math.pow(Math.sin(rad), 3),
    -(
      15 * Math.cos(rad) -
      5 * Math.cos(2 * rad) -
      2 * Math.cos(3 * rad) -
      Math.cos(4 * rad)
    ),
  ]
}
const scaleAndTranslate = (pos, sx, sy, dx, dy) => [
  dx + pos[0] * sx,
  dy + pos[1] * sy,
]

const rand = Math.random

class Graphic extends React.Component {
  pointsOrigin = []
  e = []
  heartPointsCount = () => this.pointsOrigin.length

  constructor(props) {
    super(props)
    this.paint = this.paint.bind(this)
  }

  componentDidMount() {
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      (navigator.userAgent || navigator.vendor || window.opera).toLowerCase()
    )
    var koef = isMobile ? 0.5 : 1
    var canvas = this.refs.canvas
    var ctx = canvas.getContext('2d')
    this.width = canvas.width = koef * innerWidth
    this.height = canvas.height = koef * innerHeight

    // TODO: Remove this listener on unmount
    window.addEventListener('resize', () => {
      this.width = canvas.width = koef * innerWidth
      this.height = canvas.height = koef * innerHeight
    })

    var traceCount = isMobile ? 20 : 50
    var dr = isMobile ? 0.3 : 0.1
    for (let i = 0; i < Math.PI * 2; i += dr)
      this.pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0))
    for (let i = 0; i < Math.PI * 2; i += dr)
      this.pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0))
    for (let i = 0; i < Math.PI * 2; i += dr)
      this.pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0))

    for (let i = 0; i < this.heartPointsCount(); i++) {
      var x = rand() * this.width
      var y = rand() * this.height
      this.e[i] = {
        vx: 0,
        vy: 0,
        R: 2,
        speed: rand() + 5,
        q: ~~(rand() * this.heartPointsCount()),
        D: 2 * (i % 2) - 1,
        force: 0.2 * rand() + 0.7,
        f:
          'hsla(0,' +
          ~~(40 * rand() + 60) +
          '%,' +
          ~~(60 * rand() + 20) +
          '%,.3)',
        trace: [],
      }
      for (let k = 0; k < traceCount; k++) this.e[i].trace[k] = { x: x, y: y }
    }
  }

  componentDidUpdate() {
    this.paint()
  }

  paint() {
    const { pointsOrigin, e } = this
    var canvas = this.refs.canvas
    var ctx = canvas.getContext('2d')

    const { n } = this.props

    var targetPoints = []
    var pulse = (kx, ky) => {
      for (let i = 0; i < pointsOrigin.length; i++) {
        targetPoints[i] = []

        // positioning
        targetPoints[i][0] = kx * pointsOrigin[i][0] + this.width / 2
        targetPoints[i][1] = ky * pointsOrigin[i][1] + 250

        // centered
        // targetPoints[i][0] = kx * pointsOrigin[i][0] + this.width / 2
        // targetPoints[i][1] = ky * pointsOrigin[i][1] + this.height / 2
      }
    }

    pulse((1 + n) * 0.5, (1 + n) * 0.5)

    ctx.fillStyle = 'rgba(255,255,255,.1)' // background color
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
    // ctx.fillStyle = "rgba(255,255,255,1)";
    // for (i = u.trace.length; i--;) ctx.fillRect(targetPoints[i][0], targetPoints[i][1], 2, 2);
  }

  render() {
    return (
      <canvas
        ref="canvas"
        style={{
          position: 'absolute',
          zIndex: -1,
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          // transform: `scale(0.5)`,
          // transformOrigin: '50% 0',
        }}
      />
    )
  }
}

class Heart extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { time: 0 }
  }

  componentDidMount() {
    console.log('hello');
    requestAnimationFrame(this.nextFrame)
  }

  nextFrame = () => {
    this.setState({ time: this.newTime() })
    requestAnimationFrame(this.nextFrame)
  }

  n = () => -Math.cos(this.state.time)

  newTime = (time = this.state.time, n = this.n()) =>
    time + (Math.sin(time) < 0 ? 9 : n > 0.8 ? 0.2 : 1) * config.timeDelta

  render() {
    return <Graphic time={this.state.time} n={this.n()} />
  }
}

export default Heart
