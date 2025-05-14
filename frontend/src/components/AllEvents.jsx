import React from "react";
import DotsLoadingAnimation from "./LoadingAnimation/LoadingAnimation";
import LikesOption from "./LikesOption";

const AllEvents = ({
  loading,
  filteredEvents,
  currentEvents,
  eventsPerPage,
  currentPage,
  totalPages,
  paginate,
  setShowEventDetails,
  setEventId,
  handleLike,
}) => {
  // Function to check if event is upcoming
  const isEventUpcoming = (eventDate) => {
    const now = new Date();
    const eventDateObj = new Date(eventDate);
    return eventDateObj > now;
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="z-20">
            <DotsLoadingAnimation size="lg" />
          </div>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 text-gray-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No events found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Discover Events
              <span className="ml-2 text-sm font-normal bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full">
                {filteredEvents.length}{" "}
                {filteredEvents.length === 1 ? "event" : "events"}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white/80 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative cursor-pointer backdrop-blur-sm"
                onClick={() => {
                  setShowEventDetails(true);
                  setEventId(event.id);
                }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000/storage/${event.image}`}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                    <span className="bg-white/90 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                      {event.category}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full shadow-md ${
                        isEventUpcoming(event.date)
                          ? "bg-green-300 text-green-800"
                          : "bg-red-300 text-red-800"
                      }`}
                    >
                      {isEventUpcoming(event.date) ? "Upcoming" : "Closed"}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-blue-700 bg-white bg-opacity-85 rounded-full px-2 py-1 font-medium">
                      {event.price ? `$${event.price}` : "Free"}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                      {event.name}
                    </h3>
                    <div className="flex items-center text-gray-500 mt-1 text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      <span>{event.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3 text-sm">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {event.description}
                  </p>

                  <div className="mt-auto flex justify-between items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowEventDetails(true);
                        setEventId(event.id);
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center transition-colors text-sm"
                    >
                      View Details
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <LikesOption
                  eventId={event.id}
                  likesCount={event.likes_count}
                  isLiked={event.is_liked}
                  onLikeToggle={handleLike}
                />
              </div>
            ))}
          </div>

          {filteredEvents.length > eventsPerPage && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-l-md border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-4 py-2 border-t border-b ${
                        currentPage === number
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-r-md border ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllEvents;