
var instance;
var listeners = {};
class EventsSingleton {

  //TODO: Add support for unique events 
  static getInstance(){
    if(instance === undefined){
      instance = new EventsSingleton();
    }
    return instance;
  }

  dispatchEvent(eventName,args){
    if(listeners.hasOwnProperty(eventName)){
      listeners[eventName].forEach(listener => listener(args));
    }
  }

  subscribeEvent(eventName,listener){
    if(listeners.hasOwnProperty(eventName)){
      listeners[eventName].push(listener);
    }
    else{
      listeners[eventName] = [listener];
    }
  }
}

export default EventsSingleton;
