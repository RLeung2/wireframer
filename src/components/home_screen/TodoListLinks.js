import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';

class TodoListLinks extends React.Component {
    render() {
        const wireframes = this.props.wireframes;
        console.log(this.props);
        return (
            <div className="todo-lists section">
                {wireframes && wireframes.map(wireframe => (
                    <Link to={'/todoList/' + wireframe.id} key={wireframe.id}>
                        <TodoListCard wireframe={wireframe} />
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