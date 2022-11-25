import { initializeApp } from 'firebase/app'
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth'
import {
	getFirestore, 
	doc,
	getDoc, 
	setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBSXPQqINRUMxJLe7X_2MSmZHkYVzHdUvg',
	authDomain: 'crwn-clothing-db-7f0d1.firebaseapp.com',
	projectId: 'crwn-clothing-db-7f0d1',
	storageBucket: 'crwn-clothing-db-7f0d1.appspot.com',
	messagingSenderId: '803434404959',
	appId: '1:803434404959:web:a1dd1b132dc661bfb04fea',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid)
	const userSnapshot = await getDoc(userDocRef)

	if(!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = newDate()

		try {
			await setDoc(userDocRef, {
				displayName, 
				email, 
				createdAt
			})
		} catch (error) {
			console.log('Error creating the user', error.message)
		}
	}

	return userDocRef
}