import React, { useState } from "react";

const LikesOption = ({ eventId, likesCount, isLiked, onLikeToggle }) => {
    const handleLike = (e) => {
        e.stopPropagation();
        onLikeToggle(eventId);
    };

    return (
        <div className="absolute top-3 left-3 flex items-center space-x-1">
            <button
                onClick={handleLike}
                className="p-2 rounded-full bg-white/90 shadow-sm hover:bg-gray-100 transition-colors"
            >
                {/* {console.log(`Event ${eventId} isLiked:`, isLiked, "likesCount:", likesCount)} */}
                <svg
                    className={`w-5 h-5 ${
                        isLiked
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    ></path>
                </svg>
            </button>
            <span className="text-sm text-gray-600 bg-white/90 px-2 py-1 rounded-full">
                {likesCount}
            </span>
        </div>
    );
};

export default LikesOption;

