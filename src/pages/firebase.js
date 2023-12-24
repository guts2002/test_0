import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBqDLMOdA7XX1JOu3kkvGRhoTUiaI_JGJw",
  authDomain: "test-4f607.firebaseapp.com",
  databaseURL: "https://test-4f607-default-rtdb.firebaseio.com",
  projectId: "test-4f607",
  storageBucket: "test-4f607.appspot.com",
  messagingSenderId: "15015703257",
  appId: "1:15015703257:web:e6deca69f53021c8b204c8",
  measurementId: "G-VBKMZD35HC"
};


const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  

  export{auth, createUserWithEmailAndPassword};
export default app;

