import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore"; // Import Firestore functions
import { BiBed, BiBath, BiCar } from "react-icons/bi";
import Navbar from "../components/Navbar";
import DefaultIMG from "../assets/img/Default.jpg";
import { BiPhone, BiMessageDetail } from "react-icons/bi";
import agent from "../assets/img/agents/agent1.png";
import RentPropertyModal from "./RentPropertyModal";
import SellPropertyModal from "./SellPropertyModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DecimalFormat from "decimal-format";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin
} from '@vis.gl/react-google-maps';
import '../components/HouseMap.css'

const PropertyDetail = () => {
  const { id } = useParams(); // Get the house ID from the URL
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEnquireModal, setShowEnquireModal] = useState(false);
  const [senderEmail, setSenderEmail] = useState("");
  const [rentModal, setRentModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);
  const df = new DecimalFormat("#,###,###,###,###");
  const lat = house?.address?.lat;
  const lng = house?.address?.lng;

  // Enquiry form state
  const [enquiryData, setEnquiryData] = useState({
    priceGuide: false,
    inspectionTimes: false,
    ratesFees: false,
    propertySize: false,
    message: "",
    name: "",
    senderEmail: "",
    phone: "",
    postcode: "",
  });

  const [rentBudget, setRentBudget] = useState({
    income: '',
    electricityBill: 60,
    waterBill: 20,
    internetBill: 60,
    totalBill: '',
    taxes: 0,
    totalBudget: 0,
  });
  const [mortgageDetails, setMortgageDetails] = useState({
    amountBorrowed: "", 
    interestRate: "", 
    loanTerm: "", 
    repaymentFrequency: "Monthly",
  });

  const [mortgageResult, setMortgageResult] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
  });

  const [selectedTaxRate, setSelectedTaxRate] = useState(16);

  const toggleRentModal = () => {
    setRentModal(!rentModal);
  };

  const toggleSellModal = () => {
    setSellModal(!sellModal);
  };

  const handleShowEnquire = () => {
    setShowEnquireModal(true); // Show confirmation modal
  };

  const handleEnquireClick = async () => {
    const { name, senderEmail, postcode } = enquiryData;
  
    // Check if required fields are filled
    if (!name || !senderEmail || !postcode) {
      toast.error("Please fill out all required fields", {
        position: "top-center",
      });
      return; // Prevent form submission if validation fails
    }
  
    const enquiryCollectionRef = collection(db, "Enquiries");
  
    try {
      await addDoc(enquiryCollectionRef, {
        ...enquiryData,
        receiverEmail: house.agentEmail, // Ensure agentEmail is included
        propertyId: id, // Store the property ID for reference
        propertyName: house.propertyName,
        createdAt: new Date(),
        status: "Pending",
      });
      toast.success("Enquiry submitted!", {
        position: "top-center",
      });
      setShowEnquireModal(false); // Close modal after submission
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      toast.error("Error submitting enquiry", {
        position: "top-center",
      });
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEnquiryData({
      ...enquiryData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const rentDocRef = doc(db, "Rent", id);
        const rentDocSnap = await getDoc(rentDocRef);

        if (rentDocSnap.exists()) {
          const houseData = rentDocSnap.data();
          setHouse(houseData);
          setEnquiryData((prevState) => ({
            ...prevState,
          }));
          rentCalulator(houseData.price);
        } else {
          const sellDocRef = doc(db, "Sell", id);
          const sellDocSnap = await getDoc(sellDocRef);

          if (sellDocSnap.exists()) {
            const houseData = sellDocSnap.data();
            setHouse(houseData);
            setEnquiryData((prevState) => ({
              ...prevState,
              agentEmail: houseData.agentEmail, // Set agentEmail after house is fetched
            }));
            sellCalculator();
          } else {
            console.log("No such document in both Rent and Sell!");
          }
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
      setLoading(false);
    };

    const rentCalulator = (price) => {
      const income = parseFloat(rentBudget.income) || 0;
        const electricityBill = parseFloat(rentBudget.electricityBill) || 0;
        const waterBill = parseFloat(rentBudget.waterBill) || 0;
        const internetBill = parseFloat(rentBudget.internetBill) || 0;
        const totalBill = electricityBill + waterBill + internetBill;

        const taxAmount = (income * selectedTaxRate) / 100;
        const weeklyBill = (totalBill) / 4;
        const total = income - weeklyBill - taxAmount - price;

        setRentBudget(prev => ({ ...prev, totalBill: weeklyBill, taxes: taxAmount, totalBudget: total 
      }));
    }

    const sellCalculator = () => {
      const { amountBorrowed, interestRate, loanTerm, fees } = mortgageDetails;
      const loanAmount = parseFloat(amountBorrowed) || 0;
      const interestRateAnnual = parseFloat(interestRate) || 0;
      const loanTermYears = parseInt(loanTerm) || 0;

      if (loanAmount > 0 && interestRateAnnual > 0 && loanTermYears > 0) {
        const monthlyInterestRate = (interestRateAnnual / 100) / 12;
        const totalPayments = loanTermYears * 12;
        const monthlyMortgagePayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
        const totalRepayment = monthlyMortgagePayment * totalPayments;

        setMortgageResult({
          monthlyPayment: monthlyMortgagePayment.toFixed(2),
          totalPayment: totalRepayment.toFixed(2),
        });
      } else {
        setMortgageResult({
          monthlyPayment: 0,
          totalPayment: 0,
        });
      }
    }

    fetchHouseDetails();
  }, [id, rentBudget.income, rentBudget.electricityBill, rentBudget.waterBill, rentBudget.internetBill, selectedTaxRate, mortgageDetails]);

  const handleRentBudgetChange = (e) => {
    const { name, value } = e.target;
    setRentBudget((prev) => ({ ...prev, [name]: value }));
  };

  const handleMortgageChange = (e) => {
    const { name, value } = e.target;
    setMortgageDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaxRateChange = (e) => {
    setSelectedTaxRate(parseInt(e.target.value));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!house) {
    return <div>Property not found!</div>;
  }

  const Markers = () => {
    console.log("Lat:", lat, "Lng:", lng);
    
    if (typeof lat === "number" && typeof lng === "number") {
      return (
        <AdvancedMarker
          position={{ lat, lng }} // Ensure lat and lng are numbers
        >
          <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      );
    } else {
      console.warn(`Invalid lat/lng`);
      return null; 
    }
  }

  const handleCancelEnquiry = () => {
    // Reset the enquiry data when cancelling
    setEnquiryData({
      priceGuide: false,
      inspectionTimes: false,
      ratesFees: false,
      propertySize: false,
      message: "",
      name: "",
      senderEmail: "",
      phone: "",
      postcode: "",
    });
    setShowEnquireModal(false); // Close the modal
  };
  

  return (
    <section className="container mx-auto my-10 p-5">
      <Navbar
        toggleRentModal={toggleRentModal}
        toggleSellModal={toggleSellModal}
      />
      <RentPropertyModal modal={rentModal} toggleModal={toggleRentModal} />
      <SellPropertyModal modal={sellModal} toggleModal={toggleSellModal} />

      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto">
        {/* Property Image */}
        <img
          src={house.imageUrl || DefaultIMG} // Add your image field from Firestore
          alt="House"
          className="w-full h-72 object-cover"
        />

        <div className="p-6 flex flex-col lg:flex-row justify-between">
          {/* Left Column: Property Details */}
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-bold mb-4">{house.propertyName}</h2>
            <p className="text-gray-700 text-lg mb-4">
              {house.address.description}
            </p>
            <div className="flex items-center mb-4">
              <BiBed className="text-xl mr-2" />
              <span>{house.numberOfBeds} Beds</span>
              <BiBath className="text-xl mx-4" />
              <span>{house.numberOfBaths} Baths</span>
              <BiCar className="text-xl mx-4" />
              <span>{house.numCarpark} Carparks</span>
              <span className="ml-4">{house.propertyType}</span>
            </div>
            <p className="text-xl font-semibold text-violet-600 mb-4">
              ${house.price} {house.RoS === "Rent" ? "/pw" : ""}
            </p>
          </div>

          {/* Right Column: Agent Info */}
          <div className="bg-gray-50 shadow-md rounded-lg p-4 max-w-3xl">
            <div className="flex items-center mb-4">
              <img
                src={agent}
                alt="Agent"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p className="text-lg font-bold">{house.agentName}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2"
                 onClick={handleShowEnquire}>
                <BiMessageDetail className="h-5 w-5" />
                <span>Enquire</span>
              </button>
              <button className="bg-white border-2 border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition flex items-center justify-center space-x-2">
                <BiPhone className="h-5 w-5" />
                <span>{house.phoneNumber}</span>
              </button>
            </div>
          </div>
        </div>
        <APIProvider apiKey={'AIzaSyA52M75qm_GT4k2ZRpQjqPQwDIvVm6YsAk'} onLoad={() => console.log('Maps API has loaded.')}>
          <div className="p-6 mt-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Property Location</h3>
            <div className="map-list-container flex justify-center">
              <div className="w-full lg:w-2/3 h-96">
                <Map
                  mapId="eb9ed4134522d2ad"
                  defaultZoom={13}
                  defaultCenter={{ lat: lat, lng: lng }}
                  onCameraChanged={(ev) =>
                    console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                  }
                >
                  <Markers />
                </Map>
              </div>
            </div>
          </div>
        </APIProvider>
      </div>
      {house.RoS === 'Rent' ? (
        <div>
          {/* Budget Calculator Section */}
          <div className="bg-white p-6 rounded-md shadow-lg max-w-6xl mx-auto my-10">
            <h2 className="text-2xl font-bold mb-4">Budget Calculator</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Weekly Income:
                </label>
                <input
                  type="number"
                  name="income"
                  value={rentBudget.income}
                  onChange={handleRentBudgetChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter weekly income"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Estimated Monthly Bill Breakdown:
                </label>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Electricity:
                  </label>
                  <select
                    name="electricityBill"
                    value={rentBudget.electricityBill}
                    onChange={handleRentBudgetChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="60">Low - $60</option>
                    <option value="100">Medium - $100</option>
                    <option value="200">High - $200</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Water:
                  </label>
                  <select
                    name="waterBill"
                    value={rentBudget.waterBill}
                    onChange={handleRentBudgetChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="20">Low - $20</option>
                    <option value="40">Medium - $40</option>
                    <option value="80">High - $80</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Internet:
                  </label>
                  <select
                    name="internetBill"
                    value={rentBudget.internetBill}
                    onChange={handleRentBudgetChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="60">Low - $60</option>
                    <option value="100">Medium - $100</option>
                    <option value="150">High - $150</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Total Estimated Weekly Bill:
                  </label>
                  <input
                    type="number"
                    name="bill"
                    value={rentBudget.totalBill}
                    readOnly
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Total estimated monthly bill"
                  />
                </div>
              </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Select Tax Rate:
                  </label>
                  <select
                    value={selectedTaxRate}
                    onChange={handleTaxRateChange}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value={16}>16%</option>
                    <option value={30}>30%</option>
                    <option value={37}>37%</option>
                    <option value={45}>45%</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Calculated Taxes:
                  </label>
                  <input
                    type="text"
                    value={df.format(rentBudget.taxes)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100"
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Summary:
                  </label>
                  <input
                    type="text"
                    value={df.format(rentBudget.totalBudget)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-gray-100"
                    readOnly
                  />
                </div>
            </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-md shadow-lg max-w-6xl mx-auto my-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Mortgage Calculator</h2> 
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">Amount Borrowed:</label>
            <input
              type="number"
              name="amountBorrowed"
              value={mortgageDetails.amountBorrowed}
              onChange={handleMortgageChange}
              placeholder="Enter amount borrowed"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">Interest Rate (%):</label>
            <input
              type="number"
              name="interestRate"
              step="0.01"
              value={mortgageDetails.interestRate}
              onChange={handleMortgageChange}
              placeholder="Enter interest rate"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">Loan Term (years):</label>
            <input
              type="number"
              name="loanTerm"
              value={mortgageDetails.loanTerm}
              onChange={handleMortgageChange}
              placeholder="Enter loan term"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <h3 className="text-xl font-medium mt-6 mb-4 text-gray-800">Results:</h3>
          <div className="text-gray-700">
            <p>Monthly Payment (including fees): 
              <span className="font-semibold">${df.format(mortgageResult.monthlyPayment)}</span>
            </p>
            <p>Total Payment (including fees over {mortgageDetails.loanTerm} years): 
              <span className="font-semibold">${df.format(mortgageResult.totalPayment)}</span>
            </p>
          </div>
        </div>
      )}

      {/* Enquire Modal */}
      {showEnquireModal && (
        <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Ask about this property</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Checkboxes */}
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name="priceGuide" 
                  checked={enquiryData.priceGuide} 
                  onChange={handleInputChange} 
                  className="form-checkbox" 
                />
                <span>Price guide</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name="inspectionTimes" 
                  checked={enquiryData.inspectionTimes}
                  onChange={handleInputChange} 
                  className="form-checkbox" 
                />
                <span>Inspection times</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name="ratesFees" 
                  checked={enquiryData.ratesFees} 
                  onChange={handleInputChange}
                  className="form-checkbox" 
                />
                <span>Rates and fees</span>
              </label>
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name="propertySize" 
                  checked={enquiryData.propertySize} 
                  onChange={handleInputChange} 
                  className="form-checkbox" 
                />
                <span>Property size</span>
              </label>
            </div>

            {/* Message Text Area */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Add a message (optional)</label>
              <textarea
                name="message"
                value={enquiryData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
                placeholder="What can we help you with?"
              ></textarea>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={enquiryData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="senderEmail"
                  value={enquiryData.senderEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone (optional)</label>
                <input
                  type="text"
                  name="phone"
                  value={enquiryData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
                  placeholder="Phone"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Postcode *</label>
                <input
                  type="text"
                  name="postcode"
                  value={enquiryData.postcode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
                  placeholder="Postcode"
                />
              </div>
            </div>

            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition mb-4"
              onClick={handleEnquireClick}>
              Send enquiry
            </button>

            <button 
              className="w-full bg-gray-200 text-black py-3 rounded-lg hover:bg-gray-300 transition"
              onClick={handleCancelEnquiry}  // Close the modal
            >
              Cancel
            </button>

          </div>
        </div>
      )}
      <ToastContainer />
    </section>
  );
};

export default PropertyDetail;
