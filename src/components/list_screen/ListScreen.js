import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import zoomIn from '../../images/zoomin.png';
import zoomOut from '../../images/zoomout.png';
import Canvas from './Canvas.js';
import { saveHandler } from '../../store/database/asynchHandler';
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore';


class ListScreen extends Component {
    state = {
        controlsArr: JSON.parse(JSON.stringify(this.props.wireframe.controls)),
        height: '',
        width: '',
        name: '',
        selectedControl: -1,
        name: this.props.wireframe === undefined ? '' : this.props.wireframe.name
    }  

    componentDidMount() {
        console.log("MOUNT: \n");
        console.log(this.state);
        document.addEventListener('keydown', this.keysHandler);

        const { id } = this.props;
        if(id != 0) {
            // move to top
            const fireStore = getFirestore();
            const ref = fireStore.collection('users').doc(this.props.auth.uid);
            ref.get().then(function(doc) {
                if (doc.exists) {
                    console.log("Document data:", doc.data().wireframes);
                    var wireframes = doc.data().wireframes;
                    console.log("index to prepend is " + id);
                    const temp = wireframes[id];
                    wireframes.splice(id, 1);
                    wireframes.unshift(temp);
                    fireStore.collection('users').doc(doc.id).update({
                        wireframes: wireframes
                    }).then(() => {
                        console.log("Added a new wireframe");
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
        var height = document.getElementById("height");
        var width = document.getElementById("width");
        var { wireframe } = this.props;
        height.value = wireframe.height;
        width.value = wireframe.width;

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
                console.log("da name is " + wireframes[id].name);
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
  

    handleSave = (e) => {
        e.preventDefault();
  
        const { props } = this;
        const { firebase, profile } = props;
        const { wireframes } = this.props;
        wireframes[props.wireframe.id].controls = this.state.controlsArr;
        props.save(profile, wireframes, firebase);
    }

    keysHandler = (event) => {
        console.log("HANDLER: \n");
        console.log(this.state);
        event.stopImmediatePropagation();
        if(event.keyCode === 68 && event.ctrlKey){
            event.preventDefault();
            this.copyControl(this.state.selectedControl);
        }else if(event.keyCode === 46){
            event.preventDefault();
            this.deleteControl(this.state.selectedControl);
        }
    }

    copyControl = (index) => {
        if(index !== -1){
          var controlDupe = this.state.controlsArr[index];
          controlDupe.posX -= 100;
          controlDupe.posY -= 100;
          if(controlDupe.posX < 0){
            controlDupe.posX = 0;
          }
          if(controlDupe.posY < 0){
            controlDupe.posX = 0;
          }
          var controlArrNew = this.state.controlsArr;
          controlArrNew.push(controlDupe);
          this.setState(state => ({
            ...state,
            controlsArr: controlArrNew
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
            selectedControl: -1
          }));
        }
    }

    selectControl = (event, index) => {
        console.log(this.state);
        event.stopPropagation();
        this.setState(state => ({
          ...state,
          selectedControl: index
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
          borderRadius: 0 
        }
        var controlsArrNew = this.state.controlsArr;
        controlsArrNew.push(control);
        this.setState(state => ({
          ...state,
          controlsArr: controlsArrNew
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
          controlsArr: controlsArrNew
        }));
    }
  
    resizeControl = (index, width, height) => {
        var controlsArrNew = this.state.controlsArr;
        var control = this.state.controlsArr[index];
        control.width = width;
        control.height = height;
        controlsArrNew[index] = control;
        this.setState(state => ({
          ...state,
          controlsArr: controlsArrNew
        }));
    }
    
    render() {
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="card z-depth-0 wireframer">
                <div className="input-field">
                    <label htmlFor="email" className="active">Name:</label>
                    <input type="text" name="name" id="name" onChange={this.handleChange} defaultValue={wireframe.name} />
                </div>
                <div className = "wireframeEditor">

                  <div className = "wireframeFinalize">
                    <img className = "zoom" src = {zoomIn}/>
                    <img className = "zoom" src = {zoomOut} />
                    <button onClick={this.handleSave}>Save</button>
                    <button>Close</button>
                  </div>

                  <div>
                    <div>Height: <input type="number" id="height"></input></div>
                    <div>Width: <input type="number" id="width"></input></div>
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
                    <Canvas 
                        controlsArr={this.state.controlsArr}
                        selectControl={this.selectControl} 
                        repositionControl={this.repositionControl}
                        resizeControl={this.resizeControl}
                    >
                    </Canvas>
                </div>

                <div className = "controls">
                  <div> Properties: </div>
                  <div> Font Size: <input type="number"></input></div>
                  <div> Font Color: <input type="color"></input></div>
                  <div> Background Color: <input type="color"></input></div>
                  <div> Border Color: <input type="color"></input></div>
                  <div> Border Thickness: <input type="number"></input></div>
                  <div> Border Radius: <input type="number"></input></div>
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
});
  
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'users' },
    ]),
)(ListScreen);
  