// this should hold common database queries / posts such as:

// AUTH : creating a new account, logging out of your account, editing account details, signing in annonymously, signing into an account, deleting your account

// DATABASE-USERS : edit user profile, delete user profile

// DATABASE-LEADERBOARD : pulling the current players replay on a map, pulling a specified replay base on UID and map ID? pulling a list of all replay info on a map, adding a replay to the database, deleting a replay from database

// DATABASE-MAPS : adding a new map to the database (w/ unique map ID), pulling a list of maps from the database, pulling a list of only maps you created, pulling a map based on map ID. deleting a map from the database 

import { app,analytics,auth,db } from "./firebase";

import { collection, addDoc, setDoc , doc, getDoc,getDocs, deleteDoc, serverTimestamp, query, orderBy, limit, updateDoc, where} from "firebase/firestore";

import { createUserWithEmailAndPassword, signOut, deleteUser,signInAnonymously, linkWithCredential, EmailAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

//-----------MISC
export const getDatabaseTime = () => {
  return serverTimestamp();
}

export const printUserProfile = () => {
  const userID = auth.currentUser.uid;
  console.log("THIS IS YOUR USER OBJECT" , auth.currentUser)
}

//--------------AUTH

export const emailSignUp = (destination, email,password, racerName="unset", profileAvatarId=1, profileVehicleId=1) => {
  window.setAsyncLoader(true)
  createUserWithEmailAndPassword(auth, email, password)
  .then(userCredential => {    
    updateProfileUID(userCredential.user.uid, racerName,profileAvatarId, profileVehicleId)
    window.changeGUIScreen(destination);

    window.addResultMessage(false,"Success signing up with email!")
    window.setAsyncLoader(false)
  }).catch(error => {
    console.log(error);
    window.addResultMessage(true,"error signing up with email!")
    window.setAsyncLoader(false)
  })

}
export const emailSignIn = (destination,email,password) => {
  window.setAsyncLoader(true)
  signInWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    window.changeGUIScreen(destination);
    window.addResultMessage(false,"Success signing in with email!")
    window.setAsyncLoader(false)
  }).catch(error => {
    console.log(error);
    window.addResultMessage(true,"Error signing in with email!")
    window.setAsyncLoader(false)
  })
}
export const guestSignIn = (destination, AID,VID) => {
  window.setAsyncLoader(true)
  signInAnonymously(auth)
  .then( async(cred) => {
    getGuestAmount().then( (amount) => {
    let result = amount.toString().padStart(6, '0')
    updateProfileUID(cred.user.uid, `Guest#${result}` , AID, VID);
    incrementGuestAmount(amount)
    if(destination){
      window.changeGUIScreen(destination);
    }

    window.setAsyncLoader(false)
    window.addResultMessage(false,"Success signing in as a guest!")
    }
  )

  })
  .catch((error) => { 

    window.addResultMessage(true,error.message)
    console.log("error on signin" , error)
    window.setAsyncLoader(false)
  });

}

export const guestUpgrade = (destination, email,password, racerName="unset", AID=1,VID=1) => {

  window.setAsyncLoader(true)
  const credential = EmailAuthProvider.credential(email, password);

  linkWithCredential(auth.currentUser, credential)
  .then((usercred) => {
    const user = usercred.user;
    console.log("Anonymous account successfully upgraded", user);
    window.addResultMessage(false,"Success upgrading guest account!")
    window.setAsyncLoader(false)

    updateProfile(destination,racerName,AID,VID);
  }).catch((error) => {
    console.log("Error upgrading anonymous account", error);
    window.addResultMessage(true,"unable to upgrade guest acconut")
    window.setAsyncLoader(false)
  });
}

