import React from 'react';
import { deleteHandler } from '../../store/database/asynchHandler';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Modal, Button } from 'react-materialize';

class TodoListCard extends React.Component {
    handleDelete = (e) => {
        console.log("PLEEEEEASE");
        e.preventDefault();

        const { props } = this;
        const { firebase, profile } = props;
        const { wireframes } = this.props;
        wireframes.splice(this.props.id, 1);
        console.log(profile);
        props.delete(profile, wireframes, firebase);
    }

    render() {
        const { wireframe } = this.props;
        console.log("TodoListCard, todoList.id: " + wireframe.id);
        return (
            <div className="card z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{wireframe.name}</span>
                    <span onClick={this.handleDelete}>&#x274C;</span>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.auth,
        auth: state.firebase.auth,
        wireframes: state.firebase.profile.wireframes,
    };
};

const mapDispatchToProps = dispatch => ({
    delete: (profile, wireframe, firebase) => dispatch(deleteHandler(profile, wireframe, firebase)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(TodoListCard);