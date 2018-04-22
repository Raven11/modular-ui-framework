import FormValidators from '../FormValidators';

describe('when validating compulsory field', ()=>{
  it('returns true if there is a non-null value', () => {
    var result;
    result = FormValidators.validateCompulsoryField("Hi","field");
    expect(result.result).toBe(true);
  });
  it('returns false if there is a null/undefined/empty value', () => {
    var result;
    result = FormValidators.validateCompulsoryField();
    expect(result.result).toBe(false);
    result = FormValidators.validateCompulsoryField(null);
    expect(result.result).toBe(false);
    result = FormValidators.validateCompulsoryField("");
    expect(result.result).toBe(false);
  });
});

describe('when validating min max characters field', () => {
  it('returns true if the length of the characters falls within(and equal) the range and false otherwise', () =>{
    var result;
    result = FormValidators.validateMinMaxCharacters("Hi","field",1,5);
    expect(result.result).toBe(true);
    result = FormValidators.validateMinMaxCharacters("Hi","field",2,5);
    expect(result.result).toBe(true);
    result = FormValidators.validateMinMaxCharacters("seven","field",2,5);
    expect(result.result).toBe(true);

    result = FormValidators.validateMinMaxCharacters("Hi","field",3,5);
    expect(result.result).toBe(false);
    result = FormValidators.validateMinMaxCharacters("HiYash","field",3,5);
    expect(result.result).toBe(false);
  });
  it('returns false if there is a null/undefined/empty value', () => {
    var result;
    result = FormValidators.validateMinMaxCharacters();
    expect(result.result).toBe(false);
    result = FormValidators.validateMinMaxCharacters(null);
    expect(result.result).toBe(false);
    result = FormValidators.validateMinMaxCharacters("");
    expect(result.result).toBe(false);
  });
});
