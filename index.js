var cos = Math.cos
  , sin = Math.sin

function guilloche(theta, scale, R, r, p, t, f) {
  // R *= Math.sqrt(Math.abs(Math.cos(1*theta)) + t)
  // r *= Math.sqrt(Math.abs(Math.cos(1*theta)) + t)

  var x = (R + r)* Math.cos(theta) + (r+p) * Math.cos(((R+r)/r)*theta)*f
  var y = (R + r)* Math.sin(theta) - (r+p) * Math.sin(((R+r)/r)*theta)*f
  x *= scale
  y *= scale
  // y *= .5
  // y *= Math.cos(theta) * r2
  // x *= Math.sin(theta) * r2

  return {x:y, y:x}
}

function hypotrochoid(d, radii, t, output) {
  output = output || []

  var x = 0
    , y = 0
    , i = 0
    , l = radii.length - 1
    , a
    , b

  var cosT = cos(t)
    , sinT = sin(t)

  for (; i < l; i += 1) {
    b = radii[i+1]
    a = radii[i] - b
    x += a * cosT + d * cos(a / b * t)
    y += a * sinT - d * sin(a / b * t)
  }

  output[0] = x
  output[1] = y

  return output
}
