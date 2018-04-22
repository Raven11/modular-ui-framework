const schema = {
  "layouts":{
    "layout1":{
      "id":"gc1",
      "component":"GenericComponent",
      "title":"My Profile",      
      "children":[
        {
          "id":"lv1",
          "component":"ListViewContainer",
          "dataSourceMapping":"stores",
          "dataSource":{stores:[{text1:'row 1',text2:'This is the second test'}]},
          "adapter":{
            "type":"SimpleAdapter",
            "rowDefaultLayout":"layoutListRow",
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
    
  },
  "schemaConfig":{
    "prefix":"listview"
  },
  "routestacks":[{
    "startPage":"layout1",
  },],

}

export default schema;
