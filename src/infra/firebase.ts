import * as firebase from "firebase";

import config from "../config";

const { apiKey, projectId } = config.firebase;

export function initialize(): void {
    firebase.initializeApp({
        apiKey,
        authDomain: `${projectId}.firebaseapp.com`,
        databaseURL: `https://${projectId}.firebaseio.com`,
        storageBucket: `${projectId}.appspot.com`,
    });
}

export async function signIn(): Promise<void> {
    await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

export async function deleteAccount(): Promise<void> {
    await firebase.auth().currentUser.delete();
}

export function onAuthStateChanged(callback: (user: firebase.User) => void): void {
    firebase.auth().onAuthStateChanged(callback);
}
