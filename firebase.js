import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCEWeltFVAL9Elx_g3hyVnSbDvndgShPUM",
    authDomain: "innobot-health.firebaseapp.com",
    projectId: "innobot-health",
    storageBucket: "innobot-health.appspot.com",
    messagingSenderId: "619419260859",
    appId: "1:619419260859:web:ab72f87262a8cd40ba169e",
    measurementId: "G-XV410LL0JM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app, auth};