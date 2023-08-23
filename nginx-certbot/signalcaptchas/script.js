function onDataCallback(token) {
  console.log('Successful response')

  // const action = document.location.href.indexOf('challenge') !== -1 ?
  //   'challenge' : 'registration'

  const sitekey = 'c866ff6f-e3f6-4e9c-936e-73d268ec33d5'
  const action = 'registration' // HCaptcha goes with "registration"
  console.log({ sitekey, action, token })

  renderCallback('signal-hcaptcha', sitekey, action, token)
}

function redirect(solution) {
  var targetURL = 'signalcaptcha://' + solution
  var link = document.createElement('a')
  link.href = targetURL
  link.innerText = 'Open Signal'

  document.body.removeAttribute('class')

  setTimeout(function () {
    document.getElementById('container').appendChild(link)
  }, 2000)

  window.location.href = targetURL
}

function renderCallback(scheme, sitekey, action, token) {
  var fullSolution = [scheme, sitekey, action, token].join('.')
  if (fullSolution.length >= 2000 && window.navigator.userAgent && window.navigator.userAgent.toLowerCase().includes("windows")) {
    throw new Error(`solution is too long, but we don't have a fallback for windows yet.`)
    // fetch('/shortener', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'text/plain' },
    //   body: token
    // })
    //   .then(response => {
    //     if (response.status !== 200) {
    //       throw new Error('Shortening request failed with ' + response.status)
    //     }
    //     return response.text()
    //   })
    //   .then(shortCode => redirect([scheme + '-short', sitekey, action, shortCode].join(".")), _error => redirect(fullSolution))
  } else {
    redirect(fullSolution)
  }
}