import React, { Component } from 'react';
import Control from './Control.js'
import Draggable from 'react-draggable';

class Canvas extends Component {
    state = {
      controlsArr: this.props.controlsArr,
      height: '',
      width: '',
      name: ''
    }

    render() {
        return (     
            <Draggable>
                <div id="wireframeCanvas" className = "wireframeCanvas" onClick={(e) => this.props.selectControl(e, -1)}>
                {this.props.controlsArr.map((control, index) => (
                    <Control 
                        index = {index} 
                        control = {control}
                        selectControl={this.props.selectControl}
                        repositionControl={this.props.repositionControl}
                        resizeControl={this.props.resizeControl}/>
                    ))}
                </div>
            </Draggable>
        );
    }
}

export default (Canvas);

