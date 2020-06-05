import React from 'react';

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

const Home = () => (
  <>
    <h2>Home</h2>
    <Toggle />
  </>
);

export default Home;
