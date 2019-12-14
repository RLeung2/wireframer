import React from 'react'
import { connect } from 'react-redux';
import todoJson from './TestTodoListData1.json'
import { getFirestore } from 'redux-firestore';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        const { firebase } = this.props;
        fireStore.collection('users').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("clearing " + doc.id);
                fireStore.collection('users').doc(doc.id).update({
                        wireframes: []
                    }).then(() => {
                        console.log("DATABASE RESET");
                    }).catch((err) => {
                        console.log(err);
                    });
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        const { firebase } = this.props;
        fireStore.collection('users').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("clearing " + doc.id);
                todoJson.users.forEach(todoListJson => {
                    if(doc.data().email === todoListJson.email){
                        fireStore.collection('users').doc(doc.id).update({
                                firstName: todoListJson.firstName,
                                lastName: todoListJson.lastName,
                                initials: todoListJson.initials,
                                password: todoListJson.password,
                                isAdmin: todoListJson.isAdmin, 
                                wireframes: todoListJson.wireframes,
                            }).then(() => {
                                console.log("DATABASE RESET");
                            }).catch((err) => {
                                console.log(err);
                            });
                    }
                });
            })
        });
    }


    render() {
        const { profile } = this.props;
        if(profile.isAdmin){
            return (
                <div>
                    <button onClick={this.handleClear}>Clear Database</button>
                    <button onClick={this.handleReset}>Reset Database</button>
                </div>)
        }else{
            return(
                <div>
                    THAT'S FUNNY, YOU'RE NOT AND ADMIN!
                </div>
            )
        }
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase,
        profile: state.firebase.profile,
    };
}

export default connect(mapStateToProps)(DatabaseTester);