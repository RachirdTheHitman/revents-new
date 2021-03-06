import moment from "moment";
import cuid from 'cuid';
import { toastr } from "react-redux-toastr";

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const {isLoaded, isEmpty, ...updateduser} = user;
  if (updateduser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    updateduser.dateOfBirth = moment(user.dateOfBirth).toDate();
  }

  try {
    await firebase.updateProfile(updateduser);
    toastr.success("Success", "Profile updated");
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = (file, fileName) => 
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const imageName = cuid();
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;
    const options = {
      name: imageName
    }
    try {
      // upload the file to firebase storage
      let uploadedFile = await firebase.uploadFile(path, file, null, options);
      // get url of image
      let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
      // get userdoc 
      let userDoc = await firestore.get(`users/${user.uid}`);
      // check if user has photo, if not update profile with new image
      if (!userDoc.data().photoURL) {
        await firebase.updateProfile({
          photoURL: downloadURL
        });
        await user.updateProfile({
          photoURL: downloadURL
        })
      }
      // add the new photo to photos collection
      return await firestore.add({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'photos'}]
      }, {
        name: imageName,
        url: downloadURL
      })
    } catch (error) {
      console.log(error);
      throw new Error('Problem uploding photo');
    }
  }

export const deletePhoto = (photo) => 
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    try {
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'photo', doc: photo.id}]
      })
    } catch (error) {
      console.log(error);
      throw new Error('Problem deleting the photo');
    }
  }
