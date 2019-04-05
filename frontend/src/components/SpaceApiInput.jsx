import React from 'react';
import request from 'superagent';
import TextField from '@material-ui/core/TextField';
import FloatingActionButton from '@material-ui/core/Fab';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ContentAdd from '@material-ui/icons/AddOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import config from '../api/config';

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily,
    border: 0,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  snackbar: {
    backgroundColor: theme.palette.grey[700],
    width: '100%',
  },
});


class MuiSnackbarContent extends React.PureComponent {
  render() {
    console.log(this.props.classes);
    return (
      <SnackbarContent
        aria-describedby="client-snackbar"
        className={this.props.classes.snackbar}
        message={
          <div>
            <InfoIcon/>
            <div  style={{ paddingLeft: '10px', paddingTop: '3px', float: 'right' }} >
              Die URL wurde hinzugefuegt und befindet sich nun im review.
            </div>
          </div>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => this.setState({open: false})}
          >
            <CloseIcon/>
          </IconButton>,
        ]}
      />
    );
  }
}

MuiSnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
};
const MySnackbarContent = withStyles(styles)(MuiSnackbarContent);

class SpaceApiInput extends React.Component {
  static propTypes = {
    style: PropTypes.shape({}),
  };

  static defaultProps = {
    style: {},
  };

  state = {
    open: false
  };

  getStyle = () => ({
    formContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '40px',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '50px',
    },
    hint: {
      color: 'white',
      width: '100%',
      maxWidth: '550px',
      fontSize: '13px',
      textAlign: 'center',
    },
  });

  handleInputChange = (event) => {
    this.setState({ url: event.target.value, input: event.target });
  };

  handleButtonClick = () => {
    request
      .post(`${config.api.url}/urls`)
      .send({
        url: this.state.url,
      })
      .set('Content-Type', 'application/json')
      .end((err) => {
        if (!err) {
          this.spaceApiInput.value = '';
          this.setState({ open: true });
        }
      });
  };

  render() {
    const style = this.getStyle();
    return (
      <div style={style.container}>
        <p style={style.hint}>
          Trage die API-URL deines Hackerspaces hier ein und wir werden sie nach
          kurzer Prüfung freischalten. Bei Fragen oder Problemen wende dich an&nbsp;
          <a href={'mailto:lokal@ccc.de'} style={{ color: 'white', textDecoration: 'none' }}>
            {'lokal@ccc.de'}
          </a>.
        </p>
        <div style={style.formContainer}>
          <TextField
            placeholder={'https://example.com/yourspaceapi.json'}
            name={'spaceapi-input'}
            onChange={this.handleInputChange}
            inputRef={ref => (this.spaceApiInput = ref)}
            style={{ width: '100%', maxWidth: '340px' }}
          />
          <FloatingActionButton
            style={{ marginLeft: '20px' }}
            onClick={this.handleButtonClick}
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <Snackbar
          variant={'info'}
          open={this.state.open}
          autoHideDuration={4000}
          style={{ minWidth: '490px' }}
          onClose={() => this.setState({ open: false })}
        >
          <MySnackbarContent />
        </Snackbar>
      </div>
    );
  }
}

export default SpaceApiInput;
