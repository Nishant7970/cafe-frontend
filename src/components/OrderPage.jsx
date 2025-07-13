import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaMapMarkerAlt, FaCreditCard, FaCheck } from 'react-icons/fa';

const OrderPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In a real app, you would send this to your backend
      // For demo purposes, we'll just simulate a successful order
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setOrderSuccess(true);
      setStep(3);
      
      // In a real app, you would:
      // 1. Send the order to your backend
      // 2. Clear cart if applicable
      // 3. Show success message
      // 4. Redirect or show order details
    } catch (error) {
      console.error('Order failed:', error);
      alert('Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-amber-700 text-white p-6">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
                className="flex items-center text-white hover:text-amber-200 transition-colors"
              >
                <FaArrowLeft className="mr-2" /> Back
              </button>
              <h2 className="text-2xl font-bold">
                {step === 1 && 'Delivery Address'}
                {step === 2 && 'Payment Method'}
                {step === 3 && 'Order Confirmation'}
              </h2>
              <div className="w-8"></div> {/* Spacer for alignment */}
            </div>
            
            {/* Progress Steps */}
            <div className="flex justify-between mt-6 relative">
              <div className={`flex flex-col items-center z-10 ${step >= 1 ? 'text-white' : 'text-amber-200'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-white text-amber-700' : 'bg-amber-600 text-white'}`}>
                  {step > 1 ? <FaCheck /> : '1'}
                </div>
                <span className="mt-2 text-sm">Address</span>
              </div>
              <div className={`flex flex-col items-center z-10 ${step >= 2 ? 'text-white' : 'text-amber-200'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-white text-amber-700' : 'bg-amber-600 text-white'}`}>
                  {step > 2 ? <FaCheck /> : '2'}
                </div>
                <span className="mt-2 text-sm">Payment</span>
              </div>
              <div className={`flex flex-col items-center z-10 ${step >= 3 ? 'text-white' : 'text-amber-200'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-white text-amber-700' : 'bg-amber-600 text-white'}`}>
                  3
                </div>
                <span className="mt-2 text-sm">Confirm</span>
              </div>
              <div className="absolute top-5 left-16 right-16 h-1 bg-amber-600 z-0">
                <div 
                  className={`h-full bg-white transition-all duration-500 ${step >= 2 ? 'w-full' : step >= 1 ? 'w-1/2' : 'w-0'}`}
                ></div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8">
            {step === 1 && (
              <form onSubmit={handleSubmitAddress}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Delivery Address</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-3 top-3 text-amber-600" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        rows="3"
                        required
                        placeholder="Enter your full address"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        required
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        required
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        required
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmitPayment}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Select Payment Method</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:border-amber-500 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit"
                          checked={formData.paymentMethod === 'credit'}
                          onChange={handleChange}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <div className="flex items-center">
                          <FaCreditCard className="text-amber-600 mr-2" />
                          <span>Credit/Debit Card</span>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:border-amber-500 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleChange}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <span>PayPal</span>
                      </label>
                      <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:border-amber-500 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={handleChange}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <span>Cash on Delivery</span>
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === 'credit' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                  <FaCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your order. Your coffee will be prepared with care and delivered soon.
                </p>
                <div className="bg-amber-50 p-6 rounded-lg mb-8 text-left">
                  <h4 className="font-medium text-gray-800 mb-3">Order Summary</h4>
                  <p className="text-gray-600">Estimated delivery: 30-45 minutes</p>
                </div>
                <button
                  onClick={() => navigate('/')}
                  className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white py-3 px-8 rounded-lg font-medium transition-colors duration-300"
                >
                  Back to Home
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;