export const logOut = (destination) => {
  window.setAsyncLoader(true)
  signOut(auth).then(() => {
    window.changeGUIScreen(destination);
    window.addResultMessage(false,"sign out successful")
    window.setAsyncLoader(false)
  }).catch(error => 
    {
    window.addResultMessage(true,"unable to log out");
    window.setAsyncLoader(false);}
    )
}
export const deleteAccount = () => {
  window.setAsyncLoader(true)
  const user = auth.currentUser;
  const id = user.uid;
  deleteUser(user).then(() => {
    console.log(`user deleted ${user} with the ud ${id}`)
    deleteProfileUID(id);
    window.addResultMessage(false,"account deleted D:")
    window.setAsyncLoader(false)
  }).catch((error) => {
    
    window.setAsyncLoader(false)
    window.addResultMessage(true,"unable to delete account")
  });
}

window.killLogin = () => logOut("/");
export const deleteAccountUID = () => {}
//--------------DB-USERS

export const updateProfile = async(destination, displayName,AID,VID) => {
  window.setAsyncLoader(true)
  try {
    const id = auth.currentUser.uid;
    const docRef = await setDoc(doc(db, "users", id), {
      displayName: displayName,
      avatarId: AID,
      vehicleID: VID,
      medals: 0,
      createdAt: serverTimestamp(),
      uid: auth.currentUser.uid
    });
  
    window.changeGUIScreen(destination);
    window.addResultMessage(false,"updated profile!")
    window.setAsyncLoader(false)
  } catch (e) {
    console.error("error updating profile: ", e);
    window.addResultMessage(true,"unable to update profile")
    window.setAsyncLoader(false)
  }
}
export const updateProfileUID = async(UID, displayName,AID,VID) => {
  window.setAsyncLoader(true)
  try {

    const docRef = await setDoc(doc(db, "users", UID), {
      displayName: displayName,
      avatarId: AID,
      vehicleID: VID,
      medals: 0,
      createdAt: serverTimestamp(),
      uid: auth.currentUser.uid
    });
  
    window.addResultMessage(false,"updated profile!")
    window.setAsyncLoader(false)
  } catch (e) {
    console.error("Error adding document: ", e);
    window.addResultMessage(true,"unable to update profile")
    window.setAsyncLoader(false)
  }
}

export const incrementGuestAmount = async(currentAmount) => {
  window.setAsyncLoader(true)
  try {
    const docRef = await setDoc(doc(db, "stats", "guests"), {
      total: currentAmount+1
    });
    window.setAsyncLoader(false)
  } catch (e) {
    console.error("Error adding document: ", e);
    window.addResultMessage(true,"unable to increment guest amount")
    window.setAsyncLoader(false)
  }
}

export const setMedalAmount = async(medals) => {
  window.setAsyncLoader(true)
  try {
    const docRef = await updateDoc(doc(db, "users", auth.currentUser.uid), {
      medals: medals
    });
    window.addResultMessage(false,`set medal amount to ${medals}`)
    window.setAsyncLoader(false)
  } catch (e) {
    console.error("Error updating medals: ", e);
    window.addResultMessage(true,"unable to set medal amount")
    window.setAsyncLoader(false)
  }
}

export const getMedalAmount = async() => {
  window.setAsyncLoader(true)
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    window.setAsyncLoader(false)
    return docSnap.data().medals;
  } else {
    // doc.data() will be undefined in this case
    window.addResultMessage(true,`can't get medal amount`)
    window.setAsyncLoader(false)
  }
}

export const getGuestAmount = async() => {
  window.setAsyncLoader(true)
  const docRef = doc(db, "stats", "guests");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    window.setAsyncLoader(false)
    return docSnap.data().total;
  } else {
    // doc.data() will be undefined in this case
    console.log("cant get guest amount!");
    window.addResultMessage(true,`cant get guest amount`)
    window.setAsyncLoader(false)
  }
}

export const getCurrentAuthProfile = async() => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    window.setAsyncLoader(false)
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    // window.addResultMessage(true,`no profile document (current auth)`)
  }
} 

