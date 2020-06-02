import React from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';

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

const Root = ({ route }) => (
  <div>
    <h1>Root</h1>
    <Toggle />
    {renderRoutes(route.routes)}
  </div>
);

Root.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.array.isRequired,
  }).isRequired,
};

export default Root;
