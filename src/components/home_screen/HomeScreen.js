import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { createTodoList } from '../../store/actions/actionCreators';
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore';
import uuid from 'uuid';

class HomeScreen extends Component {
    state = {
        name: 'Unknown',
        owner: 'Unknown',
        items: []
    }


    handleNewList = (e) => {
        e.preventDefault()
        this.props.createTodoList(this.state)

    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.id != "") {
            this.props.history.push('/todoList/' + this.props.id);
        }
    }

    createNewWireframe = () => {
        console.log("home screen, uid is");
        console.log(this.props.auth.uid);

        const fireStore = getFirestore();
        const ref = fireStore.collection('users').doc(this.props.auth.uid);
        ref.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data().wireframes);
                var wireframes = doc.data().wireframes;
                var new_wireframe = {
                    "key": uuid.v4(),
                    "name": "Unknown",
                    "height": "100%",
                    "width": "100%",
                    "zoom": 1,
                    "created": new Date(),
                    "controls": []
                }
                wireframes.unshift(new_wireframe);
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

        this.props.history.push('/wireframe/0')
    }



    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <br />
                        <h4 className="your_lists_heading">Your Lists</h4>
                        <TodoListLinks />
                    </div>
                    <div className="col s8">
                        <div className="banner right">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container right">
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
    console.log(state);
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
        id: state.todoList.id
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        createTodoList: (todoList) => dispatch(createTodoList(todoList))
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['created', 'desc'] },
    ]),
)(HomeScreen);