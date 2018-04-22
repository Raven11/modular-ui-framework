import React from 'react';
import {Text} from 'react-native';
import ReactJsonSchemaSingleton from '../ReactJsonSchemaSingleton';

let reactJsonSchema;
let schema;

class Tester extends React.Component{
  render(){
    return (
      <Text>
      This is a test!
      </Text>
    );
  }
}

const componentMap = {
  "Tester":Tester
};

const layoutWithStyleNStyleClass = {
  "component":"Tester",
  "id":"comp2",
  "text":"This is a home screen. You will soon be able to scroll up and down",
  "styleClass":{
    "text":"redText"
  },
  "style":{
    "text":{
      "color":"yellow",
    }
  }
};
const layoutWithStyleClass = {
  "component":"Tester",
  "id":"blah",
  "text":"This is a home screen. You will soon be able to scroll up and down",
  "styleClass":{
    "text":"redText"
  }

};
const layoutWithStyle = {
  "component":"Tester",
  "id":"comp2",
  "text":"This is a home screen. You will soon be able to scroll up and down",
  "style":{
    "text":{
      "color":"yellow",
    }
  }
};

const child1 = {
  "component":"TextView",
  "id":"comp2",
  "text":"This is a home screen. You will soon be able to scroll up and down",
  "styleClass":{
    "text":"redText"
  }};

const children = [child1,];
const layout = {
  "component":"GenericComponent",
  "id":"comp1",
  "title":"Home",
  "children":children
 };

beforeEach(() => {
  reactJsonSchema = new ReactJsonSchemaSingleton();
  reactJsonSchema.setComponentMap(componentMap);
  schema = {
    'id':'comp1',
    'component':"Tester",
    'someProp':'Dummy prop'
  };
  testSchemaWithStyle = {
    'component':'Tester',
    'id':'comp1',
    'styleClass':{
        'text':'redText',
    },
    'style':{
      'text':{
        'color':'blue',
      }
    }
  };
  stylesheet =   {
  "redText":{
      "color":"red",
    }
  };
  routeStack = {
    "startPage":"layout1",
  };
  layouts = {
    "layout1":schema,
    "layout2":layout,
  }

});