export const getProfileUID = async(UID) => {
  window.setAsyncLoader(true)
  const docRef = doc(db, "users", UID);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    window.setAsyncLoader(false)
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    // window.addResultMessage(true,`no profile document (uid)`)
    window.setAsyncLoader(false)
  }
  
}
export const deleteProfile = () => {}
export const deleteProfileUID = async(UID) => {
  window.setAsyncLoader(true)
  await deleteDoc(doc(db, "users", UID));
  window.setAsyncLoader(false)
}


//--------------DB-LEADERBOARD

export const addReplay = async(mapID,replayInfo) => {
  window.setAsyncLoader(true)
  try {
    const id = auth.currentUser.uid;
    const docRef = await setDoc(doc(db, `leaderboards/desktop/map${mapID}`, id), replayInfo);
    window.addResultMessage(false,`replay added to leaderboard`)
    window.setAsyncLoader(false)
  } catch (e) {
    console.error("unable to add replay ", e);
    window.addResultMessage(true,`unable to add replay`)
    window.setAsyncLoader(false)
  }
}

export const addUIDReplay = async(UID, mapID,replayInfo) => {
  window.setAsyncLoader(true)
  try {
    const docRef = await setDoc(doc(db, `leaderboards/desktop/map${mapID}`, UID), replayInfo);

    window.addResultMessage(false,`replay added to leaderboard`)
    window.setAsyncLoader(false)
  } catch (e) {
    console.error("error updating profile: ", e);
    window.addResultMessage(true,`unable to add replay`)
    window.setAsyncLoader(false)
  }
}

export const getCurrentAuthReplay = async( mapID) => {
  window.setAsyncLoader(true)

  const id = auth.currentUser.uid;
  const docRef = doc(db, `leaderboards/desktop/map${mapID}`, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    window.setAsyncLoader(false)
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("cant get guest amount!");
    window.setAsyncLoader(false)
  }
}


export const getCurrentAuthReplayTime = async( mapID) => {
  window.setAsyncLoader(true)

  const id = auth.currentUser.uid;
  const docRef = doc(db, `leaderboards/desktop/map${mapID}`, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    window.setAsyncLoader(false)
    return docSnap.data().time;
  } else {
    // doc.data() will be undefined in this case
    console.log("cant get guest amount!");
    window.setAsyncLoader(false)
  }
}

export const getUIDReplay = async(UID,mapID) => {
  window.setAsyncLoader(true)
  const docRef = doc(db, `leaderboards/desktop/map${mapID}`, UID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    window.setAsyncLoader(false)
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log(`cant get ${UID} auth replay on ${mapID}`);
    window.addResultMessage(true,`cant get (uid) auth replay on ${mapID}`)
    window.setAsyncLoader(false)
  }
}
export const getAllReplays = async(mapID) => {
  window.setAsyncLoader(true)
  const leaderboardRef = collection(db, `leaderboards/desktop/map${mapID}`);
  const q = query(leaderboardRef, orderBy('time') , limit(50));
  let allReplays = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
      allReplays.push(doc.data())
  });
  console.log("INSIDE",allReplays);

  window.setAsyncLoader(false)
  console.log("big chungus replay?")
  return allReplays;
}
export const deleteReplay = async(UID,mapID) => {
  
await deleteDoc(doc(db, `leaderboards/desktop/map${mapID}`, UID));
}

//--------------DB-MAPS





