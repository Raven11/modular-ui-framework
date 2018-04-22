

const initialState = {
  context: {}
}

export default function schema (state = initialState, action) {
  switch (action.type) {
    case 'LOAD_CONTEXT': 
      return {
        ...state,
        context: action.context
        
      }
    default :
      return state
    }
}
