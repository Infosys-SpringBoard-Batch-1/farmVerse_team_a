import { useState } from 'react';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const clearAll = () => {
    setNotifications([]);
  };

  return { notifications, unreadCount, markAllAsRead, clearAll };
};
