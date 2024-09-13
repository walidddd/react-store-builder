// Usage in a React component
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';

const ToastContainer = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state: any) => state.toastAlerts.toasts);
  const toastRef: any = React.useRef(null);

  React.useEffect(() => {
    if (toasts.length > 0) {
      toasts.forEach((toast: any) => {
        toastRef.current.show(toast);
      });
    }
  }, [toasts, dispatch]);

  return (
    <div>
      <Toast ref={toastRef} />
    </div>
  );
};

export default ToastContainer;
