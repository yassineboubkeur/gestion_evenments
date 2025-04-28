import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaymentProcedure = ({ event, onBack, onPaymentComplete }) => {
  const [paymentError, setPaymentError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        description: `Booking for ${event.name}`,
        amount: {
          value: event.price || '0.00',
          currency_code: "USD"
        }
      }]
    });
  };

  const onApprove = async (data, actions) => {
    try {
      setIsProcessing(true);
      const details = await actions.order.capture();
      onPaymentComplete(details);
    } catch (err) {
      setPaymentError('Payment processing failed. Please try again.');
      console.error("Payment error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const onError = (err) => {
    // Specific handling for popup close
    if (err.message.includes("popup close")) {
      setPaymentError('Payment window was closed. Please try again if you want to complete your booking.');
    } else {
      setPaymentError('Payment could not be processed. Please try another payment method.');
    }
    console.error("PayPal error:", err);
  };

  const onCancel = (data) => {
    setPaymentError('Payment was cancelled. You can try again if you change your mind.');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
      {/* ... (keep your existing event details UI) ... */}

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
        <PayPalScriptProvider 
          options={{ 
            "client-id": "YOUR_CLIENT_ID",
            "currency": "USD",
            "intent": "capture"
          }}
        >
          <div className="mb-6">
            <PayPalButtons
              style={{ 
                layout: "vertical",
                color: "gold",
                shape: "rect",
                height: 45
              }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              onCancel={onCancel}
              disabled={isProcessing}
            />
          </div>
        </PayPalScriptProvider>
      )}

      <div className="flex justify-between items-center border-t pt-4">
        <button
          onClick={onBack}
          disabled={isProcessing}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
        >
          Back to Event
        </button>
      </div>
    </div>
  );
};

export default PaymentProcedure;
// import React from 'react';

// const PaymentProcedure = ({ event, onBack, onPaymentComplete }) => {
//   return (
//     <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Booking</h2>
      
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold text-gray-700 mb-3">Event Details</h3>
//         <div className="bg-gray-50 p-4 rounded-lg">
//           <p className="font-medium">{event.name}</p>
//           <p className="text-gray-600">{new Date(event.date).toLocaleDateString('en-US', {
//             weekday: 'short',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//           })}</p>
//           <p className="text-gray-600">{event.location}</p>
//           <p className="font-semibold mt-2">
//             Total: {event.price ? `$${event.price}` : 'Free'}
//           </p>
//         </div>
//       </div>

//       <div className="mb-8">
//         <h3 className="text-xl font-semibold text-gray-700 mb-4">PayPal Payment Steps</h3>
//         <div className="space-y-4">
//           <div className="flex items-start">
//             <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
//               1
//             </div>
//             <div>
//               <h4 className="font-medium text-gray-800">Click "Pay with PayPal"</h4>
//               <p className="text-gray-600 text-sm">You'll be redirected to PayPal's secure payment page</p>
//             </div>
//           </div>

//           <div className="flex items-start">
//             <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
//               2
//             </div>
//             <div>
//               <h4 className="font-medium text-gray-800">Log in to your PayPal account</h4>
//               <p className="text-gray-600 text-sm">Use your existing PayPal credentials or pay with a credit/debit card</p>
//             </div>
//           </div>

//           <div className="flex items-start">
//             <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
//               3
//             </div>
//             <div>
//               <h4 className="font-medium text-gray-800">Review and confirm payment</h4>
//               <p className="text-gray-600 text-sm">Check the payment details and confirm the transaction</p>
//             </div>
//           </div>

//           <div className="flex items-start">
//             <div className="flex-shrink-0 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
//               4
//             </div>
//             <div>
//               <h4 className="font-medium text-gray-800">Return to our site</h4>
//               <p className="text-gray-600 text-sm">You'll be automatically redirected back after successful payment</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-between items-center border-t pt-4">
//         <button
//           onClick={onBack}
//           className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
//         >
//           Back to Event
//         </button>
//         <button
//           onClick={onPaymentComplete}
//           className="px-6 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 transition flex items-center"
//         >
//           <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M10 13l-1.5 1.5L5 11l1.5-1.5L10 13zm4 0l6.5-6.5L21 8l-6.5 6.5L14 13zm-8 6l1.5-1.5L14 16l-1.5-1.5L6 19z" />
//           </svg>
//           Pay with PayPal
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentProcedure;