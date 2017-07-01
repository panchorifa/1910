import {store} from  '../store'

const APP_URL = 'https://tznldl3pfi.execute-api.us-east-1.amazonaws.com/prod/'

async function load(url) {
  const response = await fetch(url)
  return await response.json()
}

async function post(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json',
    },
    requestContext: {}
  })
  return await response.json()
}

export async function loadQuote() {
  store.dispatch({type: 'SET_LOADING_QUOTE'})
  const s = store.getState()
  const url = `${s.app.links.quote}?lang=${s.lang}`
  store.dispatch({type: 'SET_QUOTE', quote: await load(url)})
}

export async function loadApp() {
  store.dispatch({type: 'SET_LOADING_APP'})
  store.dispatch({type: 'SET_APP', app: await load(APP_URL)})
  loadQuote()
}

Object.resolve = function(path, obj) {
  return path.split('.').reduce(function(prev, curr) {
    return prev ? prev[curr] : undefined
  }, obj)
}

export function msg(lang, id) {
  const v = store.getState().app.messages[lang]
  return Object.resolve(id, v)
}

export function subscribe(email) {
  const url = store.getState().app.links.subscribers
  post(url, {email: email, app: "1910"})
}

export function sendIdea(idea) {
  const url = store.getState().app.links.ideas
  post(url, {content: idea, app: "1910"})
}

const devices = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (devices.Android() || devices.BlackBerry() || devices.iOS() || devices.Opera() || devices.Windows());
  }
}

export function isMobile() {
  return devices.any()
}

export function validEmail(email) {
  const re = new RegExp('[^@]+@[^@]+\\.[^@]+')
  return re.test(email)
}
