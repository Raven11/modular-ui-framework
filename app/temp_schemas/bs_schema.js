const schema = {
  "layouts":{
  "layout1":{
       "id":"gc1",
       "component":"GenericComponent",
       "title":"Cafe Coffee Day",
       "style":{
         "flex":1,
         "flexDirection":"column",
         "backgroundColor": "#F5FCFF",
       },
      "children":[
        {
        "id":"t1",
        "component":"TextView",
        "text":"Upload summary data",
        "styleClass":{
          "text":"titleText"
          },
        },
        {
        "id":"t2",
        "component":"TextView",
        "text":"Select Cafe Type",
        "styleClass":{
          "text":"descriptionText"
        },
        },
        {
          "id":"b1",
          "component":"Button",
          "text":"Hi this is a button",
          "style":{
            "outerContainer":{
            "height":50,
            "marginTop":30,
          }
          },
          "children":[
            {
            "id":"tb1",
            "component":"TextView",
            "text":"Cafe Coffee Day",
            "styleClass":{
              "text":"buttonText"
            },}
          ],
          "meta":{
            "onClickModule":{
                "moduleName":"pushNewPage",
                "args":["layout2"]
              }
          }
        },
        {
          "id":"b3",
          "component":"Button",
          "text":"Hi this is a button",
          "style":{
            "outerContainer":{
            "height":50,
            "marginTop":30,
          }
          },
          "children":[
            {
            "id":"tb3",
            "component":"TextView",
            "text":"CDX",
            "styleClass":{
              "text":"buttonText"
            },}
          ],
          "meta":{
            "onClickModule":{
                "moduleName":"pushNewPage",
                "args":["layout3"]
              }
          }
        },


      ]
},
"layout2":{

        "id":"gc1",
        "component":"BarcodeScan",
        "showStatusBar":false,
        "meta":{
          "onScanBarcodeModule":{
              "moduleName":"barcodeScanning_scanProcess",
              "args":["layout1","http://qrapi.coffeeday.com:8080/eSalesAPI/api/CafeSales/PostCafeSales/",]
            }
        }

},
"layout3":{

        "id":"gc1",
        "component":"BarcodeScan",
        "showStatusBar":false,
        "meta":{
          "onScanBarcodeModule":{
              "moduleName":"barcodeScanning_scanProcess",
              "args":["layout1","http://qrapi.coffeeday.com:8080/eSalesAPI/api/CafeValueExpressSales/PostCafeValueExpressSales",]
            }
        }

}

},
"stylesheet":{
    "redText":{
      "color":"red",
    },
    "boldText":{
      "fontWeight":"bold"
    },
    "buttonText":{
      "fontWeight":"bold",
      "color":"black",
      "fontSize":20
    },
    "titleText":{
      "fontWeight":"bold",
      "color":"red",
      "fontSize":30,
      "marginLeft":10,
    },
    "descriptionText":{
      "fontWeight":"bold",
      "color":"blue",
      "fontSize":25,
      "marginLeft":10,
    }
},
"routestacks":[{
  "startPage":"layout1",
},]

}

export default schema;

// "moduleName":"makePOSTRequest",
// "args":["http://web.coffeeday.com/hrops/api/CafeSales/PostCafeSales/",
//         "S»20160901»20160901»1234»0»10000»100»0»0»0»0»0»0»0»0»0»0»0»0»0»0»0»0»0»0»0»0»0»0»0»0»0»0»0»TESTfromTeam|",],
