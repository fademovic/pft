// Main context for things which are common to all components not only to specific part of it

import React, { createContext, useEffect, useMemo, useState, useContext, useCallback } from 'react';

import { Notification, UserInfo } from 'utils/types';

interface RootContextProps {
  children: JSX.Element;
}

interface RootContextType {
  notifications: Array<Notification>;
  showNotification: (message: string, type: string) => void;
  clearNotification: () => void;
  currentUser: UserInfo;
}

const RootContext = createContext<RootContextType | null>(null);

export const RootProvider = ({ children }: RootContextProps) => {
  const [isAppInitialized, setIsAppInitialized] = useState(false);
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const [currentUser, setCurrentUser] = useState<UserInfo>({ name: '' });

  const setCurrentUserDetails = useCallback((user: UserInfo) => {
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    const isLoggedIn = true; // Assumed that there is some kind of auth service which checks if user is logged in

    // Checks if user is logged in.
    if (isLoggedIn) {
      setCurrentUserDetails({ name: 'Fadil Ademovic' });
    }

    setIsAppInitialized(true);
  }, [setCurrentUserDetails]);

  const showNotification = useCallback(
    (message: string, type: string): void => {
      const notification = { message, type };
      notifications.push(notification);
      setNotifications(notifications);
    },
    [setNotifications, notifications]
  );

  const clearNotification = useCallback(() => setNotifications(() => []), [setNotifications]);

  const context = useMemo(
    () => ({
      notifications,
      showNotification,
      clearNotification,
      currentUser
    }),
    [clearNotification, notifications, showNotification, currentUser]
  );

  if (!isAppInitialized) return null;

  return <RootContext.Provider value={context}>{children}</RootContext.Provider>;
};

export const RootConsumer = RootContext.Consumer;

export const useRoot = () => {
  const context = useContext(RootContext);

  if (!context) {
    throw new Error('useRoot must be used within a RootProvider. Call RootProvider in the grand-parent component first.');
  }

  return context;
};
