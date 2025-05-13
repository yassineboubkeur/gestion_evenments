



import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import BookingConfirmation from "./BookingConfirmation"; // Import your confirmation component

const PaymentProcedure = ({ event, onBack }) => {
    const [paymentError, setPaymentError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [mockCardDetails, setMockCardDetails] = useState({
        cardNumber: "",
        expiry: "",
        cvv: ""
    });
    const [confirmationData, setConfirmationData] = useState(null); // Add state for confirmation data

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: `Booking for ${event.name}`,
                    amount: {
                        value: event.price || "0.00",
                        currency_code: "USD",
                    },
                },
            ],
        });
    };

    const handlePaymentComplete = (paymentDetails) => {
        // Set the confirmation data in state
        setConfirmationData({
            event: event,
            paymentDetails: {
                id: paymentDetails.id,
                status: paymentDetails.status,
                amount: paymentDetails.purchase_units[0].amount.value,
                currency: paymentDetails.purchase_units[0].amount.currency_code,
                email: paymentDetails.payer.email_address,
                name: `${paymentDetails.payer.name.given_name} ${paymentDetails.payer.name.surname}`,
                date: paymentDetails.create_time
            }
        });
    };

    const onApprove = async (data, actions) => {
        try {
            setIsProcessing(true);
            const details = await actions.order.capture();
            handlePaymentComplete(details);
        } catch (err) {
            setPaymentError("Payment processing failed. Please try again.");
            console.error("Payment error:", err);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleMockPayment = async () => {
        if (!mockCardDetails.cardNumber || !mockCardDetails.expiry || !mockCardDetails.cvv) {
            setPaymentError("Please fill in all card details");
            return;
        }
    
        setIsProcessing(true);
        setPaymentError(null);

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            // Call your backend API to verify the mock payment
            const response = await fetch('http://localhost:8000/api/payments/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    event_id: event.id,
                    payment_id: `mock_${Math.random().toString(36).substr(2, 9)}`,
                    payer_email: user.email,
                    payer_name: user.name,
                    amount: event.price || "0.00",
                    status: "COMPLETED",
                    payment_date: new Date().toISOString()
                })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Payment failed');
            }
    
            // Set the confirmation data in state
            setConfirmationData({
                registration: {
                    payment_id: data.registration_id,
                    payment_status: "COMPLETED",
                    payment_amount: event.price || "0.00",
                    payer_email: user.email
                },
                event: event
            });
        } catch (err) {
            setPaymentError(err.message || "Mock payment failed. Please try again.");
            console.error("Mock payment error:", err);
        } finally {
            setIsProcessing(false);
        }
    };

    // If we have confirmation data, render the BookingConfirmation component
    if (confirmationData) {
        return <BookingConfirmation {...confirmationData} />;
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMockCardDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };
    // Rest of your existing PaymentProcedure component JSX
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Complete Your Booking
        </h2>

        <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
                Event Details
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg flex justify-between">
                <div>
                    <p className="font-medium">{event.name}</p>
                    <p className="text-gray-600">
                        {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                    <p className="text-gray-600">{event.location}</p>
                    <p className="font-semibold mt-2">
                        Total: {event.price ? `$${event.price}` : "Free"}
                    </p>
                </div>
                <div className="flex-shrink-0 mr-4">
                    <img
                        src={`http://127.0.0.1:8000/storage/${event.image}`}
                        alt={event.name}
                        className="w-[200px] h-[200px] object-cover rounded"
                    />
                </div>
            </div>
        </div>

        <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Select Payment Method
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                    onClick={() => setPaymentMethod("paypal")}
                    className={`p-4 border rounded-lg flex items-center justify-center ${paymentMethod === "paypal" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                >
                    <img 
                        src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" 
                        alt="PayPal" 
                        className="h-8"
                    />
                </button>
                <button
                    onClick={() => setPaymentMethod("mock")}
                    className={`p-4 border rounded-lg flex items-center justify-center ${paymentMethod === "mock" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                >
                    <div className="text-center">
                        <div className="font-medium">Credit Card</div>
                        <div className="text-sm text-gray-500">Mock Payment</div>
                    </div>
                </button>
            </div>
        </div>

        {paymentMethod === "paypal" && (
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    PayPal Payment Steps
                </h3>
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                            1
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-800">
                                Click "Pay with PayPal"
                            </h4>
                            <p className="text-gray-600 text-sm">
                                You'll be redirected to PayPal's secure payment page
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                            2
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-800">
                                Log in to your PayPal account
                            </h4>
                            <p className="text-gray-600 text-sm">
                                Use your existing PayPal credentials or pay with a credit/debit card
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                            3
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-800">
                                Review and confirm payment
                            </h4>
                            <p className="text-gray-600 text-sm">
                                Check the payment details and confirm the transaction
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                            4
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-800">
                                Return to our site
                            </h4>
                            <p className="text-gray-600 text-sm">
                                You'll be automatically redirected back after successful payment
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {paymentMethod === "mock" && (
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Mock Payment Details
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                        </label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={mockCardDetails.cardNumber}
                            onChange={handleInputChange}
                            placeholder="4242 4242 4242 4242"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            disabled={isProcessing}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date
                            </label>
                            <input
                                type="text"
                                name="expiry"
                                value={mockCardDetails.expiry}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                disabled={isProcessing}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                            </label>
                            <input
                                type="text"
                                name="cvv"
                                value={mockCardDetails.cvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                disabled={isProcessing}
                            />
                        </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm text-blue-700">
                            This is a mock payment system. No real transaction will occur.
                            Use any test values to proceed.
                        </p>
                    </div>
                </div>
            </div>
        )}

        {paymentError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {paymentError}
                <button
                    onClick={() => setPaymentError(null)}
                    className="ml-2 text-red-700 hover:text-red-900"
                >
                    ×
                </button>
            </div>
        )}

        {isProcessing ? (
            <div className="mb-6 p-4 bg-blue-100 text-blue-700 rounded-lg">
                Processing your payment...
            </div>
        ) : (
            <div className="mb-6">
                {paymentMethod === "paypal" && (
                    <PayPalScriptProvider
                        options={{
                            "client-id": "AS6Ilu10E0ZOGnhHDpn7U68A5_SIAyP5wRm_NWbrxqR_yX8nMhTkVZRK1VwV7DfgqkJr4IzxXZXMKVfb",
                            currency: "USD",
                            intent: "capture",
                        }}
                    >
                        <PayPalButtons
                            style={{
                                layout: "vertical",
                                color: "gold",
                                shape: "rect",
                                height: 45,
                            }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                            onCancel={onCancel}
                            disabled={isProcessing}
                        />
                    </PayPalScriptProvider>
                )}
                {paymentMethod === "mock" && (
                    <button
                        onClick={handleMockPayment}
                        className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
                    >
                        Complete Mock Payment
                    </button>
                )}
            </div>
        )}

        <div className="flex justify-between items-center border-t pt-4">
            <button
                onClick={onBack}
                disabled={isProcessing}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
            >
                Back to Event
            </button>
            {paymentMethod && (
                <button
                    onClick={() => setPaymentMethod("")}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                >
                    Change Payment Method
                </button>
            )}
        </div>
    </div>
    );
};

export default PaymentProcedure;


// import React, { useState } from "react";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useNavigate } from "react-router-dom";

// const PaymentProcedure = ({ event, onBack }) => {
//     const [paymentError, setPaymentError] = useState(null);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [paymentMethod, setPaymentMethod] = useState(""); // 'paypal' or 'mock'
//     const [mockCardDetails, setMockCardDetails] = useState({
//         cardNumber: "",
//         expiry: "",
//         cvv: ""
//     });
//     const navigate = useNavigate();

//     const createOrder = (data, actions) => {
//         return actions.order.create({
//             purchase_units: [
//                 {
//                     description: `Booking for ${event.name}`,
//                     amount: {
//                         value: event.price || "0.00",
//                         currency_code: "USD",
//                     },
//                 },
//             ],
//         });
//     };

//     const handlePaymentComplete = (paymentDetails) => {
//         // Prepare the data to pass to the confirmation page
//         const confirmationData = {
//             event: event,
//             paymentDetails: {
//                 id: paymentDetails.id,
//                 status: paymentDetails.status,
//                 amount: paymentDetails.purchase_units[0].amount.value,
//                 currency: paymentDetails.purchase_units[0].amount.currency_code,
//                 email: paymentDetails.payer.email_address,
//                 name: `${paymentDetails.payer.name.given_name} ${paymentDetails.payer.name.surname}`,
//                 date: paymentDetails.create_time
//             }
//         };

//         // Navigate to confirmation page with state
//         navigate('/booking-confirmation', { state: confirmationData });
//     };

//     const onApprove = async (data, actions) => {
//         try {
//             setIsProcessing(true);
//             const details = await actions.order.capture();
//             handlePaymentComplete(details);
//         } catch (err) {
//             setPaymentError("Payment processing failed. Please try again.");
//             console.error("Payment error:", err);
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     const onError = (err) => {
//         if (err.message.includes("popup close")) {
//             setPaymentError(
//                 "Payment window was closed. Please try again if you want to complete your booking."
//             );
//         } else {
//             setPaymentError(
//                 "Payment could not be processed. Please try another payment method."
//             );
//         }
//         console.error("PayPal error:", err);
//     };

//     const onCancel = (data) => {
//         setPaymentError(
//             "Payment was cancelled. You can try again if you change your mind."
//         );
//     };

//     const handleMockPayment = async () => {
//         if (!mockCardDetails.cardNumber || !mockCardDetails.expiry || !mockCardDetails.cvv) {
//             setPaymentError("Please fill in all card details");
//             return;
//         }
    
//         setIsProcessing(true);
//         setPaymentError(null);
        

//         try {

//             const user = JSON.parse(localStorage.getItem('user'));
//             // Call your backend API to verify the mock payment
//             const response = await fetch('http://localhost:8000/api/payments/verify', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`
//                 },
//                 body: JSON.stringify({
//                     event_id: event.id,
//                     payment_id: `mock_${Math.random().toString(36).substr(2, 9)}`,
//                     payer_email: user.email, // Get from user profile in real app
//                     payer_name: user.name,       // Get from user profile in real app
//                     amount: event.price || "0.00",
//                     status: "COMPLETED",
//                     payment_date: new Date().toISOString()
//                 })
//             });
    
//             const data = await response.json();
    
//             if (!response.ok) {
//                 throw new Error(data.message || 'Payment failed');
//             }
    
//             // Prepare confirmation data in the correct structure
//             const confirmationData = {
//                 registration: {
//                     payment_id: data.registration_id,
//                     payment_status: "COMPLETED",
//                     payment_amount: event.price || "0.00",
//                     payer_email: user.email
//                 },
//                 event: event
//             };
    
//             // Navigate to confirmation page
//             navigate('/booking-confirmation', { state: confirmationData });
//         } catch (err) {
//             setPaymentError(err.message || "Mock payment failed. Please try again.");
//             console.error("Mock payment error:", err);
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setMockCardDetails(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     return (
//         <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">
//             Complete Your Booking
//         </h2>

//         <div className="mb-8">
//             <h3 className="text-xl font-semibold text-gray-700 mb-3">
//                 Event Details
//             </h3>
//             <div className="bg-gray-50 p-4 rounded-lg flex justify-between">
//                 <div>
//                     <p className="font-medium">{event.name}</p>
//                     <p className="text-gray-600">
//                         {new Date(event.date).toLocaleDateString("en-US", {
//                             weekday: "short",
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                         })}
//                     </p>
//                     <p className="text-gray-600">{event.location}</p>
//                     <p className="font-semibold mt-2">
//                         Total: {event.price ? `$${event.price}` : "Free"}
//                     </p>
//                 </div>
//                 <div className="flex-shrink-0 mr-4">
//                     <img
//                         src={`http://127.0.0.1:8000/storage/${event.image}`}
//                         alt={event.name}
//                         className="w-[200px] h-[200px] object-cover rounded"
//                     />
//                 </div>
//             </div>
//         </div>

//         <div className="mb-6">
//             <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                 Select Payment Method
//             </h3>
//             <div className="grid grid-cols-2 gap-4 mb-6">
//                 <button
//                     onClick={() => setPaymentMethod("paypal")}
//                     className={`p-4 border rounded-lg flex items-center justify-center ${paymentMethod === "paypal" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
//                 >
//                     <img 
//                         src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" 
//                         alt="PayPal" 
//                         className="h-8"
//                     />
//                 </button>
//                 <button
//                     onClick={() => setPaymentMethod("mock")}
//                     className={`p-4 border rounded-lg flex items-center justify-center ${paymentMethod === "mock" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
//                 >
//                     <div className="text-center">
//                         <div className="font-medium">Credit Card</div>
//                         <div className="text-sm text-gray-500">Mock Payment</div>
//                     </div>
//                 </button>
//             </div>
//         </div>

//         {paymentMethod === "paypal" && (
//             <div className="mb-8">
//                 <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                     PayPal Payment Steps
//                 </h3>
//                 <div className="space-y-4">
//                     <div className="flex items-start">
//                         <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
//                             1
//                         </div>
//                         <div>
//                             <h4 className="font-medium text-gray-800">
//                                 Click "Pay with PayPal"
//                             </h4>
//                             <p className="text-gray-600 text-sm">
//                                 You'll be redirected to PayPal's secure payment page
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-start">
//                         <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
//                             2
//                         </div>
//                         <div>
//                             <h4 className="font-medium text-gray-800">
//                                 Log in to your PayPal account
//                             </h4>
//                             <p className="text-gray-600 text-sm">
//                                 Use your existing PayPal credentials or pay with a credit/debit card
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-start">
//                         <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
//                             3
//                         </div>
//                         <div>
//                             <h4 className="font-medium text-gray-800">
//                                 Review and confirm payment
//                             </h4>
//                             <p className="text-gray-600 text-sm">
//                                 Check the payment details and confirm the transaction
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex items-start">
//                         <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
//                             4
//                         </div>
//                         <div>
//                             <h4 className="font-medium text-gray-800">
//                                 Return to our site
//                             </h4>
//                             <p className="text-gray-600 text-sm">
//                                 You'll be automatically redirected back after successful payment
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )}

//         {paymentMethod === "mock" && (
//             <div className="mb-6">
//                 <h3 className="text-xl font-semibold text-gray-700 mb-4">
//                     Mock Payment Details
//                 </h3>
//                 <div className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Card Number
//                         </label>
//                         <input
//                             type="text"
//                             name="cardNumber"
//                             value={mockCardDetails.cardNumber}
//                             onChange={handleInputChange}
//                             placeholder="4242 4242 4242 4242"
//                             className="w-full p-2 border border-gray-300 rounded-md"
//                             disabled={isProcessing}
//                         />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Expiry Date
//                             </label>
//                             <input
//                                 type="text"
//                                 name="expiry"
//                                 value={mockCardDetails.expiry}
//                                 onChange={handleInputChange}
//                                 placeholder="MM/YY"
//                                 className="w-full p-2 border border-gray-300 rounded-md"
//                                 disabled={isProcessing}
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 CVV
//                             </label>
//                             <input
//                                 type="text"
//                                 name="cvv"
//                                 value={mockCardDetails.cvv}
//                                 onChange={handleInputChange}
//                                 placeholder="123"
//                                 className="w-full p-2 border border-gray-300 rounded-md"
//                                 disabled={isProcessing}
//                             />
//                         </div>
//                     </div>
//                     <div className="bg-blue-50 p-3 rounded-md">
//                         <p className="text-sm text-blue-700">
//                             This is a mock payment system. No real transaction will occur.
//                             Use any test values to proceed.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         )}

//         {paymentError && (
//             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
//                 {paymentError}
//                 <button
//                     onClick={() => setPaymentError(null)}
//                     className="ml-2 text-red-700 hover:text-red-900"
//                 >
//                     ×
//                 </button>
//             </div>
//         )}

//         {isProcessing ? (
//             <div className="mb-6 p-4 bg-blue-100 text-blue-700 rounded-lg">
//                 Processing your payment...
//             </div>
//         ) : (
//             <div className="mb-6">
//                 {paymentMethod === "paypal" && (
//                     <PayPalScriptProvider
//                         options={{
//                             "client-id": "AS6Ilu10E0ZOGnhHDpn7U68A5_SIAyP5wRm_NWbrxqR_yX8nMhTkVZRK1VwV7DfgqkJr4IzxXZXMKVfb",
//                             currency: "USD",
//                             intent: "capture",
//                         }}
//                     >
//                         <PayPalButtons
//                             style={{
//                                 layout: "vertical",
//                                 color: "gold",
//                                 shape: "rect",
//                                 height: 45,
//                             }}
//                             createOrder={createOrder}
//                             onApprove={onApprove}
//                             onError={onError}
//                             onCancel={onCancel}
//                             disabled={isProcessing}
//                         />
//                     </PayPalScriptProvider>
//                 )}
//                 {paymentMethod === "mock" && (
//                     <button
//                         onClick={handleMockPayment}
//                         className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
//                     >
//                         Complete Mock Payment
//                     </button>
//                 )}
//             </div>
//         )}

//         <div className="flex justify-between items-center border-t pt-4">
//             <button
//                 onClick={onBack}
//                 disabled={isProcessing}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
//             >
//                 Back to Event
//             </button>
//             {paymentMethod && (
//                 <button
//                     onClick={() => setPaymentMethod("")}
//                     disabled={isProcessing}
//                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
//                 >
//                     Change Payment Method
//                 </button>
//             )}
//         </div>
//     </div>
//     );
// };

// export default PaymentProcedure;