// Tests no longer valid
// TODO: Remove code (kept it for reference purposes)
// describe('when parsing schema', () => {
//   it("should return an object of React element when schema's root is of type object", () => {
//     const actual = reactJsonSchema.parseLayout(schema);
//     expect(actual === Object(actual)).toBe(true);
//   });
//   it("should return an array of React elements when schema's root is of type array.", () => {
//     const actual = reactJsonSchema.parseLayout([schema]);
//     expect(Array.isArray(actual)).toBe(true);
//     const component = actual[0];
//     expect(React.isValidElement(component)).toBe(true);
//   });
//   it("should throw an error, if the component is not defined in the map", () =>{
//     const testComponentMap = {
//       //empty component map
//     };
//     expect(testComponentMap.hasOwnProperty("Tester")).toBe(false);
//     reactJsonSchema.setComponentMap(testComponentMap);
//     expect(() => {
//       reactJsonSchema.parseLayout(schema);
//     }).toThrow();
//   });
//   it("should throw an error, if some compulsory properties of a component are not defined", () => {
//     const testSchema = {
//       "someProp":'Dummy prop'
//       //here component property is not defined. This is a compulsory property
//     }
//     expect(reactJsonSchema.getComponentCompulsoryProperties().includes('component')).toBe(true);
//     expect(testSchema.hasOwnProperty('component')).toBe(false);
//
//     expect(() =>{
//       reactJsonSchema.parseLayout(testSchema);
//     }).toThrow();
//   });
// });
// describe('when parsing sub schema', () => {
//   it('should return an array of React Elements when valid schema is passed', () => {
//     const subSchema = [schema,schema];
//     const actual = reactJsonSchema.parseLayout(subSchema);
//     expect(Array.isArray(actual)).toBe(true);
//     expect(!!actual.length).toBe(true);
//     const component = actual[0];
//     expect(React.isValidElement(component)).toBe(true);
//   });
//   it('should construct sub-schema React elements by parsing each sub-schema.', () => {
//     const subSchemas = [schema,schema];
//     spyOn(reactJsonSchema, 'parseLayout');
//     reactJsonSchema.parseLayout(subSchemas);
//     expect(reactJsonSchema.parseLayout).toHaveBeenCalled();
//   });
//
// });
//
// describe('when layout contains children with styles', () => {
//   it('should return component containing list of children containing both style elements if both style and styleclass is present', () => {
//     reactJsonSchema.setStylesheet(stylesheet);
//     const component = reactJsonSchema.parseLayout(layoutWithStyleNStyleClass);
//     expect(Array.isArray(component.props.style.text)).toBe(true);
//     expect(component.props.style.text.length).toBe(2);
//   });
//   it('should return component containing styleclass style', () => {
//     reactJsonSchema.setStylesheet(stylesheet);
//     const component = reactJsonSchema.parseLayout(layoutWithStyleClass);
//     expect(component.props.style.text).toBe(stylesheet.redText);
//   });
//   it('should return component containing style of layout', () => {
//     reactJsonSchema.setStylesheet(stylesheet);
//     const component = reactJsonSchema.parseLayout(layoutWithStyle);
//     expect(component.props.style).toBe(layoutWithStyle.style);
//   });
// });
//
// describe('when processing styles', () => {
//   it('should return a style list containing list of styles when both style and styleClass of a component are defined', () => {
//     expect(testSchemaWithStyle.hasOwnProperty('styleClass')).toBe(true);
//     expect(testSchemaWithStyle.hasOwnProperty('style')).toBe(true);
//     expect(testSchemaWithStyle.style.hasOwnProperty('text')).toBe(true);
//     expect(testSchemaWithStyle.styleClass.hasOwnProperty('text')).toBe(true);
//
//
//     reactJsonSchema.setStylesheet(stylesheet);
//     const component = reactJsonSchema.parseLayout(testSchemaWithStyle);
//     expect(Array.isArray(component.props.style['text'])).toBe(true);
//   });
//
//   it('should return style list containing list of styles when only stylesheet is defined', () =>{
//
//   });
//   it('should return style list containing list of styles when only style is defined', () => {
//
//   });
//
// });


beforeEach(()=>{
  reactJsonSchema.setLayouts(layouts);
});
describe('when parsing a single route stack', () => {
  it('should return a component of type Route with start page as a valid React element',() => {
     const route = reactJsonSchema.parseRouteStack(routeStack);
     expect(React.isValidElement(route)).toBe(true);
  });
});


describe('when getting element layout', () =>{
    it('should return a javascript object containing the topmost element',()=>{
      const resultComp = 'comp2';
      const result = reactJsonSchema.getElement(resultComp,"layout2");
      expect(result.id).toBe(resultComp);
  });
})

describe('when getting element children', () => {
  it('should return children of the topmost element of that id', () => {
    const result = reactJsonSchema.getChildrenElements('comp1',"layout2");

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result).toBe(children);
  });

  it('should return array of length zero if there are no children', () => {
    const result = reactJsonSchema.getChildrenElements('comp2',"layout2");
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

});

describe('when calling create component from layout', () => {
  const layoutWithoutId = {
    "component":"GenericComponent",
   };
   const layoutWithoutComponet = {
     "id":"blah",
    };
  const layout = {
    "component":"Tester",
    "id":"blah",
    "children":[{
      "component":"Tester",
      "id":"comp2",
    }]
  };
  it('should throw an error if the compulsory parameters are not present', () => {
    expect(() => {reactJsonSchema.createComponentFromLayout(layoutWithoutId)}).toThrow();
    expect(() => {reactJsonSchema.createComponentFromLayout(layoutWithoutComponet)}).toThrow();
  });
  it('should have _layout and _childrenIds(if the children is defined)', () =>{
    const result = reactJsonSchema.createComponentFromLayout(layout,"layout1");
    expect(result.props._layoutName).toBe("layout1");
    expect(Array.isArray(result.props._childrenIds)).toBe(true);
    expect(result.props._childrenIds.length).toBe(1);
  });
});
