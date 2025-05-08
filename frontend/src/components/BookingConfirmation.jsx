import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const BookingConfirmation = () => {
  const { state } = useLocation();
  const { registration, event } = state || {};

  if (!registration || !event) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Booking Not Found</h2>
        <p className="text-gray-700 mb-4">
          We couldn't find your booking details. Please check your email for confirmation or contact support.
        </p>
        <Link
          to="/"
          className="inline-block mt-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-green-600 mb-2">🎉 Booking Confirmed!</h2>
        <p className="text-gray-700">Thank you for your reservation. See the details below:</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Event Details</h3>
        <div className="bg-green-50 p-4 rounded-lg space-y-1">
          <p className="font-medium text-gray-900">{event.name}</p>
          <p className="text-gray-600">
            {new Date(event.date).toLocaleDateString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <p className="text-gray-600">{event.location}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Details</h3>
        <div className="bg-blue-50 p-4 rounded-lg space-y-1">
          <p className="font-medium text-gray-900">Order #: {registration.payment_id}</p>
          <p className="text-gray-600">Status: {registration.payment_status}</p>
          <p className="text-gray-600">Amount Paid: ${registration.payment_amount}</p>
          <p className="text-gray-600">Confirmation sent to: {registration.payer_email}</p>
        </div>
      </div>

      <div className="border-t pt-4 text-gray-700">
        <p className="mb-4">A confirmation email has been sent to your inbox.</p>
        <Link
          to="/"
          className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;
