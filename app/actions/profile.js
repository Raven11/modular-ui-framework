export function loadingChanged(isLoading) {
    return {
        type: "IS_LOADING",
        isLoading
    }
}

export function showSuccessNotification(message) {
    return {
        type: 'SHOW_NOTIFICATION',
        notification_type: 'SUCCESS',
        message
    }
}

export function showErrorNotification(message) {
    return {
        type: 'SHOW_NOTIFICATION',
        notification_type: 'ERROR',
        message
    }
}

export function hideNotification() {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}

export function setProfile(jsonResult) {
    return {
        type: "SET_PROFILE",
        profile: jsonResult
    };
}

export function getUserProfile(userId) {
    return (dispatch) => {
        return fetch(
            // 'http://localhost:3000/profile',
            'https://test-lapp-api.fourthlion.in/ccd-api/v1/public/customers/929699337638',
            {
                method: 'GET',
                headers: {
                'From': 'sreemanth',
                'Authorization': 'dHZnYlBodzZ5Vg=='
                }
            })
            .then((response) => { return response.json() } )
            .then((responseJson) => { 
                dispatch(setProfile(responseJson)) 
                // return responseJson
            }
            )
            .catch((error) => {
                console.error(error)
            });
    }
  // return (dispatch) => {
    // let url = 'https://test-lapp-api.fourthlion.in/ccd-api/v1/customer/'+userId;
  //   let url = 'https://test-lapp-api.fourthlion.in/ccd-api/v1/customer/929602190758';
  //   dispatch(loadingChanged(true));
  //   $.get(url, function(data) {
  //       dispatch(setProfile(data));
  //       dispatch(loadingChanged(false));
  //   });
  // }

  //   dispatch(requestProfile(userId))
  //
  //   return fetch('')
  //   .then(response => response.json())
  //   .then(json =>
  //     dispatch(receiveProfile(userId, json))
  //   )
  // }

}
