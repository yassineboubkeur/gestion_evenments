import { createContext, useContext, useState } from 'react';

const LikesContext = createContext();

export const LikesProvider = ({ children }) => {
  const [likedEvents, setLikedEvents] = useState([]);

  const fetchUserLikes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://127.0.0.1:8000/api/user/likes", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setLikedEvents(data.liked_events.map(event => event.id));
      }
    } catch (error) {
      console.error("Error fetching user likes:", error);
    }
  };

  const toggleLike = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return { needsLogin: true };

      const isLiked = likedEvents.includes(eventId);
      const method = isLiked ? "DELETE" : "POST";

      const response = await fetch(
        `http://127.0.0.1:8000/api/events/${eventId}/likes`,
        {
          method,
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error(`Failed to ${isLiked ? 'unlike' : 'like'} event`);

      // Update local state
      if (isLiked) {
        setLikedEvents(prev => prev.filter(id => id !== eventId));
      } else {
        setLikedEvents(prev => [...prev, eventId]);
      }

      return { success: true };
    } catch (error) {
      console.error("Error toggling like:", error);
      return { error: error.message };
    }
  };

  return (
    <LikesContext.Provider value={{ likedEvents, fetchUserLikes, toggleLike }}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => {
  const context = useContext(LikesContext);
  if (!context) {
    throw new Error('useLikes must be used within a LikesProvider');
  }
  return context;
};