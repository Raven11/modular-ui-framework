export function setDataSource(component,jsonResult){
    console.log(jsonResult);
    return {
        type:'UPDATE_LIST_DATASOURCE',
        jsonResult: jsonResult
    }
}