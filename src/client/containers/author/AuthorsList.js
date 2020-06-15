import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import initAuthorsAction from '../../../actions/authors/initAuthors';
import AuthorsListComponent from '../../components/author/AuthorsList';

class AuthorsList extends React.Component {
  componentDidMount() {
    const {
      authors: {
        loaded
      },
      initAuthors,
    } = this.props;

    if (!loaded) {
      axios.get('/api/v1/authors/').then(({ data: { authors } }) => {
        initAuthors(authors);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  render() {
    const {
      authors: {
        loaded,
        data: authors
      },
    } = this.props;

    return (
      <AuthorsListComponent loaded={loaded} authors={authors} />
    );
  }
}

AuthorsList.propTypes = {
  authors: PropTypes.shape({
    loaded: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      display_name: PropTypes.string,
      photo_URL: PropTypes.string,
    })),
  }).isRequired,
  initAuthors: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authors }) => ({
  authors
});

const mapDispatchToProps = dispatch => ({
  initAuthors: authors => dispatch(initAuthorsAction(authors)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsList);
