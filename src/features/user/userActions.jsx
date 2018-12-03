import moment from "moment";
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
