const schema = {
  "layouts":{
    "layout1":{
      "id":"gc1",
      "component":"FormComponentContainer",
      "title":"My Profile",
      "scroll":true,
      "dataSource":['data1','data2'],
      "meta":{
        "onFormSubmitModule":{
          "moduleName":"showFormAlertDialog",
          "args":[]
        },
        "onLoad":{
          "newState":"LOADING",
          "moduleName":"makeGETRequest",
          "args":["https://test-lapp-api.fourthlion.in/ccd-api/v1/public/customers/929699337638",{
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

      },
      "children":[
        {
          "id":"t1",
          "component":"TextView",
          "binding":"Name",
          "styleClass":{
              "text":"textStyle"
          },

        },
        {
          "id":"ti1",
          "component":"TextInputView",
          "placeholder":"Bro, tell me your name",
          "name":"Name",
          "styleClass":{
            "textInput":"textInputStyle"
          },
          "formProps":{
          }
        },
        {
          "id":"t2",
          "component":"TextView",
          "binding":"Gender",
          "styleClass":{
              "text":"textStyle"
          }
        },
        {
          "id":"rg1",
          "component":"RadioGroup",
          "noOfChildren":4,
          "btnChoices":["Male","Female" ,"Other","Trans"],
          "radioType":"toggleMultipleSelect",
          styleClass:{
            "container":"radioContainerStyle",
          },
          "formProps":{
          }

        },
        {
          "id":"t3",
          "component":"TextView",
          "binding":"Date of Birth",
          "styleClass":{
              "text":"textStyle"
          }
        },
        {
          "id":"dp1",
          "component":"DatePick",
          "placeholder":"Select your birthday",
          "styleClass":{
              "dateTouchContainer":"dateTouchContainerStyle",
          },
        },
        {
          "id":"t4",
          "component":"TextView",
          "binding":"Mobile",
          "styleClass":{
              "text":"textStyle"
          }
        },
        {
          "id":"ti2",
          "component":"TextInputView",
          "placeholder":"Enter your mobile number",
          "name":"mobile",
          "styleClass":{
            "textInput":"textInputStyle"
          },
        },
        {
          "id":"t5",
          "component":"TextView",
          "binding":"Email",
          "styleClass":{
              "text":"textStyle"
          }
        },
        {
          "id":"ti3",
          "component":"TextInputView",
          "placeholder":"Enter your email address",
          "styleClass":{
            "textInput":"textInputStyle"
          }
        },
        {
          "id":"t6",
          "component":"TextView",
          "binding":"Food Preference",
          "styleClass":{
              "text":"textStyle"
          }
        },
        {
          "id":"rg2",
          "component":"RadioGroup",
          "noOfChildren":2,
          "btnChoices":["Veg","Non-Veg"],
          styleClass:{
            "container":"radioContainerStyle",
          },

        },
        {
          "id":"t7",
          "component":"TextView",
          "binding":"Marital Status",
          "styleClass":{
              "text":"textStyle"
          }
        },
        {
          "id":"rg3",
          "component":"RadioGroup",
          "noOfChildren":2,
          "btnChoices":["Single","Married"],
          styleClass:{
            "container":"radioContainerStyle",
          },
        },
        {
          "id":"t8",
          "component":"TextView",
          "binding":"I married my soul mate on...",
          "styleClass":{
              "text":"textStyle"
          }
        },
        {
          "id":"dp2",
          "component":"DatePick",
          "placeholder":"Select your anniversary",
          "styleClass":{
              "dateTouchContainer":"dateTouchContainerStyle",
          },
        },
        {
          "id":"b1",
          "component":"Button",
          "signal":"FormSubmit",
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
            "binding":"Submit",
            "styleClass":{
              "text":"buttonText"
            },}
          ],
          "meta":{
            "onClickModule":{

              }
          }
        }

      ]
    },
  },
  "schemaConfig":{
    "prefix":"myProfile",
  },

}

export default schema;
