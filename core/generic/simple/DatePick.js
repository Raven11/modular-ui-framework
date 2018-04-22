import React from 'react';
import {
        View,
        DatePickerAndroid,
        DatePickerIOS,
        TimePickerAndroid,
        TouchableHighlight,
        Text,
        Platform,
        Modal
      } from 'react-native';
import { connect } from 'react-redux'
import MUIFormChildComponent from '../MUIFormChildComponent';
import Moment from 'moment';
import Utils from '../../schema_engine/Utils';



const FORMATS = {
  //'date': 'DD-MM-YYYY',
  //'datetime': 'DD-MM-YYYY HH:mm',
  'date': 'YYYY-MM-DD',
  'datetime': 'YYYY-MM-DD HH:mm',
  'time': 'HH:mm'
};

class DatePick extends MUIFormChildComponent {
  constructor(props){
    super(props,DatePick.defaultStyle,props.style);
    this.format = this.props.format || FORMATS[this.props.mode];
    this.state = {
      date: this._getDate(),
      disabled:this.props.disabled,
      modalVisible:false,
    }

    //Set initialValue if it is present
    this.state.selectedDate = this.initialValue;
  }

  _onPressCancel = ()  => {
      this.setModalVisible(false);
  }

  _onPressConfirm = ()  => {
    this._datePicked();
    this._setModalVisible(false);
  }

