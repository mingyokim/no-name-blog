import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import clearAuthorAction from '../../../actions/author/clearAuthor';

class Logout extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loggedOut: false,
  //   };
  // }

  componentDidMount() {
    const { clearAuthor, author } = this.props;

    if (author) {
      axios.post('/sessionLogout')
        .then(() => clearAuthor())
        .catch(err => console.log(err));
    }
  }

  render() {
    const { author } = this.props;

    if (!author) {
      return <Redirect to="/login" />;
    }

    return <p>Logging you out...</p>;
  }
}

Logout.propTypes = {
  clearAuthor: PropTypes.func.isRequired,
  author: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};

Logout.defaultProps = {
  author: null,
};

const mapStateToProps = ({ author }) => ({
  author,
});

const mapDispatchToProps = dispatch => ({
  clearAuthor: () => dispatch(clearAuthorAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
