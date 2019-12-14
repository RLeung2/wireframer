import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks';
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore';
import uuid from 'uuid';

class HomeScreen extends Component {
    createNewWireframe = () => {
        console.log("home screen, uid is");
        console.log(this.props.auth.uid);

        const fireStore = getFirestore();
        const ref = fireStore.collection('users').doc(this.props.auth.uid);
        const history = this.props.history;
        ref.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data().wireframes);
                var wireframes = doc.data().wireframes;
                var new_wireframe = {
                    "key": uuid.v4(),
                    "name": "Unknown",
                    "height": "3500",
                    "width": "3500",
                    "zoom": 1,
                    "created": new Date(),
                    "controls": []
                }
                wireframes.unshift(new_wireframe);
                fireStore.collection('users').doc(doc.id).update({
                    wireframes: wireframes
                }).then(() => {
                    console.log("Added a new wireframe");
                    history.push('/wireframe/0')
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

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.createNewWireframe}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'users' },
    ]),
)(HomeScreen);