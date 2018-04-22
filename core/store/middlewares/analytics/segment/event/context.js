function extractContextFields(getState: Function) {
  // let contextData = {
  //   "app": {
  //     "build": 7,
  //     "name": "CCD",
  //     "namespace": "in.fourthlion.ccd.mobileapp",
  //     "version": "0.52"
  //   },
  //   "device": {
  //     "id": "d1c4468bbaf30c9a",
  //     "manufacturer": "unknown",
  //     "model": "sdk",
  //     "name": "generic",
  //     "type": "android"
  //   },
  //   "library": {
  //     "name": "analytics-android",
  //     "version": "3.4.0"
  //   },
  //   "locale": "en-US",
  //   "network": {
  //     "bluetooth": false,
  //     "carrier": "Android",
  //     "cellular": true,
  //     "wifi": false
  //   },
  //   "os": {
  //     "name": "Android",
  //     "version": "4.1.2"
  //   },
  //   "screen": {
  //     "density": 2,
  //     "height": 1184,
  //     "width": 768
  //   },
  //   "timezone": "GMT",
  //   "traits": {
  //     "anonymousId": "3f050f0b-192e-4dca-856f-1142e7416ac2"
  //   },
  //   "userAgent": "Dalvik/1.6.0 (Linux; U; Android 4.1.2; sdk Build/MASTER)",
  //   "ip": "14.215.176.148"
  // };
  let contextData = getState();
  return contextData.context.context;
}


export {
  extractContextFields,
};