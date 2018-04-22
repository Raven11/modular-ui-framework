import MUIComponent from './MUIComponent';
import {updateChildState} from '../actions/FormComponentContainerActions';

class MUIFormChildComponent extends MUIComponent {
  constructor(props,componentStyle,explicitStyle){
    super(props,componentStyle,explicitStyle);
    this._processFormProps();
    this._firstTimeMount = true;
  }

  _processFormProps = (props) =>{
    var _props = props;
    if(props === undefined){
      _props = this.props;
    }
    if(_props.hasOwnProperty('formProps')){
      this.validators = _props.formProps.validators;
      this.initialValue = _props.formProps.initial;
    }
  }


  componentWillMount() {

    //Update parent state only for the first time
    if(this._firstTimeMount){
      this._updateStateToParentForm(this.initialValue);
      this._firstTimeMount = false;
    }

  }

  _updateStateToParentForm = (value) => {
    console.log('_updateStateToParentForm');
    if((this.props._updateStateCallback !== null) && (this.props._updateStateCallback !== undefined)){
      // this.props._updateStateCallback(this.props.id,value,this.props.name,this.validators);
      if(this.props.dispatch !== undefined){ /** i.e child component uses redux **/
        let newState = {'id':this.props.id,'value':value};
        console.log(this.props._updateStateCallback);
        // this.props._updateStateCallback(this.props.id,value,this.props.name,this.validators);
        this.props.dispatch(updateChildState(this,newState));
      }
    }
  }
}
export default MUIFormChildComponent;
