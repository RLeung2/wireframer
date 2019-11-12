import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { Modal, Button } from 'react-materialize';
import { deleteListHandler } from '../../store/database/asynchHandler'

const trigger = <h1 className="">&#128465;</h1>;

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleDeleteList = (e) => {
        e.preventDefault();
  
        const { props, state } = this;
        const { firebase } = props;
        const todoList = this.props.todoList;
  
        props.deleteList(todoList, firebase);
        this.props.history.push("/");
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
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if(!todoList)
	        return <React.Fragment />

        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <Modal header="Modal Header" trigger={trigger}>
                    You wanna delete this bih?
                    <button onClick={this.handleDeleteList}>Yap</button>
                </Modal>

                <div className="input-field">
                    <label htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                <div id="list-items-container">
                    <div className="list_item_header_card">
                        <div className="list_item_task_header">
                            Task
                        </div>
                        <div className="list_item_due_date_header">
                            Due Date
                        </div>
                        <div className="list_item_status_header">
                            Status
                        </div>
                    </div>

                    <ItemsList todoList={todoList} />
                    <div className = "list_item_add_card center-align">
                        +
                    </div>

                </div>

                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;

  if(todoList)
	todoList.id = id;

  return {
    todoList,
    auth: state.firebase.auth,
  };
  
};

const mapDispatchToProps = dispatch => ({
    deleteList: (todoList, firebase) => dispatch(deleteListHandler(todoList, firebase)),
  });
  

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);