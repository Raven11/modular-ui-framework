const schema = {

"layouts":{
  "layout1":{
    "component":"GenericComponent",
    "id":"comp1",
    "style":{
      "flex":1,
      "flexDirection":"column",
      "backgroundColor": "#F5FCFF",
    },
   "title":"Home",
   "children":[
     {
       "component":"TextView",
       "id":"t1",
       "binding":"This is a home screen. You will soon be able to scroll up and down",
       "styleClass":{
         "text":"descText"
       }
     },
     {
       "id":"b1",
       "component":"Button",
       "style":{
         "outerContainer":{
         "height":50,
       }
       },
       "children":[
         {
        "id":"tv_button",
        "component":"TextView",
         "binding":"Checkout Items",
         "styleClass":{
           "text":"button"
         }
       }
       ],
       "meta":{
         "onClickModule":{
            "moduleName":"pushNewPage",
            "args":["navigation@layout2",]
          }
       }
     },

   ]
    },
    "layout2":{
      "id":"gc2",
      "component":"GenericComponent",
      "style":{
        "flex":1,
        "flexDirection":"column",
        "backgroundColor": "#F5FCFF",
      },
      "title": "Order Summary",
     "children":[

       {
         "id":"t2",
         "component":"TextView",
         "binding":"You will be able to see your order summary soon. For now, enjoy your Cappuchino",
         "styleClass":{
             "text":"descText"
         }
       },
       {
         "id":"b2",
         "component":"Button",
         "style":{
           "outerContainer":{
           "height":50,
         }
         },
         "children":[
           {
             "id":"tb2",
          "component":"TextView",
           "binding":"Confirm order",
           styleClass:{
             "text":"button"
           }
         }
         ],
         "meta":{
           "onClickModule":{
              "moduleName":"pushNewPage",
              "args":["navigation@layout3",]
            }
         }
       },


     ]
      },
      "layout3":{
        "id":"gc3",
        "component":"GenericComponent",
        "style":{
          "flex":1,
          "flexDirection":"column",
          "backgroundColor": "#F5FCFF",
        },
        "title":"Payment Details",
       "children":[
         {
           "id":"t3",
           "component":"TextView",
           "binding":"You should be able to select your payment modes pretty soon :)",

           "styleClass":{
               "text":"descText"
           }
         },
         {
           "id":"b3",
           "component":"Button",
           "style":{
             "outerContainer":{
             "height":50,
           }
           },
           "children":[
             {
             "id":"tb3",
             "component":"TextView",
             "binding":"Checkout Items",
             "styleClass":{
               "text":"button"
             }
           }
           ],
           "meta":{
             "onClickModule":{
                "moduleName":"pushNewPage",
                "args":["navigation@layout4",]
              }
           }
         },


       ]
        },
        "layout4":{
          "id":"gc4",
          "component":"GenericComponent",
          "style":{
            "flex":1,
            "flexDirection":"column",
            "backgroundColor": "#F5FCFF",
          },
          "title":"Order Status",
         "children":[
           {
             "id":"i1",
             "component":"ImageView",
             "source":{
               "uri": "https://qph.ec.quoracdn.net/main-qimg-bb58a35b237dc66550b21db8b4f572fb-c?convert_to_webp=true"
             },
             "style":{
               "height":200,
               "resizeMode":"cover",
             }
           },
           {
             "id":"t4",
             "component":"TextView",
             "binding":"Order is on the way!",

             "styleClass":{
                 "text":"statusText"
             }
           },
           {
             "id":"b4",
             "component":"Button",
             "style":{
               "outerContainer":{
               "height":50,
             }
             },
             "children":[
               {
               "id":"tb4",
               "component":"TextView",
               "binding":"Done!",
               "styleClass":{
                 "text":"button"
               }
             }
             ],
             "meta":{
               "onClickModule":{
                  "moduleName":"popToPageWithNewLayout",
                  "args":["navigation@layout1","navigation@layout5"],
                }
             }
           },



         ]
          },
          "layout5":{
            "component":"GenericComponent",
            "id":"comp1",
            "style":{
              "flex":1,
              "flexDirection":"column",
              "backgroundColor": "#F5FCFF",
            },
           "title":"Home",
           "children":[
             {
               "component":"TextView",
               "id":"t1",
               "binding":"You have just confimed your offer. Thanks!",
               "styleClass":{
                 "text":"descText"
               }
             },
             {
               "id":"b1",
               "component":"Button",
               "style":{
                 "outerContainer":{
                 "height":50,
               }
               },
               "children":[
                 {
                "id":"tv_button",
                "component":"TextView",
                 "binding":"Checkout Items",
                 "styleClass":{
                   "text":"button"
                 }
               }
               ],
               "meta":{
                 "onClickModule":{
                    "moduleName":"pushNewPage",
                    "args":["navigation@layout2",]
                  }
               }
             },

           ]
            },



},
"schemaConfig":{
  "prefix":"navigation",
}
}



// {
//   "component":"TextView",
//   "text":"Little Text",
//   "style":{
//     textAlign:'center',
//     height:20,
//     fontSize:30
//   },
//   "styleClass":"boldText"
// },
// {
//   "component":"TextView",
//   "text":"Residence of the Mughal emperors for nearly 200 years, until 1857, built by Shah Jahan. On Independence Day (15 August), the Prime Minister hoists the national  ag and delivers a speech from its ramparts.",
//   "style":{
//     fontSize:10,
//     marginLeft:20,
//     marginRight:10
//   },
//   "styleClass":"boldText",
// }
export default schema;
