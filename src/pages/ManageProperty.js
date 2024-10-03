import React, { useState, useEffect } from 'react';
import Firebase from '../Firebase'; 
import { collection, query, getDocs, getFirestore, where } from 'firebase/firestore'; 
import Navbar from '../components/Navbar'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RentPropertyModal from "./RentPropertyModal";
import SellPropertyModal from "./SellPropertyModal";
import DecimalFormat from "decimal-format";
import { ImSpinner2 } from "react-icons/im";
import { BiBed, BiBath, BiArea, BiCar } from "react-icons/bi";

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
          q = query(enquiriesRef, where("email", "==", email)); 
        } else if (filterOption === "Send to me") {
          // Query for Enquiries sent to the current user's agentEmail
          q = query(enquiriesRef, where("agentEmail", "==", email)); 
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
  useEffect(() => {
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

    if (status === "Agent" || status === "Landlord") {
      fetchUploadedProperties();
    }
  }, [status, email, db]);

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
          {status === "Tenant" && (
            <div
              className={`mr-6 pb-2 cursor-pointer ${
                activeTab === "properties" ? "border-b-2 border-blue-500 text-blue-600" : ""
              }`}
              onClick={() => setActiveTab("properties")}
            >
              Properties
            </div>
          )}
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
                    Enquiry ID: {enquiry.id}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No enquiries available.</p>
              )}
            </div>

            {/* Pop-up modal to show enquiry details */}
            {selectedEnquiry && (
              <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                  <h2 className="text-xl font-semibold mb-4">Enquiry Details</h2>
                  <p><strong>Enquiry Time:</strong> {selectedEnquiry.createdAt?.toDate().toLocaleString()}</p>
                  <p><strong>Name:</strong> {selectedEnquiry.name}</p>
                  <p><strong>Email:</strong> {selectedEnquiry.email}</p>
                  {setSelectedEnquiry.phone !== "" &&(
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
                  <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setSelectedEnquiry(null)}
                  >
                    Close
                  </button>
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
                    <div className="bg-white shadow-1 pb-5 rounded-lg w-full max-w-[300px] mx-auto cursor-pointer hover:shadow-2xl transition text-gray-600">
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
      <ToastContainer />
    </div>
  );
};

export default ManageProperty;
