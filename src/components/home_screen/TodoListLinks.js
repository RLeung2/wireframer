import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';
import { Modal, Button } from 'react-materialize';
import { deleteHandler } from '../../store/database/asynchHandler';

class TodoListLinks extends React.Component {
    handleDelete = (index, e) => {
        e.stopPropagation();
  
        const { props } = this;
        const { firebase, profile } = props;
        const { wireframes } = this.props;
        const history = this.props.history;
        wireframes.splice(index, 1);
        console.log(profile);
        props.delete(profile, wireframes, firebase);
        history.push('/login');
    }

    render() {
        const wireframes = this.props.wireframes;
        const del_button = <div className="card-delete-button">&#x274C;</div>;
        console.log(wireframes);
        return (
            <div className="wireframes section">
                <div className="wireframe-links-title">Recent Work</div>
                {wireframes && wireframes.map((wireframe, index) => (
                    <div>
                        <Link to={'/wireFrame/' + index} key={wireframe.id}>
                            <TodoListCard wireframe={wireframe} />
                        </Link>
                        
                        <Modal header="Unsaved Changes" trigger={del_button}>
                            Delete Wireframe?
                            <button className="btn green lighten-1 z-depth-0" onClick={this.handleDelete.bind(this, index)}>Yes</button>
                        </Modal> 
                        <br /><br /><br /><br />
                    </div>
                ))}
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(TodoListLinks);