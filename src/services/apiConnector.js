import axios from "axios"
import { toast } from "react-hot-toast"


export const axiosInstance = axios.create({});


// Add a request interceptor to include sessionId in headers
axiosInstance.interceptors.request.use(
    config => {
        const sessionId = localStorage.getItem('sessionId');
        if (sessionId) {
            config.headers['sessionId'] = sessionId;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 errors
// axiosInstance.interceptors.response.use(
//     response => response,
//     async error => {

//         console.log("Error", error)
//         if (error.response && error.response.status === 403) {
//             toast.error(error.response.data.message || 'Unauthorized');
//             // Clear session data
//             // localStorage.removeItem('sessionId');
//             localStorage.clear();
//             // Clear cookies if applicable
//             // document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//             // Redirect to login page
//             setTimeout(() => {
//                 window.location.href = '/login';
//             }, 3000); // Redirect after 2 seconds to allow the toast to be shown

//             // Throw error to stop further processing (optional)
//             throw error;
//         }

//         return Promise.reject(error);
//     }
// );
let isToastDisplayed = false; // Flag to track if toast is displayed

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        console.log("Error", error);

        if (error.response && error.response.status === 403) {
            // Check if another toast is already displayed
            if (!isToastDisplayed) {
                isToastDisplayed = true; // Set flag to true

                // Show toast notification with the error message from backend
                toast.error(error.response.data.message || 'Unauthorized', {
                    onClose: () => {
                        isToastDisplayed = false; // Reset flag when toast is closed
                    }
                });

                // Clear session data or perform other necessary actions
                localStorage.clear(); // Clear local storage

                // Delay redirection to login page
                setTimeout(() => {
                    window.location.href = '/login'; // Redirect after 3 seconds
                }, 3000);

                // Throw error to stop further processing (optional)
                throw error;
            } else {
                console.log("Another toast is already displayed. Waiting for it to close.");
            }
        }

        return Promise.reject(error);
    }
);



export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null,
    });
}