export const addMap = async(mapInfo,isNavigatingToView) => {
    /* 
    mapInfo object = {
      mapName :
      mapDescrition:
      mapObject:
      authorProfileObject:
      isDraft:
      createdAt:
      mapID: (generateMapId)
    }
  */
    
  window.setAsyncLoader(true)
  getCurrentAuthProfile().then(async(profile) => {
    mapInfo.authorProfileObject = profile;

    getCommunityMapAmount().then(async(currentMapAmount) => {
      try {
        const id = auth.currentUser.uid;
        let result = `c${currentMapAmount.toString().padStart(8, '0')}`;
        mapInfo.mapID = result;
        const docRef = await setDoc(doc(db, `community-maps/`, result), mapInfo); 
        window.addResultMessage(false,`map uploaded!`);
        window.setAsyncLoader(false);
        incrementCommunitymapAmount(currentMapAmount)
        if(isNavigatingToView){
          window.changeGUIScreen(`community-maps/${result}`);
        }
      } catch (e) {
        console.error("unable to upload map ", e);
        window.addResultMessage(true,`unable to upload map`)
        window.setAsyncLoader(false)
      }


      return "hello"
    })
  })


}

export const updateMap = async(mapID,mapInfo) => {
  window.setAsyncLoader(true)
  try {
    const docRef = await updateDoc(doc(db, "community-maps", mapID), {
      mapObject:mapInfo
    });
    window.addResultMessage(false,`update map ID ${mapID}`)
    window.setAsyncLoader(false)
  } catch (e) {
    console.error("error updating map ID: ", e);
    window.addResultMessage(true,"unable to update map ")
    window.setAsyncLoader(false)
  }
}

export const getAllMaps = async() => {
  window.setAsyncLoader(true)
  const communityMapsRef = collection(db, `community-maps/`);
  const q = query(communityMapsRef, orderBy('createdAt') , limit(50));
  let allMaps = [];

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    allMaps.push(doc.data())
  });

  window.setAsyncLoader(false)
  return allMaps;
}
export const getCurrentAuthMaps = async() => {
  window.setAsyncLoader(true)
  const communityMapsRef = collection(db, `community-maps/`);
  const q = query(communityMapsRef, where("creatorUID", '==', auth.currentUser.uid));
  let filteredMaps = [];

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    filteredMaps.push(doc.data())
  });

  window.setAsyncLoader(false)
  return filteredMaps;
}
export const getUIDMaps = async(UID) => {
  window.setAsyncLoader(true)
  const communityMapsRef = collection(db, `community-maps/`);
  const q = query(communityMapsRef, where("creatorUID", '==', UID));
  let filteredMaps = [];

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot)
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    filteredMaps.push(doc.data())
  });

  window.setAsyncLoader(false)
  return filteredMaps;
}
export const getMap = async(mapID) => { //this map ID can be a search param..
  window.setAsyncLoader(true)
  const docRef = doc(db, `community-maps`, mapID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    window.setAsyncLoader(false)
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log(`cant get map ${mapID}`);
    window.addResultMessage(true,`cant get map ${mapID}`)
    window.setAsyncLoader(false)
  }
}
export const deleteMap = async(mapID) => {

  window.setAsyncLoader(true)
  await deleteDoc(doc(db, `community-maps`, mapID));
  window.addResultMessage(false,`deleted map ${mapID} like a boss B')`)
  window.setAsyncLoader(false)
}

// window.deleteMapTemp = deleteMap
// window.deleteMapTemp("c00000006")
//helper to count maps..

export const getCommunityMapAmount = async() => {
  window.setAsyncLoader(true)
  const docRef = doc(db, "stats", "community-maps");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    window.setAsyncLoader(false)
    return docSnap.data().total;
  } else {
    // doc.data() will be undefined in this case
    console.log("cant get guest amount!");
    window.addResultMessage(true,`cant get guest amount`)
    window.setAsyncLoader(false)
  }
}

export const incrementCommunitymapAmount = async(currentAmount) => {
  window.setAsyncLoader(true)
  try {
    const docRef = await setDoc(doc(db, "stats", "community-maps"), {
      total: currentAmount+1
    });
    window.setAsyncLoader(false)
  } catch (e) {
    console.error("Error adding document: ", e);
    window.addResultMessage(true,"unable to increment guest amount")
    window.setAsyncLoader(false)
  }
}