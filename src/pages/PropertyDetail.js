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

const PropertyDetail = () => {
  const { id } = useParams(); // Get the house ID from the URL
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEnquireModal, setShowEnquireModal] = useState(false);
  const [rentModal, setRentModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);

  // Enquiry form state
  const [enquiryData, setEnquiryData] = useState({
    priceGuide: false,
    inspectionTimes: false,
    ratesFees: false,
    propertySize: false,
    message: "",
    name: "",
    email: "",
    phone: "",
    postcode: "",
  });

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
    const storedEmail = localStorage.getItem("Email"); // Get email from localStorage
    const enquiryCollectionRef = collection(db, "Enquiries");

    try {
      await addDoc(enquiryCollectionRef, {
        ...enquiryData,
        email: storedEmail || enquiryData.email, // Use email from localStorage if available
        agentEmail: house.agentEmail, // Ensure agentEmail is included
        propertyId: id, // Store the property ID for reference
        propertyName: house.propertyName,
        createdAt: new Date(),
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
            agentEmail: houseData.agentEmail, // Set agentEmail after house is fetched
          }));
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
          } else {
            console.log("No such document in both Rent and Sell!");
          }
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
      setLoading(false);
    };

    fetchHouseDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!house) {
    return <div>Property not found!</div>;
  }


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
      </div>

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
                  name="email"
                  value={enquiryData.email}
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
              onClick={() => setShowEnquireModal(false)}  // Close the modal
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
