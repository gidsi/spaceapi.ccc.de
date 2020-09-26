import { connect } from 'react-redux';
import { actions as serviceActions } from '../redux/modules/services';
import Component from '../components/ServiceList';

const mapStateToProps = state => ({
  services: state.services,
});

const mapDispatchToProps = {
  ...serviceActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
