import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { addItemHandler } from '../../store/database/asynchHandler'

class ItemScreen extends Component {
  state = {
    description: this.props.todoItem.description,
    assigned_to: this.props.todoItem.assigned_to,
    due_date: this.props.todoItem.due_date,
    completed: this.props.todoItem.completed,
    key: this.props.todoItem.key,
  }

  cancelItemChange = () => {
      const todoList = this.props.todoList;
      this.props.history.push("/todoList/" + todoList.id);
  }

  handleChange = (e) => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value,
    }));
  }

  handleCheckChange = (e) => {
    const { target } = e;
    console.log(target.checked);

    this.setState(state => ({
      ...state,
      [target.id]: target.checked,
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { props, state } = this;
    const { firebase } = props;
    const newItem = { ...state };
    var todoList = this.props.todoList;
    const { itemid } = props;

    if(itemid === todoList.length){
      todoList.items.push(newItem);
      props.addItem(todoList, firebase);
    }else{
      todoList.items[itemid] = newItem;
      props.addItem(todoList, firebase);
    }    
    this.props.history.push("/todoList/" + todoList.id);
  }

  getBoxValue = (identifier) =>{
    const { props, state } = this;
    switch(identifier) {
      case "description" :
        return this.state.description;
      case "assigned_to":
        return this.state.assigned_to;
      case "due_date":
        return this.state.due_date;
      case "checked":
        if(this.state.completed)
          return true
        else
          return false
      default:
        return "";
    }
  }

  render() {
    const { auth } = this.props;
    if (!auth.uid) {
        return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Item</h5>
          <div className="input-field">
            <label className="active" htmlFor="description">Description</label>
            <input type="text" name="description" id="description" defaultValue = {this.getBoxValue("description")} onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label className="active" htmlFor="assigned_to">Assigned To</label>
            <input type="text" name="assigned_to" id="assigned_to" defaultValue = {this.getBoxValue("assigned_to")} onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label className="active" htmlFor="due_date">Due Date</label>
            <input type="date" name="due_date" id="due_date" defaultValue = {this.getBoxValue("due_date")}onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <p>
              <label>
                <input type="checkbox" id = "completed" checked = {this.getBoxValue("checked")} onChange={this.handleCheckChange} />
                <span>Completed</span>
              </label>
            </p>
          </div>
          <div className="input-field">
            <button type="submit" className="btn pink lighten-1 z-depth-0">Submit Change</button>
            <button className="btn pink lighten-1 z-depth-0" onClick={this.cancelItemChange}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    const { listid } = ownProps.match.params;
    const { itemid } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[listid] : null;

    if(todoList){
      todoList.id = listid;
      var todoItem;
      if(Number(itemid) === todoList.items.length){
        todoItem = {
          description: '',
          assigned_to: '',
          due_date: 'EMPTY',
          completed: false,
          key: 400,
        };
      }else{
        todoItem = todoList.items[itemid];
      }
    }

    return {
      todoList,
      itemid,
      todoItem,
      auth: state.firebase.auth,
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    addItem: (todoList, firebase) => dispatch(addItemHandler(todoList, firebase)),
  });
  
  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
)(ItemScreen);
