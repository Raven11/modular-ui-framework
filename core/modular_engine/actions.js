
class Actions {
    /**
    * Module that makes a GET request
    * @param  {component} component RN component
    * @param  {String}   url       Url for the GET request
    * @param  {Function} callback  Callback to be invoked after success/failure operation
    */
    static makeGETRequest(component,url,headers,callback) {
      console.log(component,url,headers,callback)
      return (dispatch) => {
        return fetch(
            url,
            {
                method: 'GET',
                headers: headers
            })
            .then((response) => { return response.json() } )
            .then((responseJson) => {
                if(callback !== undefined){
                  dispatch(callback(component,responseJson))
                }else{
                  console.log('makeGETRequest noCallback defined');
                }
            }
            )
            .catch((error) => {
                console.error(error)
            });
          }
      }

      static updateState(component,variableName,value){
        let newState = {}
        newState[variableName] = value;
        return {
          type:'UPDATE_STATE',
          newState:newState
        }
      }

}
export default Actions;
