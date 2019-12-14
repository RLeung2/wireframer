import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';
import { Modal, Button } from 'react-materialize';
import { deleteHandler } from '../../store/database/asynchHandler';

class TodoListLinks extends React.Component {
    handleDeleteWireframe = (wireframe, e) => {
        e.preventDefault();
  
        const { props } = this;
        const { firebase, profile } = props;
        const { wireframes } = this.props;
        var index = 0;
        for (var i = 0; i < wireframes.length; i++)
        {
            if (wireframes[i] === wireframe)
            {
                index = i;
            }
        }
      wireframes.splice(index, 1);
      props.delete(profile, wireframes, firebase);
    }

    render() {
        const wireframes = this.props.wireframes;
        const del_button = <div className="card-delete-button">&#x274C;</div>
        console.log(wireframes);
        return (
            <div className="wireframes section">
                <div className="wireframe-links-title">Recent Work</div>
                {wireframes && wireframes.map((wireframe, index) => (
                    <div>
                        <Link to={'/wireFrame/' + index} key={wireframe.id}>
                            <TodoListCard wireframe={wireframe} />
                        </Link>
                        <Modal className = "modal_container" header="Hello User!" trigger={del_button}>
                            Delete Wireframe?<br /><br /><br />
                            <div className= "modal_text">Are you sure you want to delete this Wireframe?</div>
                            <div>If not, click the Close Button.</div>
                            <br /><br />
                            <button className = "waves-effect waves-green btn-flat blue lighten-3 modal_yes_button" onClick = {this.handleDeleteWireframe.bind(this, wireframe)}>
                                Yes
                            </button><br /><br />
                            
                            <div>The wireframe will not be retreivable.</div>
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