import React, { useContext } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  MapCameraChangedEvent,
  Pin
} from '@vis.gl/react-google-maps';
import './HouseMap.css'
import { HouseContext } from "./HouseContext";
import { ImSpinner2 } from "react-icons/im";
import DecimalFormat from "decimal-format";
import { useFavourites } from "../contexts/FavouritesContext";

const HouseMap = () => {
  const { houses, loading } = useContext(HouseContext);
  const { addToFavourites, isInFavourites } = useFavourites(); // Destructure needed functions from useFavourites
  const df = new DecimalFormat("#,###,###,###,###");

  const handleAddToFavourites = (house) => {
    addToFavourites(house);
  };

  if (loading) {
    return (
      <ImSpinner2 className="mx-auto animate-spin text-4xl text-violet-700 font-bold mt-[200px]" />
    );
  }

  if (houses.length < 1) {
    return <div>Sorry, no match found!</div>;
  }

  const Markers = () => (
    <>
      {houses.map((house, index) => {
        const lat = house?.address?.lat;
        const lng = house?.address?.lng;
  
        // Log to ensure the lat and lng are numbers
        console.log("Lat:", lat, "Lng:", lng);
  
        // Only render the marker if lat and lng are valid numbers
        if (typeof lat === "number" && typeof lng === "number") {
          return (
            <AdvancedMarker
              key={index}
              position={{ lat, lng }} // Ensure lat and lng are numbers
            >
              <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
            </AdvancedMarker>
          );
        } else {
          console.warn(`Invalid lat/lng for house index ${index}:`, house);
          return null; // Skip rendering if lat/lng are invalid
        }
      })}
    </>
  );
  
  return (
    <APIProvider apiKey={'AIzaSyA52M75qm_GT4k2ZRpQjqPQwDIvVm6YsAk'} onLoad={() => console.log('Maps API has loaded.')}>
        <div className="map-container">
          <Map
            defaultZoom={13}
            defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
            onCameraChanged={(ev) => 
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}>
               <Markers />
          </Map>
        </div>
    </APIProvider>
  );

}

export default HouseMap