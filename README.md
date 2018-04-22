# modular-ui-framework
<<<<<<< HEAD
Modular UI Framework enables you to generate cross platform apps with a Json configuration
## v0.1

This library builds a React native app from a json configuration. The idea is to componentize the entire app, so it would
be easy build additional features (Eg. dynamic configuration from the server to change look and feel of the app)

## Steps to build
1. Define your configuration in JSON
2. Build the App

## Example
app = {
  "component":"ContactForm",
  "title":"Tell us a little more about yourself",
  "children":[
  {
    "component":"StringField",
    "label":"What's your name?",
    "help":"It's okay, Don't sweat it"
  }
  ]
}


### Contribution
To run the demo
`npm install`
`npm start`

To run tests
`npm install`
`npm test`

### Future Roadmap 
#### Product features
* Back button support for Android
* Multiple routeStacks will be supported 
* Maintainence of state using redux 
* Server calls 
* Network state monitoring
* Better logging support (on/off switch for every module & different logging levels info, debug, warning, critical) 
* Database support to store persistent data (this would be front faced with redux) 

=======
react-native
>>>>>>> d0710e2949f2d3f58c35d408ec8f287e5a9e7007
