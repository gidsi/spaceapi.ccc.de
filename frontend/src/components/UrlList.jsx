import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { spaceUrlStruct } from '../redux/modules/spaceurl';

export class UrlList extends React.Component {
  static propTypes = {
    fetchSpaceUrl: PropTypes.func.isRequired,
    validateSpaceUrl: PropTypes.func.isRequired,
    deleteSpaceUrl: PropTypes.func.isRequired,
    spaceurls: spaceUrlStruct,
  };

  static defaultProps = {
    spaceurls: {
      items: [],
    },
  };

  componentWillMount() {
    this.props.fetchSpaceUrl();
  }

  getFormatedDateTime = timestamp => (
    moment
      .unix(timestamp)
      .format('DD.MM.YYYY HH:mm')
  );

  validateSpaceUrl = (spaceUrl) => {
    const validatedSpaceUrl = {
      url: spaceUrl.url,
      validated: true,
    };
    this.props.validateSpaceUrl(validatedSpaceUrl, this.state.secret);
  };

  deleteSpaceUrl = (spaceUrl) => {
    this.props.deleteSpaceUrl(spaceUrl.id, this.state.secret);
  };

  render() {
    return (
      <div>
        <Table>
          <TableBody>
            {this.props.spaceurls.items
              .map(spaceurl => (
                <TableRow key={spaceurl.url}>
                  <TableCell>
                    <a
                      href={spaceurl.url}
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      {spaceurl.url}
                    </a>
                  </TableCell>
                  <TableCell>
                    {this.getFormatedDateTime(spaceurl.lastUpdated)}
                  </TableCell>
                  <TableCell>
                    {!spaceurl.validated ? <Button
                      onClick={() => this.validateSpaceUrl(spaceurl)}
                      primary
                    >validated</Button> : null}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => this.deleteSpaceUrl(spaceurl)}
                      primary
                    >
                      delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
        <TextField
          name={'secret-input'}
          onChange={(event)=> this.setState({ secret: event.target.value })}
          ref={ref => (this.secretInput = ref)}
        />
      </div>
    );
  }
}

export default UrlList;
