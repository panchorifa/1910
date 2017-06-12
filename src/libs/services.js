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
      'Accept': 'application/json',
      'Content-Type': 'application/json',
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
  console.log(email)
  const url = store.getState().app.links.subscribers
  post(url, {email: email, app: '1910'})
}

// function validEmail(email) {
//   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(email)
// }
