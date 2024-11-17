// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js"

const firebaseConfig = {
    apiKey: "AIzaSyAWjUl1um01-IcuaNOceTSHnIK4OCPPjLY",
    authDomain: "flashly-30428.firebaseapp.com",
    projectId: "flashly-30428",
    storageBucket: "flashly-30428.firebasestorage.app",
    messagingSenderId: "169889460349",
    appId: "1:169889460349:web:d268da59334312fe5dc114",
    measurementId: "G-9FCSLT4MFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messaging = getMessaging(app);

// Add a studyset
export async function addStudysetToFirebase(studyset) {
  try {
    const docRef = await addDoc(collection(db, "studysets"), studyset);
    return { id: docRef.id, ...studyset };
  } catch (e) {
    console.error("Error adding studyset: ", e);
  }
}

export async function getStudysetsFromFirebase() {
  const studysets = [];
  try {
    const querySnapshot = await getDocs(collection(db, "studysets"));
    querySnapshot.forEach((doc) => {
      studysets.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.error("Error retrieving studysets: ", e);
  }
  return studysets;
}

export async function deleteStudysetFromFirebase(id) {
  try {
    await deleteDoc(doc(db, "studysets", id));
  } catch (e) {
    console.error("Error deleting studyset: ", e);
  }
}

export async function updateStudysetInFirebase(id, updatedData) {
  try {
    const studysetRef = doc(db, "studysets", id);
    await updateDoc(studysetRef, updatedData);
  } catch (e) {
    console.error("Error updating studyset: ", e);
  }
}

export { messaging, getToken, onMessage };