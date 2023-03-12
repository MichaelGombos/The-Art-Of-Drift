// this should hold common database queries / posts such as:

// AUTH : creating a new account, logging out of your account, editing account details, signing in annonymously, signing into an account, deleting your account

// DATABASE-USERS : edit user profile, delete user profile

// DATABASE-LEADERBOARD : pulling the current players replay on a map, pulling a specified replay base on UID and map ID? pulling a list of all replay info on a map, adding a replay to the database, deleting a replay from database

// DATABASE-MAPS : adding a new map to the database (w/ unique map ID), pulling a list of maps from the database, pulling a list of only maps you created, pulling a map based on map ID. deleting a map from the database 

import { app,analytics,auth,db } from "./firebase";

import { collection, addDoc, setDoc , doc, getDoc, deleteDoc} from "firebase/firestore";

import { createUserWithEmailAndPassword, signOut, deleteUser,signInAnonymously, linkWithCredential, EmailAuthProvider } from "firebase/auth";

//tests

export const printUserProfile = () => {
  const userID = auth.currentUser.uid;
  console.log("THIS IS YOUR USER OBJECT" , auth.currentUser)
}

//--------------AUTH

export const emailSignUp = (email,password, racerName="unset", profileAvatarId=1, profileVehicleId=1) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then(userCredential => {    
    updateProfileUID(userCredential.user.uid, racerName,profileAvatarId, profileVehicleId)
  }).catch(error => {
    console.log(error);
  })

}
export const emailSignIn = (email,password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    console.log(userCredential)
  }).catch(error => {
    console.log(error);
  })
}
export const guestSignIn = (AID,VID) => {
  signInAnonymously(auth)
  .then( async(cred) => {
    getGuestAmount().then( (amount) => {
    let result = amount.toString().padStart(6, '0')
    updateProfileUID(cred.user.uid, `Guest#${result}` , AID, VID);
    incrementGuestAmount(amount)
    }
  )

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
    console.log("error on signin" , errorMessage)
  });

}

export const guestUpgrade = (email,password, racerName="unset", AID=1,VID=1) => {

  const credential = EmailAuthProvider.credential(email, password);

  linkWithCredential(auth.currentUser, credential)
  .then((usercred) => {
    const user = usercred.user;
    console.log("Anonymous account successfully upgraded", user);

    updateProfile(racerName,AID,VID);
  }).catch((error) => {
    console.log("Error upgrading anonymous account", error);
  });
}

export const logOut = () => {
  signOut(auth).then(() => {
    console.log('sign out siccessful')
  }).catch(error => console.log(error))
}
export const deleteAccount = () => {
  const user = auth.currentUser;
  const id = user.uid;
  deleteUser(user).then(() => {
    console.log(`user deleted ${user} with the ud ${id}`)
    deleteProfileUID(id);
  }).catch((error) => {
    // An error ocurred
    // ...
  });
}
export const deleteAccountUID = () => {}
//--------------DB-USERS

export const updateProfile = async(displayName,AID,VID) => {
  try {
    const id = auth.currentUser.uid;

    console.log(displayName,AID,VID)
    const docRef = await setDoc(doc(db, "users", id), {
      displayName: displayName,
      avatarId: AID,
      vehicleID: VID
    });
  
    console.log("Update profile on ID: ",id );
  } catch (e) {
    console.error("error updating profile: ", e);
  }
}
export const updateProfileUID = async(UID, displayName,AID,VID) => {
  try {

    console.log(displayName,AID,VID)
    const docRef = await setDoc(doc(db, "users", UID), {
      displayName: displayName,
      avatarId: AID,
      vehicleID: VID
    });
  
    console.log("Document written with ID: ",UID );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const incrementGuestAmount = async(currentAmount) => {
  try {
    const docRef = await setDoc(doc(db, "stats", "guests"), {
      total: currentAmount+1
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getGuestAmount = async() => {
  const docRef = doc(db, "stats", "guests");
  const docSnap = await getDoc(docRef);
  console.log(auth.currentUser.uid);
  if (docSnap.exists()) {
    return docSnap.data().total;
  } else {
    // doc.data() will be undefined in this case
    console.log("cant get guest amount!");
  }
}

export const getCurrenAuthProfile = async() => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  console.log(auth.currentUser.uid);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
} 
export const getProfileUID = async(UID) => {
  const docRef = doc(db, "users", UID);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  
}
export const deleteProfile = () => {}
export const deleteProfileUID = async(UID) => {
  await deleteDoc(doc(db, "users", UID));
}

//--------------DB-LEADERBOARD

export const getCurrentAuthReplay = (mapID) => {}
export const getUIDReplay = (UID) => {}
export const getAllReplays = (mapID) => {}
export const addReplay = (UID,mapID) => {}
export const deleteReplay = (UID,mapId) => {}

//--------------DB-MAPS

export const addMap = (map,mapInfo) => {}
export const getAllMaps = () => {}
export const getCurrentAuthMaps = () => {}
export const getUIDMaps = () => {}
export const getMap = (mapID) => {}
export const deleteMap = (mapId) => {}

