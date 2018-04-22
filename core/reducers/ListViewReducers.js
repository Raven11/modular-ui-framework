const initialState = {};

export default function ListViewReducers(state=initialState,action){
    switch(action.type){
        case 'UPDATE_LIST_DATASOURCE':
            return {...state,
                     jsonResult:action.jsonResult,
                     componentState:'ACTIVE',
                    }
            break;
        default:
            return state;
    }

}