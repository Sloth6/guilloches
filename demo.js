var canvas = document.createElement('canvas')
  , ctx = canvas.getContext('2d')
  , gui = new dat.GUI
  , sliders = []
  , output = []
  , width
  , height


var options = {
  'R': 200
  , 'r': -0.25
  , 'p': 10
  , 'steps': 1000
  , 't': 1
  , 'f': 20
}

gui.add(options, 'R', 50, 1000).onChange(draw)
gui.add(options, 'r', -1, 1).onChange(draw)
gui.add(options, 'p', 1, 50).onChange(draw)
gui.add(options, 'steps', 200, 10000).onChange(draw)
gui.add(options, 't', -.9, 2).onChange(draw)
gui.add(options, 'f', 0, 50).onChange(draw)

document.body.style.background = '#000'
document.body.style.margin = '0'
document.body.style.padding = '0'
document.body.appendChild(canvas)


function draw() {
  var h = options['Size']

  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)
  ctx.save()
  ctx.translate(width/2, height/2)

  // ctx.globalCompositeOperation = 'lighter'
  // ctx.strokeStyle = 'rgba(205,255,215,0.25)'
  ctx.strokeStyle = 'black'
  ctx.beginPath()

  p = guilloche(0, options.R, options.r, options.p, options.t, options.f)
  ctx.moveTo(p.x, p.y)
  for (var j = 1; j < options.steps; j++) {
    theta = (2 * Math.PI) * (j / options.steps)
    p = guilloche(theta, options.R, options.r, options.p, options.t, options.f)
    ctx.lineTo(p.x, p.y)
  }

  ctx.stroke()
  ctx.restore()
}

function resize() {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  draw()
}
(window.onresize = resize)()

// raf(canvas).on('data', function() {
//   if (!options.Undulate) return
//   var now = Date.now ? Date.now() : +new Date

//   for (var i = 0, l = radii.length; i < l; i += 1) {
//     radii[i] += Math.sin((now - i * 5000) * 0.0001 * Math.sin(i / 1.3)) * 0.0025
//     options.Size += Math.sin((now + 5000) * 0.00008) * 0.025
//   }

//   draw()
// })
