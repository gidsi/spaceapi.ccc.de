import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { spacedataStruct } from '../redux/modules/spacedata';
import {withStyles} from "@material-ui/core";

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
  tableRow: {},
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[600],
    },
  },
  tableRowEven: {
    backgroundColor: theme.palette.grey[700],
  },
  tableCell: {
    flex: 1,
    color: '#fff',
    border: 0,
  },
  noClick: {
    cursor: 'initial',
  },
});

export class SpaceList extends React.Component {
  static propTypes = {
    fetchSpacedata: PropTypes.func.isRequired,
    spacedata: spacedataStruct,
  };

  static defaultProps = {
    spacedata: {
      items: [],
    },
  };

  componentWillMount() {
    this.props.fetchSpacedata();
  }

  render() {
    const items = this.props.spacedata.items.sort(
      (a, b) => a.space.toUpperCase().localeCompare(b.space.toUpperCase())
    );
    return (
      <div style={{ paddingTop:'60px' }}>
        <Table>
          <TableBody>
            {items
              .map((space, index) => (
                <TableRow key={space.space} className={classNames({
                  [this.props.classes.tableRowEven]: index % 2
                })} >
                  <TableCell style={{ color: '#fff', border: 0 }}>
                    {space.space}
                  </TableCell>
                  <TableCell style={{ border: 0 }}>
                    <a
                      href={space.url}
                      style={{ textDecoration: 'none', color: 'white' }}
                    >
                      {space.url}
                    </a>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(SpaceList);
