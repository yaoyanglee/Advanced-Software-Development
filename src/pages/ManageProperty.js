import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase'; 
import { collection, query, getDocs, getFirestore, where, doc, updateDoc } from 'firebase/firestore'; 
import Navbar from '../components/Navbar'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RentPropertyModal from "./RentPropertyModal";
import SellPropertyModal from "./SellPropertyModal";
import DecimalFormat from "decimal-format";
import { ImSpinner2 } from "react-icons/im";
import { BiBed, BiBath, BiArea, BiCar } from "react-icons/bi";
import { Center } from '@chakra-ui/react';

const ManageProperty = () => {
  const [status, setStatus] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [activeTab, setActiveTab] = useState("enquires"); // Default active tab
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [uploadedProperties, setUploadedProperties] = useState([]); // To store uploaded houses
  const [selectedEnquiry, setSelectedEnquiry] = useState(null); // For pop-up enquiry detail
  const [filterOption, setFilterOption] = useState('My Enquire'); // Default filter
  const [filterOpen, setFilterOpen] = useState(false); // For dropdown visibility
  const db = getFirestore(Firebase);
  const [rentModal, setRentModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false); // Toggle edit mode
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const email = localStorage.getItem("Email");
  const df = new DecimalFormat("#,###,###,###,###");

  const toggleRentModal = () => { 
    setRentModal(!rentModal);
  };

  const toggleSellModal = () => {
    setSellModal(!sellModal);
  };

  // Fetch user data based on email stored in localStorage
  useEffect(() => {
    const fetchUserStatus = async () => {
      const email = localStorage.getItem("Email");
      setUserEmail(email);
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("Email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setStatus(userData.Status); // Fetch the user status (Tenant/Agent/Landlord)
      }
    };

    fetchUserStatus();
  }, [db]);

  // Fetch enquiries based on filter
  useEffect(() => {
    const fetchEnquiries = async () => {
      const enquiriesRef = collection(db, "Enquiries");
      let q;

      if (filterOption === "My Enquire") {
        // Query for My Enquiries (email matches)
        q = query(enquiriesRef, where("senderEmail", "==", email)); 
      } else if (filterOption === "Send to me") {
        // Query for Enquiries sent to the current user's agentEmail
        q = query(enquiriesRef, where("receiverEmail", "==", email)); 
      }

      const querySnapshot = await getDocs(q);
      const fetchedEnquiries = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEnquiries(fetchedEnquiries);
      setFilteredEnquiries(fetchedEnquiries); // Apply filter initially
    };

    if (status) {
      fetchEnquiries();
    }
  }, [filterOption, email, status, db]);

  // Fetch uploaded properties based on email from both Rent and Sell collections
  const fetchUploadedProperties = async () => {
    const rentRef = collection(db, "Rent");
    const sellRef = collection(db, "Sell");

    const qRent = query(rentRef, where("agentEmail", "==", email));
    const qSell = query(sellRef, where("agentEmail", "==", email));

    const [rentSnapshot, sellSnapshot] = await Promise.all([getDocs(qRent), getDocs(qSell)]);

    const rentHouses = rentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const sellHouses = sellSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    setUploadedProperties([...rentHouses, ...sellHouses]);
  };

  useEffect(() => {
    if (status === "Agent" || status === "Landlord") {
      fetchUploadedProperties();
    }
  }, [status]);

  // Handle dropdown filter selection
  const handleFilterChange = (filter) => {
    setFilterOption(filter);
    setFilterOpen(false); // Close the dropdown after selecting
  };

  // Toggle dropdown visibility
  const toggleFilterDropdown = () => {
    setFilterOpen(!filterOpen);
  };

  // Handle enquiry click to show details
  const handleEnquiryClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
  };

  if (!uploadedProperties.length && activeTab === "uploads") {
    return (
      <div className="mx-auto my-20 text-center">
        <ImSpinner2 className="animate-spin text-4xl text-violet-700 font-bold" />
      </div>
    );
  }

  // Open update modal and set selected property
  const handleUpdateModal = (property) => {
    setSelectedProperty(property);
    setShowUpdateModal(true);
    setIsEditable(false); // Start in non-editable mode
  };

  // Handle save changes to Firestore
  const handleSaveChanges = async () => {
    if (selectedProperty) {
      const docRef = doc(db, selectedProperty.RoS === "Sell" ? "Sell" : "Rent", selectedProperty.id);
      
      try {
        await updateDoc(docRef, {
          ...selectedProperty,
          availability: Boolean(selectedProperty.availability), // Ensure availability is boolean
        });
        setShowUpdateModal(false); // Close the modal
        setIsEditable(false);
        setEditMode(false);
        await fetchUploadedProperties();
        toast.success("Property updated successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Failed to update property!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  // Handle form input change with boolean conversion for availability
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Explicitly convert availability to boolean
    const newValue = name === "availability" ? (value === "true") : value;

    setSelectedProperty((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode); // Toggle between edit and view mode
  };

  const approveEnquiry = () => {
    if (selectedEnquiry) {
      const docRef = doc(db, "Enquiries", selectedEnquiry.id);

      try {
        // Update the enquiry status in Firestore
        updateDoc(docRef, { status: "Approved" });
        setFilteredEnquiries((prevEnquiries) =>
          prevEnquiries.map((enq) =>
            enq.id === selectedEnquiry.id ? { ...enq, status:"Approved" } : enq
          )
        );
        setSelectedEnquiry(null);
        toast.success(`Approve the enquire!`, {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Failed to update enquiry status!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  const rejectEnquiry = () => {
    if (selectedEnquiry) {
      const docRef = doc(db, "Enquiries", selectedEnquiry.id);

      try {
        // Update the enquiry status in Firestore
        updateDoc(docRef, { status: "Rejected" });
        setFilteredEnquiries((prevEnquiries) =>
          prevEnquiries.map((enq) =>
            enq.id === selectedEnquiry.id ? { ...enq, status: "Rejected" } : enq
          )
        );
        setSelectedEnquiry(null);
        toast.success(`Reject the enquire!`, {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Failed to update enquiry status!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div>
      <Navbar
        toggleRentModal={toggleRentModal}
        toggleSellModal={toggleSellModal}
      />
      <RentPropertyModal modal={rentModal} toggleModal={toggleRentModal} />
      <SellPropertyModal modal={sellModal} toggleModal={toggleSellModal} />

      <div className="bg-white p-6 rounded-md shadow-lg max-w-5xl mx-auto my-10">
        
        {/* Tabs - default on "Enquires" */}
        <div className="flex border-b border-gray-300 mb-4">
          <div
            className={`mr-6 pb-2 cursor-pointer ${
              activeTab === "enquires" ? "border-b-2 border-blue-500 text-blue-600" : ""
            }`}
            onClick={() => setActiveTab("enquires")}
          >
            Enquires
          </div>
          {(status === "Agent" || status === "Landlord") && (
            <div
              className={`mr-6 pb-2 cursor-pointer ${
                activeTab === "uploads" ? "border-b-2 border-blue-500 text-blue-600" : ""
              }`}
              onClick={() => setActiveTab("uploads")}
            >
              Uploaded
            </div>
          )}
        </div>

        {activeTab === "enquires" && (
          <>
            {/* Filter Dropdown */}
            <div className="relative inline-block text-left mb-4">
              <button
                className="inline-flex justify-between items-center px-4 py-2 w-48 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={toggleFilterDropdown}
              >
                {filterOption}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {filterOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <button
                      className={`${
                        filterOption === 'My Enquire' ? 'bg-gray-100' : ''
                      } block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                      onClick={() => handleFilterChange('My Enquire')}
                    >
                      My Enquire
                    </button>
                    <button
                      className={`${
                        filterOption === 'Send to me' ? 'bg-gray-100' : ''
                      } block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
                      onClick={() => handleFilterChange('Send to me')}
                    >
                      Send to me
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Enquiry List */}
            <div className="grid gap-4">
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="p-4 border border-gray-300 rounded-md cursor-pointer"
                    onClick={() => handleEnquiryClick(enquiry)}
                  >
                    <div className="flex justify-between items-center">
                      {enquiry.propertyName}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {enquiry.createdAt?.toDate().toLocaleString()}
                      <span
                        className={`ml-4 px-3 py-1 rounded-full text-white font-semibold
                          ${enquiry.status === "Pending" ? "bg-yellow-500" : ""}
                          ${enquiry.status === "Approved" ? "bg-green-500" : ""}
                          ${enquiry.status === "Rejected" ? "bg-red-500" : ""}
                        `}
                      >
                        {enquiry.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No enquiries available.</p>
              )}
            </div>


            {/* Pop-up modal to show enquiry details */}
            {selectedEnquiry && (
              <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                  <button
                    className="absolute top-4 right-4 bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition"
                    onClick={() => setSelectedEnquiry(null)}
                  >
                    Close
                  </button>
                  
                  <h2 className="text-xl font-semibold mb-4">Enquiry Details</h2>
                  <p><strong>Enquiry Time:</strong> {selectedEnquiry.createdAt?.toDate().toLocaleString()}</p>
                  <p><strong>Name:</strong> {selectedEnquiry.name}</p>
                  <p><strong>Email:</strong> {selectedEnquiry.senderEmail}</p>
                  
                  {selectedEnquiry.phone && (
                    <p><strong>Phone:</strong> {selectedEnquiry.phone}</p>
                  )}
              
                  <p><strong>Postcode:</strong> {selectedEnquiry.postcode}</p>
                  <p><strong>Property Name:</strong> {selectedEnquiry.propertyName}</p>
                  <p><strong>Enquiry Type(s):</strong></p>
                  <ul className="list-disc pl-6">
                    {selectedEnquiry.inspectionTimes && <li>Inspection Times</li>}
                    {selectedEnquiry.priceGuide && <li>Price Guide</li>}
                    {selectedEnquiry.propertySize && <li>Property Size</li>}
                    {selectedEnquiry.ratesFees && <li>Rates and Fees</li>}
                  </ul>
                  <p><strong>Message:</strong> {selectedEnquiry.message}</p>
              
                  {filterOption === "Send to me" && (
                    <div className="flex gap-4 mt-4">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                        onClick={approveEnquiry}
                      >
                        Approve
                      </button>
                      
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        onClick={rejectEnquiry}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "uploads" && (
          <section className="mb-20">
            <div className="container mx-auto max-w-[1100px]">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                {uploadedProperties.map((house, index) => (
                    <div className="bg-white shadow-1 pb-5 rounded-lg w-full max-w-[300px] mx-auto cursor-pointer hover:shadow-2xl transition text-gray-600"
                    key={house.id}
                    onClick={() => handleUpdateModal(house)}
                    >
                      <div className="p-3">
                        <div className="flex justify-between items-center px-3">
                          <div className="text-lg text-violet-600 mb-4 font-bold pl-2">
                            {house.propertyName}
                            <br />${df.format(house.price)}{" "}
                            {house.RoS === "Rent" ? "/pw" : ""}
                          </div>
                        </div>
                        <div className="flex gap-x-2">
                          <div className="border-r-2 pr-2">{house.propertyType}</div>
                          <div className="text-gray-900 font-bold">{house.city}</div>
                        </div>
                        <div className="text-xs max-w-[260px]">
                          {house.address.description}
                        </div>
                        <div className="flex justify-around my-1 p-1 border-t-2">
                          <div className="flex items-center gap-1">
                            <div className="text-[20px] text-violet-700">
                              <BiBed />
                            </div>
                            <div>{house.numberOfBeds}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="text-[20px] text-violet-700">
                              <BiBath />
                            </div>
                            <div>{house.numberOfBaths}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="text-[20px] text-violet-700">
                              <BiCar />
                            </div>
                            <div>{house.numCarpark}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Update Modal */}
      {showUpdateModal && selectedProperty && (
        <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full relative max-h-[90vh] overflow-y-auto"> {/* Increased max width to 4xl */}
            <h2 className="text-2xl font-bold mb-4">
              {selectedProperty.propertyName}
            </h2>

            {/* Edit button at the top-right corner */}
            <button
              className={`absolute top-4 right-4 text-white px-4 py-2 rounded ${
                editMode ? "bg-blue-500" : "bg-blue-500"
              }`}
              onClick={toggleEditMode}
            >
              {editMode ? "Cancel" : "Edit"}
            </button>

            <div className="grid grid-cols-2 gap-4"> {/* Create two columns layout */}
              <div className="mb-2"> {/* Reduced margin-bottom from mb-4 to mb-2 */}
                <label className="block text-gray-700 mb-1">Property Name</label> {/* Reduced margin-bottom for label */}
                <input
                  type="text"
                  name="propertyName"
                  value={selectedProperty.propertyName}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Property Type</label>
                <input
                  type="text"
                  name="propertyType"
                  value={selectedProperty.propertyType}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Price</label>
                <input
                  type="text"
                  name="price"
                  value={selectedProperty.price}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={selectedProperty.city}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 mb-1">numCarpark</label>
                <input
                  type="text"
                  name="numCarpark"
                  value={selectedProperty.numCarpark}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 mb-1">numberOfBaths</label>
                <input
                  type="text"
                  name="numberOfBaths"
                  value={selectedProperty.numberOfBaths}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 mb-1">numberOfBeds</label>
                <input
                  type="text"
                  name="numberOfBeds"
                  value={selectedProperty.numberOfBeds}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Agent Name</label>
                <input
                  type="text"
                  name="agentName"
                  value={selectedProperty.agentName}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Agent Email</label>
                <input
                  type="text"
                  name="agentEmail"
                  value={selectedProperty.agentEmail}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Contact number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={selectedProperty.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600"
                />
              </div>

              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Availability</label>
                <select
                  name="availability"
                  value={selectedProperty.availability.toString()} // Convert boolean to string for the select element
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-violet-600 appearance-none pr-8"
                  style={{ backgroundImage: 'url(data:image/svg+xml;base64,...your-svg-data-here...)', backgroundPosition: 'calc(100% - 15px) center', backgroundRepeat: 'no-repeat' }}
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>

            {/* Show Save/Cancel buttons at the bottom if in edit mode */}
            {editMode && (
              <button
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition mb-1"
                onClick={handleSaveChanges}
              >
                Save
              </button>
            )}
              <button
                className="w-full bg-gray-200 text-black py-3 rounded-lg hover:bg-gray-300 transition mt-1"
                onClick={() => {
                  setShowUpdateModal(false);
                  setEditMode(false);
                  setIsEditable(false);
                }}
              >
                Close
              </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ManageProperty;
