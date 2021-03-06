import React from 'react';
import PropTypes from 'prop-types';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import Marker from './Marker';
import { actions as spaceDataActions, spacedataStruct } from '../redux/modules/spacedata';

const mapStateToProps = state => ({
  spacedata: state.spacedata,
});

const mapDispatchToProps = {
  ...spaceDataActions,
};

class Map extends React.Component {
  static propTypes = {
    spacedata: spacedataStruct.isRequired,
    fetchSpacedata: PropTypes.func.isRequired,
    toggleFilterSpacedata: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchSpacedata();
  }

  render() {
    const centerGermany = [51.163375, 10.447683];
    return (
      <LeafletMap
        center={centerGermany}
        zoom={5}
        style={{ width: '100vw', height: 'calc(50vh - 60px)', margin: 0, padding: 0, maxWidth: '100%' }}
      >
        <TileLayer
          url="/map/tiles/{z}/{x}/{y}.png"
        />
        {this.props.spacedata.items.map(
          spacedata => (
            <Marker
              spacedata={spacedata}
              key={spacedata.space}
              highlight={
                this.props.spacedata.filter.indexOf(spacedata.space) !== -1}
              toggleFilterSpacedata={this.props.toggleFilterSpacedata}
            />
          )
        )}
      </LeafletMap>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
