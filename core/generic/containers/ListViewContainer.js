import React from 'react';
import MUIComponent from '../MUIComponent';
import ListViewComponent from '../simple/ListViewComponent';
import { Text,
         ListView 
       } from 'react-native';
import { connect } from 'react-redux';  
import ListViewUtils from '../utils/ListViewUtils';
import MetaUtils from '../utils/MetaUtils';
import Actions from '../../modular_engine/actions';
import ReactJsonSchemaSingleton from '../../schema_engine/ReactJsonSchemaSingleton';
import {setDataSource} from '../../actions/ListViewActions';
import Utils from '../../schema_engine/Utils';

const BINDING_PATH = 'binding';
const COMPONENT_STATES = ['LOADING','ACTIVE'];

class ListViewContainer extends MUIComponent{

    constructor(props){
        super(props,ListViewContainer.defaultStyle);
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.constructDataSource();
    }

  /**
   * 1. Set componentState to LOADING
   * 2. If onLoad hook is provided, invoke that
   */
  componentDidMount() {
      this.props.dispatch(Actions.updateState(this,'componentState','LOADING'));
      let result = MetaUtils.returnMetaModuleAction(this,'onLoad');
      this.props.dispatch(result.functionName(this,...result.args,setDataSource));
  }



    constructDataSource = () => {
        if(this.props.hasOwnProperty('jsonResult')){
            let dataSourceObject = Utils.getObjectFromPath(this.props.jsonResult,this.props.dataSourceMapping);

            console.log(dataSourceObject);
            if(dataSourceObject){
                this.dataSource = this.dataSource.cloneWithRows(dataSourceObject);
            }
        }
    }

    renderRow = (rowData,sectionId,rowId,highlightRow) => {
        let layout,layoutName,component,inletMapWithData, inlets;
        let rowMapping;
        let reactSchema = new ReactJsonSchemaSingleton();
        let components;

        console.log(rowData,sectionId,rowId,highlightRow);

        switch(this.props.adapter.type){
            case 'PerIndexAdapter':
                console.log('PerIndexAdapter');
                rowMapping = this.props.adapter.rowMapping;
                inlets = this.props.adapter.inlets;
                inletMapWithData = MetaUtils.mapInletsWithData(inlets,rowData);
                console.log(inletMapWithData);
                if(rowMapping.hasOwnProperty(rowId)){
                    //TODO: Enable layout to contain initial 
                    layoutName = rowMapping[rowId];
                    layout = reactSchema.getElement(null,layoutName);
                    component = reactSchema.generateComponent(null,layoutName,null,inletMapWithData,BINDING_PATH);
                    //component = reactSchema.createComponent(null,layoutName);
                    return component;
                }
                
            case 'SimpleAdapter':
                layoutName = this.props.adapter.rowDefaultLayout;
                inlets = this.props.adapter.inlets;
                inletMapWithData = MetaUtils.mapInletsWithData(inlets,rowData);
                console.log(inletMapWithData);

                //TODO: Enable layout to contain initial 
                layout = reactSchema.getElement(null,layoutName);
                component = reactSchema.generateComponent(null,layoutName,null,inletMapWithData,BINDING_PATH);
                return component;
            
        }
        console.log(rowData);

        return (
            <Text>{rowData}</Text>
        );
    }

    render(){
        this.constructDataSource();
        let component = (<ListViewComponent
                           renderRow={this.renderRow} 
                            dataSource={this.dataSource}
                            componentState={this.props.componentState}
                            style={this.props.style}
                         >
                        </ListViewComponent>);
        return super.render(component);
    }
}


const mapStateToProps = (state,ownProps) => {
  let componentState;
  let result = {...state};
  if(state.generic.hasOwnProperty('newState')){
      componentState = state.generic.newState;
      result['componentState']=componentState.componentState;
  }

  if(state.hasOwnProperty('ListViewReducers')){
      if(state.ListViewReducers.hasOwnProperty('jsonResult')){
          result['jsonResult'] = state.ListViewReducers.jsonResult;
      }
  }  
  return result;
}

ListViewContainer.defaultStyle = {
    
};
ListViewContainer.defaultProps = {
    dataSource: [],
    componentState:'ACTIVE',
    dataSourceMapping:'',
    adapter:{
        type:'SimpleAdapter',
    }
};
ListViewContainer.propTypes = {
    rowMapping:React.PropTypes.object,
    rowDefaultLayout:React.PropTypes.string,
    dataSource:React.PropTypes.object,
    adapter:React.PropTypes.shape({
        type:React.PropTypes.type,
        rowDefaultLayout:React.PropTypes.string,
        inlets:React.PropTypes.object,
        rowMapping:React.PropTypes.object,
    }).isRequired,
    componentState:React.PropTypes.oneOf(COMPONENT_STATES),
};
export default connect(mapStateToProps)(ListViewContainer);