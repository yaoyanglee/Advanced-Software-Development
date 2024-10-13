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

  // Prepare data for ApexCharts with dual Y-axes
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: compareList.map((house) => house.propertyName),
    },
    yaxis: [
      {
        title: {
          text: 'Price (in $)',
        },
        labels: {
          formatter: function (val) {
            return `$${val}`;
          },
        },
      },
      {
        opposite: true, // This moves the second Y-axis to the right
        title: {
          text: 'Rooms and Baths',
        },
        labels: {
          formatter: function (val) {
            return `${val}`;
          },
        },
        min: 0, // Ensure the axis starts at 0
        max: 5, // Adjust max value for better visibility of rooms and baths
      },
    ],
    fill: {
      opacity: 1,
    },
    colors: ['#1E90FF', '#00C49F', '#FF8042'], // Customize colors
  };

  const chartSeries = [
    {
      name: 'Price',
      data: compareList.map((house) => parseFloat(house.price)), // Convert price to float
      type: 'bar',
    },
    {
      name: 'Rooms',
      data: compareList.map((house) => parseInt(house.numberOfBeds, 10)), // Convert rooms to integer
      type: 'line',
      yAxisIndex: 1,
    },
    {
      name: 'Baths',
      data: compareList.map((house) => parseInt(house.numberOfBaths, 10)), // Convert baths to integer
      type: 'line',
      yAxisIndex: 1,
    },
  ];

  return (
    <div className="compare-modal">
      <div className="modal-content">
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

        {/* Price and Rooms/Baths Comparison Graph using ApexCharts */}
        <div className="chart-container">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </div>

        {/* Map showing only compared houses */}
        <div className="map-container">
          <APIProvider apiKey={'AIzaSyA52M75qm_GT4k2ZRpQjqPQwDIvVm6YsAk'}>
            <Map
              mapId='eb9ed4134522d2ad'
              defaultZoom={13}
              defaultCenter={{ lat: compareList[0]?.address.lat, lng: compareList[0]?.address.lng }}
              className="google-map"
            >
              <Markers />
            </Map>
          </APIProvider>
        </div>

        <button className="close-button" onClick={closeCompareModal}>
          Close Comparison
        </button>
      </div>
    </div>
  );
};

export default CompareModal;
