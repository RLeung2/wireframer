import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { Modal, Button } from 'react-materialize';
import { deleteListHandler } from '../../store/database/asynchHandler'
import { sortByTaskHandler } from '../../store/database/asynchHandler'
import { sortByDueDateHandler } from '../../store/database/asynchHandler'
import { sortByStatusHandler } from '../../store/database/asynchHandler'
import { moveUpHandler } from '../../store/database/asynchHandler'
import { moveDownHandler } from '../../store/database/asynchHandler'
import { deleteItemHandler } from '../../store/database/asynchHandler'
import { moveListToTop, editListNameAndOwner } from '../../store/actions/actionCreators';

const trigger = <h1 className="list-trash">&#128465;</h1>;

class ListScreen extends Component {
    state = {
        name: this.props.todoList === undefined ? '' : this.props.todoList.name,
        owner: this.props.todoList === undefined ? '' : this.props.todoList.owner,
        sortingCriteria: '',
    }

    componentDidMount = () => {
        if (this.props.todoList) {
            this.props.moveListToTop(this.props.todoList.id);
        }
        else {
            this.props.history.push("/");
        }
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
        }), () => {
            // callback to action creator
            this.props.editListNameAndOwner(this.props.todoList, this.state);
        });
    }


    handleSortByTask = () => {
        const { props, state } = this;
        const { firebase } = props;
        const todoList = this.props.todoList;
        var items = todoList.items;

        if (this.state.sortingCriteria === "taskIncreasing") {
            this.setState({sortingCriteria: "taskDecreasing"})
        }
        else {
            this.setState({sortingCriteria: "taskIncreasing"})
        }

        let sortedItems = items.sort(this.compare);
  
        props.sortByTask(todoList, firebase, sortedItems);
    }

    handleSortByDueDate = () => {
        const { props, state } = this;
        const { firebase } = props;
        const todoList = this.props.todoList;
        var items = todoList.items;

        if (this.state.sortingCriteria === "dueDateIncreasing") {
            this.setState({sortingCriteria: "dueDateDecreasing"})
        }
        else {
            this.setState({sortingCriteria: "dueDateIncreasing"})
        }

        let sortedItems = items.sort(this.compare);
  
        props.sortByDueDate(todoList, firebase, sortedItems);
    }

    handleSortByStatus = () => {
        const { props, state } = this;
        const { firebase } = props;
        const todoList = this.props.todoList;
        var items = todoList.items;

        if (this.state.sortingCriteria === "statusIncreasing") {
            this.setState({sortingCriteria: "statusDecreasing"})
        }
        else {
            this.setState({sortingCriteria: "statusIncreasing"})
        }

        let sortedItems = items.sort(this.compare);
  
        props.sortByStatus(todoList, firebase, sortedItems);
    }

    compare = (item1, item2) => {
        let criteria = this.state.sortingCriteria
        if ( (criteria === "taskDecreasing") || (criteria === "dueDateDecreasing") || (criteria === "statusDecreasing") ) {
            let temp = item1;
            item1 = item2;
            item2 = temp;
        }
      
        if ( (criteria === "taskDecreasing") || (criteria === "taskIncreasing") ) {
            if (item1.description < item2.description)
                return -1;
            else if (item1.description > item2.description)
                return 1;
            else
                return 0;
        }
      
        else if ( (criteria === "dueDateDecreasing") || (criteria === "dueDateIncreasing") ) {
            let dueDate1 = item1.due_date
            let dueDate2 = item2.due_date
            let date1 = new Date(dueDate1)
            let date2 = new Date(dueDate2)
            if (date1 < date2)
                return -1;
            else if (date1 > date2)
                return 1;
            else
                return 0;
        }
      
        else {
            if (item1.completed < item2.completed)
                return -1;
            else if (item1.completed > item2.completed)
                return 1;
            else
                return 0;
        }
    }

    handleMoveUp = (index, event) => {
        event.preventDefault();

        const { props, state } = this;
        const { firebase } = props;
        const todoList = this.props.todoList;
        var items = todoList.items;

        if ((0 < index) && (index < items.length)) {
            let newListItems = items;
            let temp = newListItems[index];
            newListItems[index] = newListItems[index-1];
            newListItems[index-1] = temp;

            props.moveUp(todoList, firebase, newListItems);
        }
    }

    handleMoveDown = (index, event) => {
        event.preventDefault();

        const { props, state } = this;
        const { firebase } = props;
        const todoList = this.props.todoList;
        var items = todoList.items;

        if ((items.length > 1) && (index < items.length-1)) {
            let newListItems = items
            let temp = newListItems[index]
            newListItems[index] = newListItems[index+1]
            newListItems[index+1] = temp

            props.moveDown(todoList, firebase, newListItems);
        }
    }

    handleDeleteItem = (key, event) => {
        event.preventDefault();

        const { props, state } = this;
        const { firebase } = props;
        const todoList = this.props.todoList;
        var items = todoList.items;

        let newListItems = [...items.filter(item => item.key !== key)];
        props.deleteItem(todoList, firebase, newListItems);
    }

    render() {
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
    sortByTask: (todoList, firebase, sortingCriteria) => dispatch(sortByTaskHandler(todoList, firebase, sortingCriteria)),
    sortByDueDate: (todoList, firebase, sortingCriteria) => dispatch(sortByDueDateHandler(todoList, firebase, sortingCriteria)),
    sortByStatus: (todoList, firebase, sortingCriteria) => dispatch(sortByStatusHandler(todoList, firebase, sortingCriteria)),
    moveUp: (todoList, firebase, newListItems) => dispatch(moveUpHandler(todoList, firebase, newListItems)),
    moveDown: (todoList, firebase, newListItems) => dispatch(moveDownHandler(todoList, firebase, newListItems)),
    deleteItem: (todoList, firebase, newListItems) => dispatch(deleteItemHandler(todoList, firebase, newListItems)),
    moveListToTop: (id) => dispatch(moveListToTop(id)),
    editListNameAndOwner: (todoList, state) => dispatch(editListNameAndOwner(todoList, state))
  });

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'todoLists'},
  ]),
)(ListScreen);