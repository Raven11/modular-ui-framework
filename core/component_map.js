import GenericComponent from './generic/simple/GenericComponent';
import TextView from './generic/simple/TextView';
import ImageView from './generic/simple/ImageView';
import Button from './generic/simple/Button';
import Route from './generic/Route';
import BarcodeScan from './generic/simple/BarcodeScan';
import FormComponent from './generic/simple/FormComponent';
import TextInputView from './generic/simple/TextInputView';
import RadioGroup from './generic/simple/RadioGroup';
import DatePick from './generic/simple/DatePick';
import FormComponentContainer from './generic/containers/FormComponentContainer';
import ListViewContainer from './generic/containers/ListViewContainer';

const componentMap = {
  "GenericComponent":GenericComponent,
  "TextView":TextView,
  "ImageView":ImageView,
  "Button":Button,
  "Route":Route,
  "BarcodeScan":BarcodeScan,
  "FormComponent":FormComponent,
  "TextInputView":TextInputView,
  "RadioGroup":RadioGroup,
  "DatePick":DatePick,
  "FormComponentContainer":FormComponentContainer,
  "ListViewContainer":ListViewContainer,
};
 export default componentMap;
