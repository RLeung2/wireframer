import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';

class TodoListLinks extends React.Component {
    render() {
        const wireframes = this.props.wireframes;
        console.log(wireframes);
        return (
            <div className="todo-lists section">
                {wireframes && wireframes.map((wireframe, index) => (
                    <Link to={'/wireframe/' + index} key={index}>
                        <TodoListCard wireframe={wireframe} id={index}/>
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firebase.profile.wireframes,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);