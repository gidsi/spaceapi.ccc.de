import PropTypes from 'prop-types';
import request from 'superagent';
import { createAction, handleActions } from 'redux-actions';
import config from '../../api/config';

export const serviceElementStruct = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
});
export const itemsStruct = PropTypes.arrayOf(serviceElementStruct);
export const serviceStruct = PropTypes.shape({
  items: itemsStruct,
});

const SERVICES_FETCHED = 'SERVICES_FETCHED';

export const fetched = createAction(SERVICES_FETCHED, result => result);

export const fetchServices = () => (dispatch) => {
  request
    .get(`${config.api.url}/services`)
    .set('Content-Type', 'application/json')
    .end(
      (err, res) => {
        if (!err) {
          dispatch(fetched(res.body));
        }
      }
    );
};

export const actions = {
    fetchServices,
};

export default handleActions({
  [SERVICES_FETCHED]: (state, { payload }) => (
    {
      ...state,
      items: payload,
    }
  ),
}, { items: [] });
