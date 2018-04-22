import DeviceInfo from 'react-native-device-info';

function setContext(context) {
  return {
    type: 'LOAD_CONTEXT',
    context: context
  }    
}
export function loadContext() {
  let context = {
      "Device" : {
        "UniqueID": DeviceInfo.getUniqueID(),
        "Manufacturer": DeviceInfo.getManufacturer(),
        "Brand": DeviceInfo.getBrand(),
        "Model": DeviceInfo.getModel(),
        "ID": DeviceInfo.getDeviceId(),
        "OS": DeviceInfo.getSystemName(),
        "OSVersion": DeviceInfo.getSystemVersion(),
        "Name": DeviceInfo.getDeviceName(),
        "Locale": DeviceInfo.getDeviceLocale(),
        "Country": DeviceInfo.getDeviceCountry(),
        "Timezone": DeviceInfo.getTimezone(),
        "UserAgent": DeviceInfo.getUserAgent()
      },
      "App": {
        "BundleID": DeviceInfo.getBundleId(),
        "BuildNumber": DeviceInfo.getBuildNumber(),
        "Version": DeviceInfo.getVersion(),
        "ReadableVersion": DeviceInfo.getReadableVersion(),
        "InstanceID": DeviceInfo.getInstanceID(),
        "IsEmulator": DeviceInfo.isEmulator(),
        "IsTablet": DeviceInfo.isTablet()
      }              
  }
  console.log("DeviceInfo-Context", context)
  return function (dispatch) {
    dispatch(setContext(context))
  }
}
