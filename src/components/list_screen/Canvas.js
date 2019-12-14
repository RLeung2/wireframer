import React, { Component } from 'react';
import Control from './Control.js'

class Canvas extends Component {
    state = {
      controlsArr: this.props.controlsArr,
      height: '',
      width: '',
      name: ''
    }

    render() {
        return (     
          <div className = "wireframeCanvas" onClick={(e) => this.props.selectControl(e, -1)}>
          {this.props.controlsArr.map((control, index) => (
              <Control 
                index = {index} 
                control = {control}
                selectControl={this.props.selectControl}
                repositionControl={this.props.repositionControl}
                resizeControl={this.props.resizeControl}/>
            ))}
        </div>
        );
    }
}

export default (Canvas);

