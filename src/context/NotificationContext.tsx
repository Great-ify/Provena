/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AppNotification } from '../types';

interface NotificationContextProps {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (title: string, message: string, type?: AppNotification['type']) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export function NotificationContextProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('provena_notifications');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    try {
      localStorage.setItem('provena_notifications', JSON.stringify(notifications));
    } catch (err) {
      console.error('Failed to save notifications to localStorage', err);
    }
  }, [notifications]);

  const addNotification = (title: string, message: string, type: AppNotification['type'] = 'info') => {
    const newNotification: AppNotification = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title,
      message,
      timestamp: new Date().toISOString(),
      type,
      read: false
    };

    setNotifications(prev => {
      const updated = [newNotification, ...prev];
      // Max history of 50 notifications
      return updated.slice(0, 50);
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearAll,
      removeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationContextProvider');
  }
  return context;
}
