import React from 'react';
import Map from '../components/Map';
import EventList from '../components/EventList';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
};

const IndexContainer = () => (
  <div style={style.container}>
    <div style={{ height: 'calc(50vh - 60px)', paddingTop: '60px'}}>
      <Map />
    </div>
    <EventList />
  </div>
);

export default IndexContainer;
