import { useCallback } from 'react';
import { Bounce, toast } from 'react-toastify';

export function useErrorNotifications({
  errorMsg,
  toastId,
  isError = true,
}: {
  errorMsg?: string;
  toastId?: string;
  isError?: boolean;
}) {
  const showErrorToast = useCallback(() => {
    if (errorMsg == null || toastId == null || !isError) {
      return;
    }
    toast.error(`${errorMsg}`, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
      toastId: toastId,
    });
  }, [errorMsg, toastId, isError]);

  return { showErrorToast };
  // const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // const addError = useCallback((message: string) => {
  //   setErrorMessages(prevMessages => [...prevMessages, message]);
  //   // Optionally, set a timeout to clear the message
  // }, []);

  // const clearErrors = useCallback(() => {
  //   setErrorMessages([]);
  // }, []);

  // return { errorMessages, addError, clearErrors };
}

// // In your ky setup (e.g., api.js)
// import ky from 'ky';
// import { useErrorNotifications } from './useErrorNotifications'; // Imagine this is globally available or passed in

// const api = ky.extend({
//   hooks: {
//     beforeError: [
//       async (error) => {
//         // Access the addError function from the hook (requires careful integration, e.g., via a global context)
//         // For simplicity, let's assume a global function 'addGlobalError' is available
//         // addGlobalError(error.message || 'An unknown error occurred.');
//         console.error('API Error:', error);
//       }
//     ]
//   }
// });

// // In your App.js or a top-level component
// import React from 'react';
// import { useErrorNotifications } from './useErrorNotifications';

// function App() {
//   const { errorMessages } = useErrorNotifications();

//   return (
//     <div>
//       {errorMessages.map((msg, index) => (
//         <div key={index} className="error-message">
//           {msg}
//         </div>
//       ))}
//       {/* Your other components */}
//     </div>
//   );
// }
