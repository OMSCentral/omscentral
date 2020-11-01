import React, { createContext, useState } from 'react';

import { Nullable } from 'src/core';
import Toast, { Props as ToastProps, Variant } from './components/Toast';

type NotifyFn = (message: string) => void;

interface Notification {
  success: NotifyFn;
  warning: NotifyFn;
  error: NotifyFn;
  info: NotifyFn;
}

type ToastType = Omit<ToastProps, 'onClose'>;

export const NotificationContext = createContext<Nullable<Notification>>(null);

const Notification: React.FC = ({ children }) => {
  const [toast, setToast] = useState<Nullable<ToastType>>(null);

  const notifyFnFactory = (variant: Variant): NotifyFn => (message) => {
    setToast({ variant, message });
  };

  return (
    <NotificationContext.Provider
      value={{
        success: notifyFnFactory('success'),
        warning: notifyFnFactory('warning'),
        error: notifyFnFactory('error'),
        info: notifyFnFactory('info'),
      }}
    >
      {children}
      {toast && (
        <Toast
          variant={toast.variant}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </NotificationContext.Provider>
  );
};

export default Notification;
