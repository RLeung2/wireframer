import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
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
                <div className = "wireframeEditor">

                  <div className = "wireframeFinalize">

                    <button>Save</button>
                    <button>Close</button>
                  </div>

                  <div>
                    <div>Height: <input type="number"></input></div>
                    <div>Width: <input type="number"></input></div>
                  </div>

                  <div>
                    <button><div className = "container_wireframe"></div></button>
                    <div>Container </div>
                  </div>

                  <div>
                    <button><label>Label</label></button>
                    <div>Label </div>
                  </div>

                  <div>
                    <button><button>Button</button></button>
                    <div>Button </div>
                  </div>

                  <div>
                    <button> <input type = "text"></input> </button>
                    <div>Textfield </div>
                  </div>

                </div>

                <div className = "wireframeCanvas">
                  <div>
                  </div>
                </div>

                <div className = "controls">
                  <div>Properties: </div>
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
  const { wireframes } = state.firestore.data;
  const wireframe = wireframes ? wireframes[id] : null;
  //wireframe.id = id;

  return {
    wireframe,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'users' },
  ]),
)(ListScreen);