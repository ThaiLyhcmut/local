// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js"
import { getDatabase, ref, set, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { collection } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyCm3rbJiOjdvUS_xj5Y_rDGsVr3y12vv4M",
  authDomain: "localhot-9b0dd.firebaseapp.com",
  projectId: "localhot-9b0dd",
  storageBucket: "localhot-9b0dd.appspot.com",
  messagingSenderId: "880664063469",
  appId: "1:880664063469:web:3a9b4fd635a5ca0952cbe4",
  databaseURL: "https://localhot-9b0dd-default-rtdb.asia-southeast1.firebasedatabase.app" // Correct URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
 

document.getElementById('login').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      document.getElementById('user-container').style.display = 'none';
      document.getElementById('logout').style.display = 'block';
      document.getElementById('location-container').style.display = 'block';
    })
    .catch(error => console.error(error.message));
});

document.getElementById('signup').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  createUserWithEmailAndPassword(auth,email, password)
    .then(userCredential => {
      document.getElementById('user-container').style.display = 'none';
      document.getElementById('logout').style.display = 'block';
      document.getElementById('location-container').style.display = 'block';
    })
    .catch(error => console.error(error.message));
});

document.getElementById('logout').addEventListener('click', () => {
  signOut(auth).then(() => {
    document.getElementById('user-container').style.display = 'block';
    document.getElementById('logout').style.display = 'none';
    document.getElementById('location-container').style.display = 'none';
  });
});

document.getElementById('getLocation').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      document.getElementById('location').textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
      const user = auth.currentUser;
      if (user) {
        set(push(ref(db, 'locations/' + user.uid)),{
          latitude,
          longitude,
        })
        .then(() => console.log('Location saved'))
        .catch(error => console.error('Error saving location: ', error));
      }
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
});