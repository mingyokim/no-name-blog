import { connect } from 'react-redux';
import Navbar from '../../components/writer/Navbar';

const mapStateToProps = ({ author }) => ({
  author
});

export default connect(mapStateToProps)(Navbar);
