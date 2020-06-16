import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import initAuthorsAction from '../../../actions/authors/initAuthors';
import clearAuthorFilterAction from '../../../actions/authorFilter/clearAuthorFilter';
import updateAuthorFilterAction from '../../../actions/authorFilter/updateAuthorFilter';
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
      authorFilter: {
        userId,
      },
      clearAuthorFilter,
      updateAuthorFilter,
    } = this.props;

    return (
      <AuthorsListComponent
        loaded={loaded}
        authors={authors}
        filterUserId={userId}
        clearFilter={clearAuthorFilter}
        updateFilter={updateAuthorFilter}
      />
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
  authorFilter: PropTypes.shape({
    isFilterOn: PropTypes.bool,
    userId: PropTypes.string,
  }).isRequired,
  initAuthors: PropTypes.func.isRequired,
  clearAuthorFilter: PropTypes.func.isRequired,
  updateAuthorFilter: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authors, authorFilter }) => ({
  authors,
  authorFilter
});

const mapDispatchToProps = dispatch => ({
  initAuthors: authors => dispatch(initAuthorsAction(authors)),
  clearAuthorFilter: () => dispatch(clearAuthorFilterAction()),
  updateAuthorFilter: userId => dispatch(updateAuthorFilterAction(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsList);
