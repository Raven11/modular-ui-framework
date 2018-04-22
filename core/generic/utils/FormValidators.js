class FormValidators {
    static validateCompulsoryField(value,fieldName){
      if((value !== undefined) && (value !== null) && (value !== '')){
        return {result:true,message:""};
      }
      return {result:false,message:`Field "${fieldName}" not filled`};
    }

    static validateMinMaxCharacters(value,fieldName,min,max){
      if((value !== undefined) && (value !== null) && (value !== '')){
        if((value.length >= min) && (value.length <= max)){
          return {result:true,message:""};
        }
      }
      return {result:false,message:`Field "${fieldName}" not satisfying minMax conditions "min:${min},max:${max}"`};
    }

    static validateRegex(value,fieldName,regex){
      if(value.match(regex)){
        return {result:true,message:""};
      }
      return {result:false,message:`Field "${fieldName}" not satisfying regex "${regex}" conditions`};
    }

    static validatePhoneNumber(value,fieldName){
      const regex = "";
      return FormValidators.validateRegex(value,fieldName,regex)
    }

    static validateEmail(value,fieldName){
      const regex = "";
      return FormValidators.validateRegex(value,fieldName,regex)
    }
}

export default FormValidators;
