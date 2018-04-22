

const initialState = {
  schema: {}
}

export default function schema (state = initialState, action) {
  switch (action.type) {
    case 'LOAD_SCHEMA': 
      return {
        ...state,
        schema: {
          appSchema: action.appSchema,
          rootView: action.rootView
        }
      }
    default :
      return state
    }
}
