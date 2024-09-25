import React, { useContext } from "react";
import {APIProvider, Map, MapCameraChangedEvent} from '@vis.gl/react-google-maps';
import './HouseMap.css'
import { HouseContext } from "./HouseContext";

const HouseMap = () => {
  const { houses } = useContext(HouseContext);
  
  return (
    <APIProvider apiKey={'AIzaSyA52M75qm_GT4k2ZRpQjqPQwDIvVm6YsAk'} onLoad={() => console.log('Maps API has loaded.')}>
        <div className="map-container">
          <Map
            defaultZoom={13}
            defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
            onCameraChanged={(ev) => 
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}>
          </Map>
        </div>
    </APIProvider>
  );

}

export default HouseMap