import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import addPartialBlogsAction from '../../../actions/partialBlogs/addPartialBlogs';
import PartialBlogsListComponent from '../../components/blog/PartialBlogsList';

class PartialBlogsList extends React.Component {
  componentDidMount() {
    const {
      partialBlogs: {
        loaded
      },
      addPartialBlogs,
    } = this.props;

    if (!loaded) {
      axios.get('/api/v1/partial-blogs/').then(({ data: { partialBlogs } }) => {
        addPartialBlogs(partialBlogs);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  render() {
    const {
      partialBlogs: {
        loaded,
        data: partialBlogs
      },
    } = this.props;

    return (
      <PartialBlogsListComponent loaded={loaded} partialBlogs={partialBlogs} />
    );
  }
}

PartialBlogsList.propTypes = {
  partialBlogs: PropTypes.shape({
    loaded: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      author: PropTypes.string,
      title: PropTypes.string,
      preview: PropTypes.string,
      createdAt: PropTypes.string,
    })),
  }).isRequired,
  addPartialBlogs: PropTypes.func.isRequired,
};

const mapStateToProps = ({ partialBlogs }) => ({
  partialBlogs
});

const mapDispatchToProps = dispatch => ({
  addPartialBlogs: partialBlogs => dispatch(addPartialBlogsAction(partialBlogs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PartialBlogsList);
