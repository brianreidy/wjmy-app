import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

const surveyHelper = {
    InRide: function() {
        inRide = []
        try {
            database().ref("Surveys").once('value', function (snapshot) {
                const events = snapshot.val()
                console.log("snapshot value: ")
                console.log(events)
                const keys = Object.keys(events)
                for (let i = 0; i < keys.length; i++) {
                    const currSurvey = events[keys[i]]
                    if (keys[i]=== 'Post Ride') {
                        console.log('ignoring')
                    } else {
                        mySurvey = {
                            name: keys[i],
                            content: []
                        }
                        const newKeys = Object.keys(currSurvey)
                        for (let j = 0; j < newKeys.length; j++) {
                            const currItem = currSurvey[newKeys[j]]
                            myItem = {
                                question: currItem["Question"],
                                userAnswer: null
                            }
                            if (currItem["Answers"]){
                                myItem['answers'] = currItem["Answers"].split(',')
                            }
                            
                            mySurvey.content.push(myItem)
                        }
                        inRide.push(mySurvey)
                    }
                }
            })
        } finally {
            console.log("Cannot get data from Firebase")
        }
        
        return inRide;
    }

}
export default surveyHelper;


