import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [services, setServices] = useState([]); 
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    contact_number: '',
    service_type: 'repair',
    cardholder_name: '',
    card_number: '',
    expiry_date: '',
    cvv: '',
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        console.log('Response display check:', response.data);

        const servicesData = Array.isArray(response.data) ? response.data : [response.data];
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/order-details', formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error submitting order details', error);
      alert('Could not save order details');
    }
  };

  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="header">
        <h1>ServiceBo</h1>
          <h3>Categories</h3>
          <h3>Ratings</h3>
          <h3>Search</h3>
        <nav className="header-nav">
          <button>Reserve</button>
          <button>Login</button>
        </nav>
      </header>

      {/* Main Content Section */}
      <div className="main-container">
        {/* Left Side - Booking Steps */}
        <div className="left-side">
          <div className="booking-container">
            <div className="form-section">
              <h2>Book AC Repair Service</h2>
              <form>
                {/* Step 1: Service Details */}
                <div className="step1-section">
                  <h3>Step 1: Service Details</h3>
                  <label>Choose service type:</label>
                  <select
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                  >
                    <option value="repair">Repair</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>

                {/* Step 2: Personal Information */}
                <div className="step2-section">
                  <h3>Step 2: Personal Information</h3>
                  <label>Full Name:</label>
                  <input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                  />
                  <label>Email Address:</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                  />
                  <label>Contact Number:</label>
                  <input
                    name="contact_number"
                    type="tel"
                    value={formData.contact_number}
                    onChange={handleChange}
                    placeholder="+123456789"
                  />
                </div>

                {/* Step 3: Payment Method */}
                <div className="step3-section">
                  <h3>Step 3: Payment Method</h3>
                  <label>Cardholder Name:</label>
                  <input
                    name="cardholder_name"
                    value={formData.cardholder_name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                  />
                  <label>Card Number:</label>
                  <input
                    name="card_number"
                    value={formData.card_number}
                    onChange={handleChange}
                    placeholder="•••• •••• •••• ••••"
                  />
                  <div className="payment-row">
                    <div>
                      <label>Expiry Date:</label>
                      <input
                        name="expiry_date"
                        value={formData.expiry_date}
                        onChange={handleChange}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label>CVV:</label>
                      <input
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="•••"
                      />
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>
          <div class="terms-section">
            <h3>Terms and Conditions</h3>
            <div class="service-hours">
              <div class="service-detail">
                <span>⏰ Service Hours</span>
                <p>From 9 AM</p>
              </div>
              <div class="service-detail">
                <span>⏰ Service End Time</span>
                <p>Until 5 PM</p>
              </div>
            </div>
            <div class="rules-section">
              <div class="rule">
                <span>🐶 No pets allowed</span>
              </div>
              <div class="rule">
                <span>🚭 No smoking</span>
              </div>
              <div class="rule">
                <span>🍸 No alcohol</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Services Summary */}
        <div className="right-side">
          <div className="summary-section">
            <h2>Summary</h2>
            {services.length > 0 ? (
              services.map((service, index) => (
                <div className="card" key={`service-${index}`}>
                  <img src={service.image_url} alt={service.title} />
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <p>Schedule: {new Date(service.schedule_date).toLocaleDateString()}</p>
                  <p>Appointment: {new Date(service.appointment_date).toLocaleDateString()}</p>
                  <p>Price per Service: ${service.price_per_service}</p>
                  <p>Additional Service: ${service.iservice}</p>
                  <p>Tax: ${service.tax}</p>
                  <p>Service Charge: ${service.service}</p>
                  <p>Total: ${service.total}</p>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
          {/* Confirm Button */}
          <button className="confirm-button" onClick={handleConfirm}>
                Confirm
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <h2>ServiceBooker</h2>
          <p>Services in Booking</p>
          <p>Service and Locker</p>
      </footer>
    </div>
  );
};

export default HomePage;
