// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDooSBpZFwmVk5cXWgE8Gkkl9Xsh20sYZA",
  authDomain: "login-form-74e1d.firebaseapp.com",
  projectId: "login-form-74e1d",
  storageBucket: "login-form-74e1d.firebasestorage.app",
  messagingSenderId: "250173633324",
  appId: "1:250173633324:web:8144b9e008087f369df289",
  measurementId: "G-4FW1XQRPQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
// export default app;
export { analytics,auth }; // Export analytics if needed elsewhere