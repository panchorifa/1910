import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

export const reducer = (state = {
    app: null,
    section: -1,
    lang: 'en',
    langs: [],
    loadingApp: false,
    loadingQuote: false,
    quote: null,
  }, action) => {
  switch (action.type) {
    case 'SET_LOADING_APP': return { ...state,
        loadingApp: true }
    case 'SET_APP': return { ...state,
        app: action.app,
        loadingApp: false,
        langs: action.app.langs }

    case 'SET_SECTION': return { ...state,
        section: action.section }
    case 'SET_LANG': return { ...state,
        lang: action.lang }

    case 'SET_LOADING_QUOTE': return { ...state,
        loadingQuote: true }
    case 'SET_QUOTE': return { ...state,
        quote: action.quote }

    default: return state
  }
}

export const initStore = (reducer, initialState, isServer) => {
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
}

export const store = initStore(reducer)
