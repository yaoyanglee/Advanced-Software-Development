import React from 'react';
import Chart from 'react-apexcharts';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import './CompareModal.css'; // Import your CSS file

const CompareModal = ({ compareList, closeCompareModal }) => {
  // Markers for compared houses only
  const Markers = () => (
    <>
      {compareList.map((house, index) => {
        const lat = house?.address?.lat;
        const lng = house?.address?.lng;
        const colors = ['#FF0000', '#0000FF']; // Red for the first, Blue for the second

        if (typeof lat === "number" && typeof lng === "number") {
          return (
            <AdvancedMarker
              key={index}
              position={{ lat, lng }}
            >
              <Pin background={colors[index]} glyphColor={'#FFFFFF'} borderColor={'#000'} />
            </AdvancedMarker>
          );
        }
        return null; // Skip rendering if lat/lng are invalid
      })}
    </>
  );

  // Prepare data for ApexCharts Radar chart
  const chartOptions = {
    chart: {
      type: 'radar',
      height: 350,
    },
    xaxis: {
      categories: ['Price', 'Rooms', 'Baths'], // Metrics for comparison
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toString();
        }
      }
    },
    plotOptions: {
      radar: {
        size: 140,
        polygons: {
          strokeColor: '#e9e9e9',
          fill: {
            colors: ['#f8f8f8', '#fff']
          }
        }
      }
    },
    colors: ['#FF0000', '#0000FF'], // Customize colors for each property
    fill: {
      opacity: 0.7,
    },
    markers: {
      size: 3,
    },
  };

  // Radar chart series data for Price, Rooms, and Baths
  const chartSeries = compareList.map((house, index) => ({
    name: house.propertyName,
    data: [
      parseFloat(house.price),           // Price
      parseFloat(house.numberOfBeds),    // Rooms
      parseFloat(house.numberOfBaths),   // Baths
    ],
  }));

  return (
    <div className="compare-modal">
      <div className="modal-content">
        {/* X Close Button in the top-right corner */}
        <button className="close-modal-x" onClick={closeCompareModal}>
          &times;
        </button>
        
        <h3 className="modal-title">Compare Properties</h3>
        <div className="property-details">
          {compareList.map((house, index) => (
            <div key={index} className="property">
              <h4>{house.propertyName}</h4>
              <p>Price: ${house.price}</p>
              <p>Rooms: {house.numberOfBeds}</p>
              <p>Baths: {house.numberOfBaths}</p>
              <p>Address: {house.address.description}</p>
            </div>
          ))}
        </div>

        {/* Radar Chart for Price, Rooms, and Baths Comparison */}
        <div className="chart-container">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="radar"
            height={350}
          />
        </div>

        <h1>Comparison Map</h1>

        {/* Map showing only compared houses */}
        <div className="map-container">
          <APIProvider apiKey={'AIzaSyA52M75qm_GT4k2ZRpQjqPQwDIvVm6YsAk'}>
            <Map
              mapId='eb9ed4134522d2ad'
              defaultZoom={13}
              defaultCenter={{ lat: compareList[0]?.address.lat, lng: compareList[0]?.address.lng }}
              className="google-map"
              style={{ height: '500px', position: 'relative' }} // Ensure position relative for legend
            >
              <Markers />
            </Map>

            {/* Map Legend inside the map */}
            <div className="map-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#FF0000' }}></span> {/* Red Marker */}
                <span>54 Formosa Street</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#0000FF' }}></span> {/* Blue Marker */}
                <span>64/209 Harris Street</span>
              </div>
            </div>
          </APIProvider>
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
