const schema = {
  "layouts":{
    "layout1":{
      "id":"gc1",
      "component":"GenericComponent",
      "title":"Search Stores",    
      "styleClass":{
        "container":"container",
      } , 
      "children":[
        {
          "id":"form1",
          "component":"FormComponentContainer",
          "onFormSubmit":{
             "newState":"LOADING",
            "moduleName":"makeGETRequest",
            "args":["https://test-lapp-api.fourthlion.in/ccd-api/v1/public/customers/929699337638/stores?location=koramangala&longitude=77.6227357&latitude=12.9308465",{
              'From': 'sreemanth',
              'Authorization': 'dHZnYlBodzZ5Vg=='
            }],
            "inlets":{
              "name":"ti1",
              "gender":"rg1",
              "birthDate":"dp1",
              "mobileNumber":"ti2",
              "email":"ti3",
              "foodPreference":"rg2",
              "maritalStatus":"rg3",
              "anniversaryDate":"dp2",
            }
          },
            "children":[{
            "id":"ti1",
            "component":"TextInputView",
            "placeholder":"What are you searching for?",
            "name":"Name",
            "styleClass":{
              "textInput":"textInputStyle"
            },
            "formProps":{
            }
          },
          {
            "id":"b1",
            "component":"Button",
            "signal":"FormSubmit",
              "style":{
                "outerContainer":{
                "marginTop":5,
              }
            },
            "children":[
              {
              "id":"tb1",
              "component":"TextView",
              "binding":"Submit",
              "styleClass":{
                "text":"buttonText"
              },}
              ],
            "meta":{
              "onClickModule":{

            }
          }
        },]
        },
        {
          "id":"lv1",
          "component":"ListViewContainer",
          "dataSourceMapping":"stores",
          "dataSource":{stores:[{text1:'row 1',text2:'This is the second test'}]},
          "adapter":{
            "type":"SimpleAdapter",
            "rowDefaultLayout":"searchScreen@layoutListRow",
            "inlets":{
              "storeName":"llt1",
              "address1":"llt2",
            }
          },
          meta:{
            "onLoad":{
              "moduleName":"makeGETRequest",

              "args":["https://test-lapp-api.fourthlion.in/ccd-api/v1/public/customers/929699337638/stores?location=koramangala&longitude=77.6227357&latitude=12.9308465",{
                'From': 'sreemanth',
                'Authorization': 'dHZnYlBodzZ5Vg=='
             }],
          }
        },
        styleClass:{
          "container":"listContainer",
        }

        },
        
        
      ],
      },
      "layoutListRow":{
          "id":"llg1",
          "component":"GenericComponent",
          "children":[{
            "id":"llt1",
            "component":"TextView",
            "binding":"Hi",
          },{
            "id":"llt2",
            "component":"TextView",
            "binding":"Heya!",
          }]
        },
    },
  "stylesheet":{
    "textStyle":{
      marginLeft:20,
      marginRight:20,
      marginTop:50,
      marginBottom:7,
      fontWeight:"bold",
    },
    "container":{
      margin:10
    },
    "listContainer":{
      margin:5,
    }
    
  },
  "schemaConfig":{
    "prefix":"searchScreen",
  }

}

export default schema;


