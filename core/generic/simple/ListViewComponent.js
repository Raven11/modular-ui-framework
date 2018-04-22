import React from 'react';
import {
  View,
  ListView,
  Text,
  RecyclerViewBackedScrollView,
} from 'react-native';
import MUIComponent from '../MUIComponent';
import LoadingIndicator from './LoadingIndicator';


const COMPONENT_STATES = ['LOADING','ACTIVE'];

var DEFAULT_PAGE_SIZE = 1;
var DEFAULT_INITIAL_ROWS = 10;
var DEFAULT_SCROLL_RENDER_AHEAD = 1000;
var DEFAULT_END_REACHED_THRESHOLD = 1000;
var DEFAULT_SCROLL_CALLBACK_THROTTLE = 50;

class ListViewComponent extends MUIComponent{
    constructor(props){
        super(props,ListViewComponent.defaultStyle,props.style);
}


    getListViewDefaultProps(){
        let listViewDefaultProps = {
            initialListSize: DEFAULT_INITIAL_ROWS,
            pageSize: DEFAULT_PAGE_SIZE,
            scrollRenderAheadDistance: DEFAULT_SCROLL_RENDER_AHEAD,
            onEndReachedThreshold: DEFAULT_END_REACHED_THRESHOLD,
            renderScrollComponent: props => <RecyclerViewBackedScrollView {...props} />,
            stickyHeaderIndices: [],
        };
        return listViewDefaultProps;
    }

    render(){
        
        var defaultListViewProps = this.getListViewDefaultProps();
        
        var component = (
            <View>
            {this.props.componentState === 'LOADING' && <LoadingIndicator>
                    </LoadingIndicator>
            }
            <ListView
                {...defaultListViewProps}
                stickyHeaderIndices={[]}
                dataSource={this.props.dataSource}
                renderRow={this.props.renderRow}
                enableEmptySections={true}  
                style={this.mergedStyles.container}
            />
            </View>
            );
        return super.render(component);
    }
}

ListViewComponent.defaultStyle = {
    container:{
        margin:2,
    }
}
ListViewComponent.defaultProps = {

}
ListViewComponent.propTypes = {
    componentState:React.PropTypes.oneOf(COMPONENT_STATES),
}
export default ListViewComponent;