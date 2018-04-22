import MUIFormChildComponent from '../MUIFormChildComponent';

const props1 = {
        "noOfChildren":3,
        "btnChoices":["Male","Female","Other"],
        "formProps":{
          "initial":"Male",
          "validators":[{module:"validateCompulsoryField"},
                            {module:"validateMinMaxCharacters",
                              args:[10,50]}
                            ],
        }
};
const propsWithoutFormProps = {
  "noOfChildren":3,
  "btnChoices":["Male","Female","Other"],
}
beforeEach(() => {


});
describe('correctly creates and renders base class MUIFormChildComponent',() => {
  it('processes FormComponets and sets them correctly if formProps are present',() => {
    const rnInst1 = new MUIFormChildComponent(props1);
    expect(rnInst1.initialValue).toBe('Male');
    expect(Array.isArray(rnInst1.validators)).toBe(true);
    expect(rnInst1.validators.length).toBe(2);

    const rnInst2 = new MUIFormChildComponent(propsWithoutFormProps);
    expect(rnInst2.initialValue).toBe(undefined);
    expect(rnInst2.validators).toBe(undefined);
  });
});
