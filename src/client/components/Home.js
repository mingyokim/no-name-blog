import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import addPartialBlogsAction from '../../actions/addPartialBlogs';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { on: false };
  }

  render() {
    const { on } = this.state;

    const toggle = () => {
      // const { on } = this.state;
      this.setState({ on: !on });
    };

    if (on) {
      return (
        <>
          <button onClick={toggle}>Button</button>
          <p>on</p>
        </>
      );
    }
    return (
      <>
        <button onClick={toggle}>Button</button>
        <p>off</p>
      </>
    );
  }
}

// const Home = () => (
//   <>
//     <h2>Home</h2>
//     <Link to="writer">Go to writer</Link>
//     <Toggle />
//   </>
// );

class Home extends React.Component {
  componentDidMount() {
    const {
      partialBlogs,
      partialBlogs: {
        loaded
      },
      addPartialBlogs
    } = this.props;

    if (!loaded) {
      axios.get('/api/v1/partial-blogs/').then(({ data: { partialBlogs: newPartialBLogs } }) => {
        addPartialBlogs(newPartialBLogs);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  render() {
    const {
      partialBlogs: {
        data
      }
    } = this.props;
    return (
      <>
        <h2>Home</h2>
        <Link to="writer">Go to writer</Link>
        <Toggle />
        {data.map(({ id }) => (<p key={id}>{id}</p>))}
      </>
    );
  }
}

const mapStateToProps = ({ partialBlogs }) => ({
  partialBlogs
});

const mapDispatchToProps = dispatch => ({
  addPartialBlogs: partialBlogs => dispatch(addPartialBlogsAction(partialBlogs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
