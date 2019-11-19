import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        const handleMoveUp = this.props.handleMoveUp;
        const handleMoveDown = this.props.handleMoveDown;
        const handleDeleteItem = this.props.handleDeleteItem;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                {items && items.map(function(item, index) {
                    item.id = item.key;
                    return (
                        <Link to={"/itemScreen/" + todoList.id + "/" + index}>
                            <ItemCard handleMoveUp={handleMoveUp} handleMoveDown={handleMoveDown} handleDeleteItem={handleDeleteItem} todoList={todoList} item={item} index={index}/>
                        </Link>
                    );})
                }
                <Link to={"/itemScreen/" + todoList.id + "/" + items.length}><div className = "list_item_add_card center-align">&#x002B;</div></Link>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists'},
    ]),
)(ItemsList);