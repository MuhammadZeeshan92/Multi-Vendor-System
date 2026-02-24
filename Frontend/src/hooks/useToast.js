import { useState } from 'react';
import Toast from '../components/Toast';

const useToast = () => {
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'info' }), 3000);
  };

  const ToastContainer = () => <Toast {...toast} onClose={() => setToast({ message: '', type: 'info' })} />;

  return { showToast, ToastContainer };
};

export default useToast;