  _datePicked = (date) => {
    this.setState({selectedDate:this.state.date});
    this._updateStateToParentForm(this._getDateStr());
  }
  _onDatePicked = ({action, year, month, day}) => {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day)
      });
    }
  }

  _onTimePicked = ({action, hour, minute}) => {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: Moment().hour(hour).minute(minute).toDate()
      });
      this._datePicked();
    }
  }

  _onDatetimePicked = ({action, year, month, day}) => {
    if (action !== DatePickerAndroid.dismissedAction) {
      let timeMoment = Moment(this.state.date);

      TimePickerAndroid.open({
        hour: timeMoment.hour(),
        minute: timeMoment.minutes(),
        is24Hour: !this.format.match(/h|a/)
      }).then(this._onDatetimeTimePicked.bind(this, year, month, day));
    }
  }

  _onDatetimeTimePicked = (year, month, day, {action, hour, minute}) => {
    if (action !== DatePickerAndroid.dismissedAction) {
      this.setState({
        date: new Date(year, month, day, hour, minute)
      });
      this._datePicked();
    }
  }

  _onPressDate = () => {
    if (this.state.disabled) {
     return true;
    }

    // reset state
    this.setState({
      date: this._getDate()
    });

    if(Platform.OS === 'ios'){
      this._setModalVisible(true);
      } else {
       if (this.props.mode === 'date') {
         DatePickerAndroid.open({
          date: this.state.date,
          minDate: this.props.minDate && this.getDate(this.props.minDate),
          maxDate: this.props.maxDate && this.getDate(this.props.maxDate)
        }).then(this._onDatePicked);
       } else if(this.props.mode === 'time'){
         let timeMoment = Moment(this.state.date);
         TimePickerAndroid.open({
           hour: timeMoment.hour(),
           minute: timeMoment.minutes(),
           is24Hour: !this.format.match(/h|a/)
         }).then(this._onTimePicked);
       } else if (this.props.mode === 'datetime') {
         DatePickerAndroid.open({
          date: this.state.date,
          minDate: this.props.minDate && this.getDate(this.props.minDate),
          maxDate: this.props.maxDate && this.getDate(this.props.maxDate)
        }).then(this._onDatetimePicked);
       } else {
        throw new Error('The specified mode is not supported');
      }
    }
  }

  _getTitleElement = () => {
    const {placeholder} = this.props;
    if (!this.state.selectedDate && placeholder) {
      return (<Text style={this.mergedStyles.placeholderText}>{placeholder}</Text>);
    }
    return (<Text style={this.mergedStyles.dateText}>{this._getDateStr()}</Text>);
  }

  _getDateStr = (date = this.state.selectedDate) => {
    if (date instanceof Date) {
      return Moment(date).format(this.format);
    } else {
      return Moment(this._getDate(date)).format(this.format);
    }
  }

  _getDate(date = this.props.date) {
    if (!date) {
      let now = new Date();
      if (this.props.minDate) {
        let minDate = this.getDate(this.props.minDate);
        if (now < minDate) {
          return minDate;
        }
      }

      if (this.props.maxDate) {
        let maxDate = this.getDate(this.props.maxDate);
        if (now > maxDate) {
          return maxDate;
        }
      }
      return now;
    }

    if (date instanceof Date) {
      return date;
    }
    return Moment(date, this.format).toDate();
  }

  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  _onPressCancel = () => {
    this._setModalVisible(false);
  }

  componentWillReceiveProps(newProps){
    this._processFormProps(newProps);
    if(this.initialValue !== undefined){
      //TODO: Giving out invalid value as date
      // this.setState({selectedDate:this._getDate(this.initialValue)});
      this.state.selectedDate = this.initialValue;
    }
  }

  render(){
    const dateInputStyle = [
      this.mergedStyles.dateInput,
      this.state.disabled && this.mergedStyles.disabled,
    ];

    const component = (
      <TouchableHighlight
        style={this.mergedStyles.dateTouchContainer}
        underlayColor={'transparent'}
        onPress={this._onPressDate}
      >
      <View style={this.mergedStyles.dateTouchBody}>
      <View style={dateInputStyle}>
         {this._getTitleElement()}
       </View>


       {Platform.OS === 'ios' && <Modal
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {this._setModalVisible(false);}}
        >
        <TouchableHighlight
              style={this.mergedStyles.datePickerMask}
              activeOpacity={1}
              underlayColor={'#00000077'}
              onPress={this._onPressCancel}
            >
            <TouchableHighlight
                underlayColor={'#fff'}
                style={{flex: 1}}
            >
            <View style={this.mergedStyles.datePickerCanvas}>
            <DatePickerIOS
                  date={this.state.date}
                  mode={this.props.mode}
                  minimumDate={this.props.minDate && this.getDate(this.props.minDate)}
                  maximumDate={this.props.maxDate && this.getDate(this.props.maxDate)}
                  onDateChange={(date) => this.setState({date: date})}
                  style={this.mergedStyles.datePicker}
            />
            <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={this._onPressCancel}
                    style={[this.mergedStyles.btnText,this.mergedStyles.btnCancel]}
                  >
                    <Text
                      style={[this.mergedStyles.btnTextText, this.mergedStyles.btnTextCancel]}
                    >
                      {this.props.cancelBtnText}
                    </Text>
            </TouchableHighlight>
            <TouchableHighlight
                    underlayColor={'transparent'}
                    onPress={this._onPressConfirm}
                    style={[this.mergedStyles.btnText,this.mergedStyles.btnConfirm]}
                  >
                    <Text style={[this.mergedStyles.btnTextText, this.mergedStyles.btnTextConfirm]}>
                    {this.props.confirmBtnText}
                    </Text>
            </TouchableHighlight>
            </View>
            </TouchableHighlight>
        </TouchableHighlight>
        </Modal>
       }




      </View>
      </TouchableHighlight>
    );

    return super.render(component);
  }

}

const mapStateToProps = (state) => ({
	profile:state.profile,
})


DatePick.defaultProps = {
    mode: 'date',
    cancelBtnText:'Cancel',
    confirmBtnText:'Confirm',
    disabled:false,
}


DatePick.defaultStyle = {
  dateTouchContainer: {
  },
  dateTouchBody:{
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderText: {
    color: '#c9c9c9'
  },
  dateText: {
    color: '#333'
  },
  datePickerMask: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: '#00000077'
  },
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnCancel: {
    left: 0
  },
  btnConfirm: {
    right: 0
  },
  btnTextText: {
    fontSize: 16,
    color: '#46cf98'
  },
  btnTextCancel: {
    color: '#666'
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center'
  },
  datePickerCanvas:{
    backgroundColor: '#fff',
    overflow: 'hidden'
  }
}

DatePick.propTypes = {
    mode: React.PropTypes.oneOf(['date', 'datetime', 'time']),
    placeholder: React.PropTypes.string,
    date: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)]),
    minDate: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)]),
    maxDate: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)]),
    disabled: React.PropTypes.bool,
    confirmBtnText: React.PropTypes.string,
    cancelBtnText: React.PropTypes.string,
    format: React.PropTypes.string,
}

export default connect(mapStateToProps)(DatePick);
