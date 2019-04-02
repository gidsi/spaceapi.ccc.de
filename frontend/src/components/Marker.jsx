import React from 'react';
import PropTypes from 'prop-types';
import { CircleMarker, Popup } from 'react-leaflet';
import theme from '../style/theme';
import { spacedataElementStruct } from '../redux/modules/spacedata';

const Marker = (props) => {
  const color = props.highlight ? theme.palette.secondary.light : theme.palette.primary.main;

  const style = {
    container: {
      display: 'flex',
    },
    logo: {
      width: '50px',
      marginRight: '5px',
    },
  };

  return (
    <CircleMarker
      fillColor={color}
      color={color}
      radius={5}
      center={[props.spacedata.location.lat, props.spacedata.location.lon]}
    >
      <Popup
        onOpen={() => props.toggleFilterSpacedata(props.spacedata.space)}
        onClose={() => props.toggleFilterSpacedata(props.spacedata.space)}
      >
        <div style={style.container}>
          <div>
            {props.spacedata.space}
            <br />
            <a href={props.spacedata.url}>
              {props.spacedata.url}
            </a>
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
};

Marker.propTypes = {
  spacedata: spacedataElementStruct.isRequired,
  highlight: PropTypes.bool.isRequired,
  toggleFilterSpacedata: PropTypes.func.isRequired,
};

export default Marker;
