import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import { spacedataStruct } from '../redux/modules/spacedata';

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
              .map(space => (
                <TableRow key={space.space}>
                  <TableCell style={{ color: '#fff' }}>
                    {space.space}
                  </TableCell>
                  <TableCell>
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

export default SpaceList;
