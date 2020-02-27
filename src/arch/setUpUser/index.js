import firestore from '@react-native-firebase/firestore';
import generateId from '../generateId';
const setUpUser = (name, level) => {
  console.log(name);
  let db = firestore();
  const userID = name.concat(generateId(5).toString());
  let myRide = db.collection('users').doc(userID);
  myRide.set({Name: name, Level: level});
  // if this is first ride, add logic later if not first ride
  myRide = myRide.collection('ride1');
  return myRide;
};
export default setUpUser;
