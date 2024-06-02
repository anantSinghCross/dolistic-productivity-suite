import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6IdKzsL8O34eAukbaxMelNmeEz-tUCK0",
  authDomain: "dolistic-app.firebaseapp.com",
  projectId: "dolistic-app",
  storageBucket: "dolistic-app.appspot.com",
  messagingSenderId: "499889786112",
  appId: "1:499889786112:web:c6e9781b27dbbe9633f7e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const COLLECTION = {
  TASKS : 'tasks',
  NOTES : 'notes',
  GOALS : 'goals',
}
export default app;