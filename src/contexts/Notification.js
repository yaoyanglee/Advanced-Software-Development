import React, { useState, useEffect } from "react";

const Notification = ({ message, show, duration = 5000 }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true); // Make the notification visible
      const timer = setTimeout(() => setVisible(false), duration); // Hide after the specified duration
      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [show, duration]);

  if (!visible) return null; // If not visible, don't render the notification

  // Determine the notification color based on the message
  const notificationStyle =
    message === "Already in the list" ? "bg-red-500" : "bg-green-500";

  return (
    <div
      className={`fixed bottom-4 right-4 ${notificationStyle} text-white px-4 py-2 rounded shadow-lg`}
    >
      {message}
    </div>
  );
};

export default Notification;
