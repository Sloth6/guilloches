var canvas = document.createElement('canvas')
  , ctx = canvas.getContext('2d')
  , gui = new dat.GUI
  , width
  , height


var state = { t: 0 }

document.body.style.background = '#000'
document.body.style.margin = '0'
document.body.style.padding = '0'
document.body.appendChild(canvas)

var options = {
  'selected': 'State A',
  'animate':false,
  'lemniscate': false,
  'duration': 2000,
  'steps': 1000,
  'state_a':{
    'R': 200,
    'r': -0.25,
    'p': 10,
    'lemn_t': 1,
    'f': 45,
    'scale': .7,
    'steps': 1000,
    // 'lem_t': 1.0,
  },
  'state_b':{
    'R': 200,
    'r': -0.25,
    'p': 10,
    'lemn_t': 1,
    'f': 70,
    'scale': .4,
    // 'lem_t': 1.0,
  }
}


var original_options = Object.assign({}, original_options);

url_options = JSON.parse(getParameterByName('options'))
if (url_options) {
  console.log(url_options)
  for (key in url_options) {
    options[key] = url_options[key]
  }
  console.log('Options found in URL')
}

gui.add(options, 'animate').onChange(on_update)

// gui.add(options, 'lemniscate').onChange(on_update)
gui.add(options, 'selected', ['State A', 'State B'] );
gui.add(options, 'steps', 200, 10000).step(10).onChange(on_update)
gui.add(options, 'duration', 200, 5000).step(25).onChange(on_update)

var fa = gui.addFolder('State A')
var fb = gui.addFolder('State B')

fa.add(options.state_a, 'R', 50, 1000).onChange(on_update)
// fa.add(options.state_a, 'r', -1.0, 0.0).onChange(on_update)
fa.add(options.state_a, 'p', 1, 50).onChange(on_update)
fa.add(options.state_a, 'f', 0, 100).onChange(on_update)
fa.add(options.state_a, 'scale', .1, 2).onChange(on_update)

fb.add(options.state_b, 'R', 50, 1000).onChange(on_update)
// fb.add(options.state_b, 'r', -1, 0).onChange(on_update)
fb.add(options.state_b, 'p', 1, 50).onChange(on_update)
fb.add(options.state_b, 'f', 0, 100).onChange(on_update)
fb.add(options.state_b, 'scale', .1, 2).onChange(on_update)

var obj = { reset:function(){
  // window.history.pushState( {} , '/', '/');
  window.location.search = ''
}};
gui.add(obj,'reset');
// gui.add(options, 'lemn_t', -.9, 2).onChange(draw)

function on_update() {
  var query_string = encodeURIComponent(JSON.stringify(options))
  var base = window.location.href.split('?')[0]
  window.history.replaceState( {} , '', base+'?options='+query_string );
  draw()
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function draw() {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, width, height)
  ctx.save()
  ctx.translate(width/2, height/2)
  ctx.strokeStyle = 'black'
  ctx.beginPath()

  if (options.animate) {
    var t = state.t
    var current = {};
    for (var property in options.state_a) {
      current[property] = t*options.state_a[property] + (1-t)*options.state_b[property]
    } 
  } else {
    if (options.selected == 'State A'){
      var current = options.state_a
    } else {
      var current = options.state_b
    }
  }
  
  p = guilloche(0, current, options.lemniscate)
  ctx.moveTo(p.x, p.y)
  for (var j = 1; j < options.steps*1; j++) {
    theta = (2 * Math.PI) * (j / options.steps)
    p = guilloche(theta, current, options.lemniscate)
    ctx.lineTo(p.x, p.y)
  }

  ctx.stroke()
  ctx.restore()
}

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
requestAnimationFrame(animate);

var tween = new TWEEN.Tween(state)
  .to({t:1.0}, options.duration)
  .easing(TWEEN.Easing.Quadratic.InOut)
  .onUpdate(function() { draw() })
  .repeat(Infinity)
  .yoyo( true )
  .start();

function resize() {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  draw()
}
(window.onresize = resize)()

