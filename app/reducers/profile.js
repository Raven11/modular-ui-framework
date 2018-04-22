
const initialState = {
  profile: {}
}

export default function profile (state = initialState, action) {
  switch (action.type) {
    case 'SET_PROFILE':
      return Object.assign({}, state, {
          profile: action.profile
      });
      // return {
      //   ...state,
      //   customer: {
      //     profile: action.profile
      //   }
      // }
    default :
      return state
    }
}
