import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import zoomIn from '../../images/zoomin.png';
import zoomOut from '../../images/zoomout.png';
import { saveHandler } from '../../store/database/asynchHandler';
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore';
import Draggable from 'react-draggable';
import ReactPanZoom from "@ajainarayanan/react-pan-zoom";
import Control from './Control.js';
import { goHomeHandler} from '../../store/database/asynchHandler';
import { Modal, Button } from 'react-materialize';
import { SketchPicker } from 'react-color';


class ListScreen extends Component {
    state = {
        controlsArr: JSON.parse(JSON.stringify(this.props.wireframe.controls)),
        height: this.props.wireframe.height,
        width: this.props.wireframe.width,
        updatedHeight: this.props.wireframe.height,
        updatedWidth: this.props.wireframe.width,
        selectControl: -1,
        name: this.props.wireframe === undefined ? '' : this.props.wireframe.name,
        dimensionChange: false,
        dimensionUpdated: false,
        madeChange: false,
    }  

    componentDidMount() {
        console.log("MOUNT: \n");
        console.log(this.state);
        document.addEventListener('keydown', this.keysHandler);
        
        document.getElementById("wireframeCanvas").style.height = (this.state.height * 600/5000) + "px";
        document.getElementById("wireframeCanvas").style.width = (this.state.width * 600/5000) + "px";
    }
  
    componentWillUnmount() {
        document.removeEventListener('keydown', this.keysHandler);
    }
  
