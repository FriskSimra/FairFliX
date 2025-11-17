import { useState, useEffect } from 'react';

function Notification({ message, type = 'success', duration = 5000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`notification notification-${type} ${visible ? 'show' : ''}`}>
      <span>{message}</span>
      <button className="notification-close" onClick={() => setVisible(false)}>×</button>
    </div>
  );
}

export default Notification;