import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { serviceStruct } from '../redux/modules/services';
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

const formatType = type => {
  if (type.indexOf("[") === 0) {
    return type.substring(type.indexOf(" ") + 1, type.length - 1);
  }
  return type;
}

export class ServiceList extends React.Component {
  static propTypes = {
    fetchServices: PropTypes.func.isRequired,
    services: serviceStruct,
  };

  static defaultProps = {
    services: {
      items: [],
    },
  };

  componentWillMount() {
    this.props.fetchServices();
  }

  render() {
    const items = this.props.services.items.sort(
      (a, b) => formatType(a.type).toUpperCase().localeCompare(formatType(b.type).toUpperCase())
    );
    return (
      <div style={{ paddingTop:'60px' }}>
        <Table>
          <TableBody>
            {items
              .map((service, index) => (
                <TableRow key={service.name} className={classNames({
                  [this.props.classes.tableRowEven]: index % 2
                })} >
                  <TableCell style={{ color: '#fff', border: 0 }}>
                    {service.name}
                  </TableCell>
                  <TableCell style={{ color: '#fff', border: 0 }}>
                      {formatType(service.type)}
                  </TableCell>
                  <TableCell style={{ color: '#fff', border: 0 }}>
                    <a
                        href={service.url}
                        style={{ textDecoration: 'none', color: 'white' }}
                    >
                      {service.url}
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

export default withStyles(styles)(ServiceList);
