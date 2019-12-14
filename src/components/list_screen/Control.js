import React, { Component } from 'react';
import {Rnd} from 'react-rnd';

class Control extends Component {
    state = {
        controlType: this.props.control.controlType,
        posX: this.props.control.posX,
        posY: this.props.control.posY,
        height: this.props.control.height,
        width: this.props.control.width,
        text: this.props.control.text,
        fontSize: this.props.control.fontSize,
        bgColor: this.props.control.bgColor,
        borderColor: this.props.control.borderColor,
        textColor: this.props.control.textColor,
        borderThickness: this.props.control.borderThickness,
        borderRadius: this.props.control.borderRadius,
        index: this.props.index
    }

    render() {
      if(this.props.control.controlType === "button"){
        return (
          <Rnd
            default={{
              x: this.state.posX,
              y: this.state.posY,
              width: this.state.width,
              height: this.state.height,
            }}
            bounds="parent"
            minWidth={this.state.width + 55}
            minHeight={this.state.height + 18}
            style={{ borderStyle: 'solid', borderColor: 'black' }}
            onClick={(e) => this.props.selectControl(e, this.state.index)}
            onDragStop={(e, d) => this.props.repositionControl(this.state.index, d.x, d.y)}
            onResizeStop={(e, direction, ref, delta, position) => this.props.resizeControl(this.state.index, ref.style.width, ref.style.height)}
          >
            <button style={{ width: '100%', height: '100%'}}>{this.state.text}</button>
          </Rnd>
        )
      }else if(this.props.control.controlType === "textfield"){
        return (
          <Rnd
            default={{
              x: this.state.posX,
              y: this.state.posY,
              width: this.state.width,
              height: this.state.height,
            }}
            bounds="parent"
            minWidth={this.state.width}
            minHeight={this.state.height}
            style={{ borderStyle: 'solid', borderColor: 'black' }}
            onClick={(e) => this.props.selectControl(e, this.state.index)}
            onDragStop={(e, d) => this.props.repositionControl(this.state.index, d.x, d.y)}
            onResizeStop={(e, direction, ref, delta, position) => this.props.resizeControl(this.state.index, ref.style.width, ref.style.height)}
          >
            <input type = "text" style={{ width: '100%', height: '100%'}} defaultValue={this.state.text}></input>
          </Rnd>
        )
      }else if(this.props.control.controlType === "label"){
        return (
          <Rnd
            default={{
              x: this.state.posX,
              y: this.state.posY,
              width: this.state.width,
              height: this.state.height,
            }}
            bounds="parent"
            minWidth={this.state.width}
            minHeight={this.state.height}
            style={{ borderStyle: 'solid', borderColor: 'black' }}
            onClick={(e) => this.props.selectControl(e, this.state.index)}
            onDragStop={(e, d) => this.props.repositionControl(this.state.index, d.x, d.y)}
            onResizeStop={(e, direction, ref, delta, position) => this.props.resizeControl(this.state.index, ref.style.width, ref.style.height)}
          >
            <label style={{ width: '100%', height: '100%'}}>{this.state.text}</label>
          </Rnd>
        )
      }else{
        return (
            <Rnd
              default={{
                x: this.state.posX,
                y: this.state.posY,
                width: this.state.width,
                height: this.state.height,
              }}
              bounds="parent"
              minWidth={this.state.width}
              minHeight={this.state.height}
              style={{ borderStyle: 'solid', borderColor: 'black' }}
              onClick={(event) => this.props.selectControl(event, this.state.index)}
              onDragStop={(e, d) => this.props.repositionControl(this.state.index, d.x, d.y)}
              onResizeStop={(e, direction, ref, delta, position) => this.props.resizeControl(this.state.index, ref.style.width, ref.style.height)}
            >
              <div className = "container_wireframe" style={{ width: '100%', height: '100%'}}></div>
            </Rnd>
          )
      }
    }
}

export default (Control);
