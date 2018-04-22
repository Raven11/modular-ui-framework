import Utils from '../Utils';

beforeEach(() => {
  style1 = {
      'text':{
        'marginTop':10,
      },
      'section1':{
        'prop1':'prop',
      }
  };
  style2 = {
    'text':{
      'color':'blue',
    },
    'section2':{
      'prop1':'prop'
    }
  };
  styleWithArraySectionStyles = {
    'text':[{'color':'blue'},{'prop1':'prop'}]
  }

});

describe('test for mergeStyles', () => {
  it('should return a object containing style sections. Each style section is a list of objects', () =>{
      expect(style1.hasOwnProperty('text')).toBe(true);
      expect(style2.hasOwnProperty('text')).toBe(true);
      const mergedStyle = Utils.mergeStyles(style1,style2);
      expect(mergedStyle.hasOwnProperty('text')).toBe(true);
      expect(Array.isArray(mergedStyle['text'])).toBe(true);
      for(var section in mergedStyle){
        //ensuring every element is an object
        expect(Array.isArray(mergedStyle.text.section)).toBe(false);
      }
  });
  it('should return an object of that has non-intersecting elements of style1 and style2 and it should be an array of length 1', () =>{
    expect(style1.hasOwnProperty('section1')).toBe(true);
    expect(style2.hasOwnProperty('section2')).toBe(true);
    const mergedStyle = Utils.mergeStyles(style1,style2);

    expect(mergedStyle.hasOwnProperty('section1')).toBe(true);
    expect(Array.isArray(mergedStyle.section1)).toBe(true);
    expect(mergedStyle.section1.length === 1).toBe(true);

    expect(mergedStyle.hasOwnProperty('section2')).toBe(true);
    expect(Array.isArray(mergedStyle.section2)).toBe(true);
    expect(mergedStyle.section2.length === 1).toBe(true);
  });
  it('should return section of objects even when one style section has an array of section styles', ()=>{
    expect(style1.hasOwnProperty('text')).toBe(true);
    expect(styleWithArraySectionStyles.hasOwnProperty('text')).toBe(true);
    expect(Array.isArray(styleWithArraySectionStyles.text)).toBe(true);

    const mergedStyle = Utils.mergeStyles(style1,styleWithArraySectionStyles);
    expect(mergedStyle.hasOwnProperty('text')).toBe(true);
    for(var section in mergedStyle){
      //ensuring every element is an object
      expect(Array.isArray(mergedStyle.text.section)).toBe(false);
    }

    //reversing order of styles
    const mergedStyle2 = Utils.mergeStyles(styleWithArraySectionStyles,style1);
    expect(mergedStyle2.hasOwnProperty('text')).toBe(true);
    for(var section in mergedStyle2){
      //ensuring every element is an object
      expect(Array.isArray(mergedStyle2.text.section)).toBe(false);
    }
  });

  describe('when calling putObjectIntoPath method',() => {
    var input1 = {'a':1,'b':2};
    var path1 = 'c';
    var output1 = {'a':1,'b':2, 'c':'blah'};
    var input2 = {'a':1,'b':2, 'c':{'e':3}};
    var path2 =  'c.d';
    var data = 'blah';
    var output2 = {'a':1,'b':2, 'c':{'d':'blah','e':3}};
    var input3 = {'a':1,'b':2};
    var path3 = 'c.d';
    var output3 = {'a':1,'b':2, 'c':{'d':'blah'}};
    var input4 = {'a':1,'b':2};
    var path4 = 'c.d.e';
    var output4 = {'a':1,'b':2, 'c':{'d':{'e':'blah'}}};
    it('valid inputs should result in valid outputs', () => {
      expect(Utils.putObjectIntoPath(input1,path1,data)).toEqual(output1);
      expect(Utils.putObjectIntoPath(input2,path2,data)).toEqual(output2);
      expect(Utils.putObjectIntoPath(input3,path3,data)).toEqual(output3);
      expect(Utils.putObjectIntoPath(input4,path4,data)).toEqual(output4);
    });
  });

  describe('when calling getObjectFromPath method', () => {

    var input1 = {'a':1,'b':2};
    var path1 = 'a';
    var output1 = 1;
    var input2 = {'a':1,'b':2, 'c':{'e':3}};
    var path2 =  'c.e';
    var output2 = 3;
    var input3 = {'a':1,'b':2, 'c':{'d':{'e':'blah'}}};
    var path3 = 'c.d';
    var output3 = {'e':'blah'};
    var input4 = {'a':1,'b':2, 'c':{'d':{'e':'blah'}}};
    var path4 = 'c.e.f';
    var output4 = null;

    it('gives valid result from the given inputs', () => {
      expect(Utils.getObjectFromPath(input1,path1)).toEqual(output1);
      expect(Utils.getObjectFromPath(input2,path2)).toEqual(output2);
      expect(Utils.getObjectFromPath(input3,path3)).toEqual(output3);
      expect(Utils.getObjectFromPath(input4,path4)).toEqual(output4);
    });
  });

  describe('when calling prefixKeysInDictionary', () => {
    var input1 = {'a':1,'b':2}
    var prefix1 = 'pre'
    var seperator1 = '@'
    var output1 = {'pre@a':1,'pre@b':2}

    it('gives valid result from the given inputs', () => {
      expect(Utils.prefixKeysInDictionary(input1,prefix1,seperator1)).toEqual(output1);
    });
  });

  describe('when calling combine Schema', () => {
    
    var schemas = [{'layouts':{'layout1':{'a':1}},
                     'schemaConfig':{
                       'prefix':'root'
                     }
                    }, 
                    {'layouts':{'layout2':{'b':2}},
                     'schemaConfig':{
                       'prefix':'schema1'
                      }
                    }
                  ];

    it('result.layouts will have a combination of all layouts. It will also have correct prefix', () => {
        result = Utils.combineSchemas(schemas);

    });
  });


});
