import PropTypes from 'prop-types';
import request from 'superagent';
import { createAction, handleActions } from 'redux-actions';
import config from '../../api/config';

export const itemStruct = PropTypes.shape({
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  validated: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number.isRequired,
});
export const spaceUrlStruct = PropTypes.shape({
  items: PropTypes.arrayOf(itemStruct),
});

const SPACEURL_FETCHED = 'SPACEURL_FETCHED';
const SPACEURL_VALIDATE = 'SPACEURL_VALIDATE';
const SPACEURL_DELETE = 'SPACEURL_DELETE';

export const fetched = createAction(SPACEURL_FETCHED, result => result);
export const validate = createAction(SPACEURL_VALIDATE, result => result);
export const deleteSpace = createAction(SPACEURL_DELETE, result => result);

export const fetchSpaceUrl = () => (dispatch) => {
  request
    .get(`${config.api.url}/urls`)
    .set('Content-Type', 'application/json')
    .end(
      (err, res) => {
        if (!err) {
          dispatch(fetched(res.body));
        }
      }
    );
};

export const validateSpaceUrl = (spaceUrl, secret) => (dispatch) => {
  request
    .put(`${config.api.url}/urls/${secret}`)
    .send(spaceUrl)
    .set('Content-Type', 'application/json')
    .end(
      (err) => {
        if (!err) {
          dispatch(validate(spaceUrl));
        }
      }
    );
};

export const deleteSpaceUrl = (spaceUrlId, secret) => (dispatch) => {
  request
    .delete(`${config.api.url}/urls/${spaceUrlId}/${secret}`)
    .set('Content-Type', 'application/json')
    .end(
      (err) => {
        if (!err) {
          dispatch(deleteSpace(spaceUrlId));
        }
      }
    );
};

export const actions = {
  fetchSpaceUrl,
  validateSpaceUrl,
  deleteSpaceUrl,
};

export default handleActions({
  [SPACEURL_FETCHED]: (state, { payload }) => ({
    ...state,
    items: payload,
  }),
  [SPACEURL_VALIDATE]: (state, { payload }) => {
    const newState = {
      ...state,
    };

    newState.items.forEach(spaceUrl => ({
      ...spaceUrl,
      validated: spaceUrl.url === payload.url ? true : spaceUrl.validated,
    }));

    return newState;
  },
  [SPACEURL_DELETE]: (state, { payload }) => ({ items: state.items.filter(ele => ele.id === payload.id) }),
}, { items: [] });
