import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';
import { goHome } from '../../store/actions/actionCreators';

class Navbar extends React.Component {

  // add onClick = {this.handleGoHome} to @todo Link
  handleGoHome = (e) => {
    this.props.goHome();
  }

  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;

    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to="/" className="brand-logo" onClick={this.handleGoHome}>@todo</Link>
          {links}
        </div>
      </nav>
    );
  };
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

const mapDispatchToProps = dispatch => {
  return {
      goHome: () => dispatch(goHome())
  }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(Navbar);