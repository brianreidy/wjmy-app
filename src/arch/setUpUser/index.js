import firestore from '@react-native-firebase/firestore';
import generateId from '../generateId';
const setUpUser = (name, level) => {
  console.log(name);
  let db = firestore();
  const userID = name.concat(generateId(5).toString());
  const myRide = db.collection('users').doc(userID);
  myRide.set({Name: name, Level: level});
  // if this is first ride, add logic later if not first ride
  // const riderDB = myride.collection('ride1');
  return myRide;
};
export default setUpUser;
