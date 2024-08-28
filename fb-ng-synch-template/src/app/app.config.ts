import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: "AIzaSyBYQ7hK0in7q8ccZQ-h5EfcDcKreozU4XA",
  authDomain: "danotes-abbc2.firebaseapp.com",
  databaseURL: "https://danotes-abbc2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "danotes-abbc2",
  storageBucket: "danotes-abbc2.appspot.com",
  messagingSenderId: "5725773713",
  appId: "1:5725773713:web:bf129d0e4ba5d254b90430"
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ]
};
