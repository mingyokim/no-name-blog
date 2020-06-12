import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
  render() {
    const { partialBlogs } = this.props;
    return (
      <>
        <h2>Home</h2>
        <Link to="writer">Go to writer</Link>
        <Toggle />
        <p>{partialBlogs[0].id}</p>
      </>
    );
  }
}

const mapStateToProps = ({ partialBlogs }) => ({
  partialBlogs
});

export default connect(mapStateToProps)(Home);
