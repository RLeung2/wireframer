import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
 
class Control extends Component {
    render() {
      console.log(this.props.control);
      let styleObject = {
        fontSize: this.props.control.font_size,
        color: this.props.control.text_color,
        backgroundColor: this.props.control.background_color,
        border: String(this.props.control.border_thickness) + 'px solid',
        borderColor: this.props.control.border_color,
        borderRadius: this.props.control.border_radius,
        display: 'inline-block',
      } 

      if (this.props.control.controlType === "button") {
        return (
          <Rnd
            size={{ width: this.props.control.width,  height: this.props.control.height }}
            position={{ x: this.props.control.posX, y: this.props.control.posY }}
            bounds="parent"
            minWidth={70}
            minHeight={40}
            style={{ borderStyle: 'solid', borderColor: 'black' }}
            className = {this.props.control.className}
            onClick={(e) => this.props.selectControl(e, this.props.index)}
            onDragStop={(e, d) => this.props.repositionControl(this.props.index, d.x, d.y)}
            onResizeStop={(e, direction, ref, delta, position) => this.props.resizeControl(this.props.index, ref.style.width, ref.style.height)}
          >
            <button style={styleObject}>{this.props.control.text}</button>
          </Rnd>
        )
      }
      else if (this.props.control.controlType === "textfield") {
        return (
          <Rnd
            size={{ width: this.props.control.width,  height: this.props.control.height }}
            position={{ x: this.props.control.posX, y: this.props.control.posY }}
            bounds="parent"
            minWidth={70}
            minHeight={40}
            style={{ borderStyle: 'solid', borderColor: 'black' }}
            className = {this.props.control.className}
            onClick={(e) => this.props.selectControl(e, this.props.index)}
            onDragStop={(e, d) => this.props.repositionControl(this.props.index, d.x, d.y)}
            onResizeStop={(e, direction, ref, delta, position) => this.props.resizeControl(this.props.index, ref.style.width, ref.style.height)}
          >
            <input type = "text" style={{ width: '100%', height: '100%'}} defaultValue={this.props.control.text} ></input>
          </Rnd>
        )
      }
      else if (this.props.control.controlType === "label") {
        return (
          <Rnd
            size={{ width: this.props.control.width,  height: this.props.control.height }}
            position={{ x: this.props.control.posX, y: this.props.control.posY }}
            bounds="parent"
            minWidth={70}
            minHeight={40}
            style={{ borderStyle: 'solid', borderColor: 'black' }}
            className = {this.props.control.className}
            onClick={(e) => this.props.selectControl(e, this.props.index)}
            onDragStop={(e, d) => this.props.repositionControl(this.props.index, d.x, d.y)}
            onResizeStop={(e, direction, ref, delta, position) => this.props.resizeControl(this.props.index, ref.style.width, ref.style.height)}
          >
            <label style={{ width: '100%', height: '100%'}}>{this.props.control.text}</label>
          </Rnd>
        )
      } 
      else {
        return (
            <Rnd
              size={{ width: this.props.control.width,  height: this.props.control.height }}
              position={{ x: this.props.control.posX, y: this.props.control.posY }}
              bounds="parent"
              minWidth={70}
              minHeight={40}
              style={{ borderStyle: 'solid', borderColor: 'black' }}
              className = {this.props.control.className}
              onClick={(event) => this.props.selectControl(event, this.props.index)}
              onDragStop={(e, d) => this.props.repositionControl(this.props.index, d.x, d.y)}
              onResizeStop={(e, direction, ref, delta, position) => this.props.resizeControl(this.props.index, ref.style.width, ref.style.height)}
            >
              <div className = "container_wireframe" style={{ width: '100%', height: '100%'}}></div>
            </Rnd>
          )
      }
    }
} 

export default Control;