    handleChange = (e) => {
        const { target } = e;
  
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }), () => {
            // callback to action creator to change the data in the db
            console.log("handle name change");
            const fireStore = getFirestore();
            const ref = fireStore.collection('users').doc(this.props.auth.uid);
            const { id } = this.props;
            const name = this.state.name;
            ref.get().then(function(doc) {
              if (doc.exists) {
                var wireframes = doc.data().wireframes;
                console.log("name is " + wireframes[id].name);
                wireframes[id].name = name;
                fireStore.collection('users').doc(doc.id).update({
                  wireframes: wireframes
                }).catch((err) => {
                  console.log(err);
                });
              }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        });
    }

    handleNameChange = (e) => {
      const { target } = e;
      const { props } = this;
      const { firebase, profile } = props;
      const { wireframes } = this.props;

      this.setState(state => ({
          ...state,
          [target.id]: target.value,
          madeChange: true,
      }))

      wireframes[props.wireframe.id].name = this.state.name;
    }

    handleGoHome = () => {
        const { id } = this.props;
        const { props } = this;
        const { firebase, profile } = props;
        const { wireframes } = this.props;

        const temp = wireframes[id];
        wireframes.splice(id, 1);
        wireframes.unshift(temp);
        props.goHome(profile, wireframes, firebase);
        console.log("HOME");
        this.props.history.push('/');
    }

    handleSave = (e) => {
        e.preventDefault();
  
        const { props } = this;
        const { firebase, profile } = props;
        const { wireframes } = this.props;
        wireframes[props.wireframe.id].controls = this.state.controlsArr;
        wireframes[props.wireframe.id].name = this.state.name;

        if (this.state.dimensionUpdated) {
          wireframes[props.wireframe.id].height = this.state.updatedHeight;
          wireframes[props.wireframe.id].width = this.state.updatedWidth;
        }

        props.save(profile, wireframes, firebase);
        this.setState({madeChange: false});
    }

    keysHandler = (event) => {
        console.log("HANDLER: \n");
        console.log(this.state);
        event.stopImmediatePropagation();
        if(event.keyCode === 68 && event.ctrlKey){
            event.preventDefault();
            this.copyControl(this.state.selectControl);
        }else if(event.keyCode === 46){
            event.preventDefault();
            this.deleteControl(this.state.selectControl);
        }
    }

    copyControl = (index) => {
      if(index !== -1){
        var controlDupe = JSON.parse(JSON.stringify(this.state.controlsArr[index]));
        controlDupe.posX -= 100;
        controlDupe.posY -= 100;
        if(controlDupe.posX < 0){
          controlDupe.posX = 0;
        }
        if(controlDupe.posY < 0){
          controlDupe.posY = 0;
        }
        var controlArrNew = JSON.parse(JSON.stringify(this.state.controlsArr));
        controlArrNew.push(controlDupe);
               this.setState(state => ({
          ...state,
          controlsArr: controlArrNew,
          selectControl: controlArrNew.length - 1,
          madeChange: true,
        }));
      }
    }

  
    deleteControl = (index) => {
        if(index !== -1){
          var controlArrNew = this.state.controlsArr;
          controlArrNew.splice(index, 1);
          this.setState(state => ({
            ...state,
            controlsArr: controlArrNew,
            selectControl: -1,
            madeChange: true,
          }));
        }
    }

    selectControl = (event, index) => {
        console.log(this.state);
        event.stopPropagation();

        {this.state.controlsArr.map((control) => (
          control.className -= "borderimg"
        ))}
        if (index !== -1){
          this.state.controlsArr[index].className = "borderimg";
          console.log(this.state.controlsArr[index].className);
        }

        this.setState(state => ({
          ...state,
          selectControl: index
        }));
    }

    addControl = (type) => {
        var widthControl = 0;
        var heightControl = 0;
        var textControl = "";
        if (type === "button"){
          widthControl = 50;
          heightControl = 10;
          textControl = "Button";
        } else if (type === "label"){
          widthControl = 100;
          heightControl = 30;
          textControl = "Label";
        } else if (type === "textfield"){
          widthControl = 200;
          heightControl = 100;
          textControl = "Textfield";
        } else{
          widthControl = 200;
          heightControl = 100;
        }
        var control = {
          controlType: type,
          posX: 0,
          posY: 0,
          height: heightControl,
          width: widthControl,
          text: textControl,
          fontSize: 12,
          bgColor: "#ffffff",
          borderColor:"#ffffff",
          textColor:"#000000",
          borderThickness: 1,
          borderRadius: 0,
          className: "border"
        }
        var controlsArrNew = this.state.controlsArr;
        controlsArrNew.push(control);
        this.setState(state => ({
          ...state,
          controlsArr: controlsArrNew,
          madeChange: true,
        }));
    }

    repositionControl = (index, x, y) => {
        var controlsArrNew = this.state.controlsArr;
        var control = this.state.controlsArr[index];
        control.posX = x;
        control.posY = y;
        controlsArrNew[index] = control;
        this.setState(state => ({
          ...state,
          controlsArr: controlsArrNew,
          madeChange: true,
        }));
    }
  
    resizeControl = (index, width, height) => {
      var controlsArrNew = this.state.controlsArr;
      var control = this.state.controlsArr[index];
      control.width = Number(width.substring(0, width.length - 2));
      control.height = Number(height.substring(0, height.length - 2));
      controlsArrNew[index] = control;
      this.setState(state => ({
        ...state,
        controlsArr: controlsArrNew,
        madeChange: true,
      }));
    }


    handleDimension = (e) => {
      const { target } = e;

      this.setState(state => ({
          ...state,
          [target.id]: target.value,
          dimensionChange: true,
      }))
    }

    handleUpdateDimensions = (e) => {
        e.preventDefault();
  
        const { props } = this;
        const { firebase, profile } = props;
        const { wireframes } = this.props;
        
        if ((this.state.height>5000) || (this.state.height<1) || (this.state.width>5000) || (this.state.width<1)) {
            console.log("Invalid Dimensions")
        }
        else {
            document.getElementById("wireframeCanvas").style.height = (this.state.updatedHeight * 625/5000) + "px";
            document.getElementById("wireframeCanvas").style.width = (this.state.updatedWidth * 625/5000) + "px";
            this.setState({dimensionUpdated: true, madeChange: true});
        }
    }

    saveModal = (e) => {
      this.handleSave(e);
      this.props.history.push('/');
    }

    close = () => {
      this.handleGoHome();
    }

    setTextValue = () => {
      if (this.state.selectControl === -1 || this.state.controlsArr[this.state.selectControl].control_type === "container") {
          return ""
      }
      else {
          return this.state.controlsArr[this.state.selectControl].text;
      }
  }

  changeControlText = (e) => {
      const { target } = e;

      let newControls = this.state.controlsArr;
      newControls[this.state.selectControl].text = target.value;

      this.setState(state => ({
          ...state,
          controlsArr: newControls,
        }));
  }

  setFontSize = () => {
      if (this.state.selectControl === -1 || this.state.controlsArr[this.state.selectControl].control_type === "container") {
          return ""
      }
      else {
          return this.state.controlsArr[this.state.selectControl].font_size;
      }
  }

  changeFontSize = (e) => {
      const { target } = e;

      let newControls = this.state.controlsArr;
      newControls[this.state.selectControl].font_size = Number(target.value);

      this.setState(state => ({
          ...state,
          controlsArr: newControls,
        }));
  }

  setColor = (color_type) => {
      if (this.state.selectControl === -1) {
          return "#000";
      }
      else {
          if (color_type === "text" && this.state.controlsArr[this.state.selectControl].control_type !== "container") {
              return this.state.controlsArr[this.state.selectControl].text_color;
          }
          else {
              if (color_type === "background") {
                  return this.state.controlsArr[this.state.selectControl].background_color;
              }
              else {
                  return this.state.controlsArr[this.state.selectControl].border_color;
              }
          }
      }
  }

  changeColor = (color, color_type) => {
      let newControls = this.state.controlsArr;

      if (color_type === "text") {
          newControls[this.state.selectControl].text_color = color.hex;

          this.setState(state => ({
              ...state,
              controlsArr: newControls,
          }));
      }

      if (color_type === "background") {
          newControls[this.state.selectControl].background_color = color.hex;

          this.setState(state => ({
              ...state,
              controlsArr: newControls,
          }));
      }
      
      if (color_type === "border") {
          newControls[this.state.selectControl].border_color = color.hex;

          this.setState(state => ({
              ...state,
              controlsArr: newControls,
          }));
      }
  }

  setBorderThickness = () => {
      if (this.state.selectControl === -1) {
          return ""
      }
      else {
          return this.state.controlsArr[this.state.selectControl].border_thickness;
      }
  }

  changeBorderThickness = (e) => {
      const { target } = e;

      let newControls = this.state.controlsArr;
      newControls[this.state.selectControl].border_thickness = Number(target.value);

      this.setState(state => ({
          ...state,
          controlsArr: newControls,
        }));
  }

  setBorderRadius = () => {
      if (this.state.selectControl === -1) {
          return ""
      }
      else {
          return this.state.controlsArr[this.state.selectControl].border_radius;
      }
  }

  changeBorderRadius = (e) => {
      const { target } = e;

      let newControls = this.state.controlsArr;
      newControls[this.state.selectControl].border_radius = Number(target.value);

      this.setState(state => ({
          ...state,
          controlsArr: newControls,
        }));
    }

    
    render() {
        const close = <button id="close" onClick={this.close}>Close</button>;
        const trigger = <button id="trig">Close</button>;
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        const height = this.props.wireframe.height;
        const width = this.props.wireframe.width;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="card z-depth-0 wireframer">
                <div className="input-field">
                    <label htmlFor="email" className="active">Name:</label>
                    <input type="text" name="name" id="name" onChange={this.handleNameChange} defaultValue={wireframe.name} />
                </div>
                <div className = "wireframeEditor">

                  <div className = "wireframeFinalize">
                    <img className = "zoom" src = {zoomIn}/>
                    <img className = "zoom" src = {zoomOut} />
                    <button disabled={!this.state.madeChange} onClick={this.handleSave}>Save</button>
                    {
                      this.state.madeChange ? 
                      <Modal header="Unsaved Changes" trigger={this.state.madeChange ? trigger : null}>
                        You have unsaved changes
                        <button className="btn green lighten-1 z-depth-0" onClick={this.saveModal}>Save Changes</button>
                        <button className="btn pink lighten-1 z-depth-0" onClick={this.close}>Close Without Saving</button>
                      </Modal> 
                      : close
                    }
                  </div>

                  <div>
                    <div>Height: <input type="number" id="updatedHeight" defaultValue={height} onChange={this.handleDimension}></input></div>
                    <div>Width: <input type="number" id="updatedWidth" defaultValue={width} onChange={this.handleDimension}></input></div>
                    <button id="updateButton" disabled={!this.state.dimensionChange} onClick={this.handleUpdateDimensions}>Update Dimensions</button>
                  </div>

                  <div>
                    <button onClick={() => this.addControl("container")}><div className = "container_wireframe"></div></button>
                    <div>Container </div>
                  </div>

                  <div>
                    <button onClick={() => this.addControl("label")}><label>Label</label></button>
                    <div>Label </div>
                  </div>

                  <div>
                    <button onClick={() => this.addControl("button")}>ADD BUTTON</button>
                    <div>Button </div>
                  </div>

                  <div>
                    <button onClick={() => this.addControl("textfield")}> <input type = "text"></input> </button>
                    <div>Textfield </div>
                  </div>

                  <div></div>

                </div>

                <div className = 'canvasContainer'>
                    <div id="wireframeCanvas" className="wireframeCanvas" onClick={(e) => this.selectControl(e, -1)}>
                        {this.state.controlsArr.map((control, index) => (
                        <Control 
                            index = {index} 
                            control = {control}
                            selectControl={this.selectControl}
                            repositionControl={this.repositionControl}
                            resizeControl={this.resizeControl}/>
                        ))}
                    </div>
                </div>

                <div className = "controls">
                    <div>Properties </div><br />
                    <div> Text: <input value={this.setTextValue()} onChange={this.changeControlText} type="text"></input></div><br />
                    <div> Font Size: <input value={this.setFontSize()} onChange={this.changeFontSize} type="number"></input></div><br />
                    <div> Font Color: <SketchPicker color={this.setColor("text")} onChange={(color) => this.changeColor(color, "text")} className="color-picker" /></div><br />
                    <div> Background: <SketchPicker color={this.setColor("background")} onChange={(color) => this.changeColor(color, "background")} className="color-picker" /></div><br />
                    <div> Border Color: <SketchPicker color={this.setColor("border")} onChange={(color) => this.changeColor(color, "border")} className="color-picker" /></div><br />
                    <div> Border Thickness: <input value={this.setBorderThickness()} onChange={this.changeBorderThickness} type="number"></input></div><br />
                    <div> Border Radius: <input value={this.setBorderRadius()} onChange={this.changeBorderRadius} type="number"></input></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    const wireframes = state.firebase.profile.wireframes;
    const wireframe = wireframes ? wireframes[id] : null;
    if(wireframe)
      wireframe.id = id;
  
    return {
      wireframe,
      wireframes,
      id,
      profile: state.firebase.auth,
      auth: state.firebase.auth,
    };
};
  
const mapDispatchToProps = dispatch => ({
    save: (profile, wireframe, firebase) => dispatch(saveHandler(profile, wireframe, firebase)),
    goHome: (profile, wireframe, firebase) => dispatch(goHomeHandler(profile, wireframe, firebase))
});
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'users' },
    ]),
)(ListScreen);
  