import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get } from "firebase/database";
import { useState, useEffect } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyBUsBcbgmEFl5n8zuelwGM0J9jYk_m7hTw",
    authDomain: "jungle-jim-s-weekly-ad.firebaseapp.com",
    projectId: "jungle-jim-s-weekly-ad",
    storageBucket: "jungle-jim-s-weekly-ad.appspot.com",
    messagingSenderId: "741468733242",
    appId: "1:741468733242:web:aebc1b694bb438f8f31a03",
    measurementId: "G-21MM08YX6R",
    databaseURL: "https://jungle-jim-s-weekly-ad-default-rtdb.firebaseio.com" // Add your Realtime Database URL
}; 3
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getDatabase(app);

interface props {
    handleData: (data: JSON) => void;
}

// web app's Firebase configuration
function Firebase({ handleData }: props) {
    const [response, setResponse] = useState<boolean>(false)

    useEffect(() => {
        // get the current week's data, then bubble up to app, where it's data is utilized
        const dbRef = ref(db, 'ad_data');
        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                console.log('Document data:');
                console.log(JSON.parse(snapshot.val()["2024-07-12T10:51:45-04:00"]["data"]));
                // set nodes with document data
                setResponse(true)
                handleData(JSON.parse(snapshot.val()["2024-07-12T10:51:45-04:00"]["data"]))
                
            } else {
                console.log('No such document!');
            }
        }).catch((error) => {
            console.error('Error getting document:', error);
        });



    }, [])

    return (
        <>

            {response ? undefined :
                <img style={{ pointerEvents: 'none', width: '50px' }}
                    src="https://gifdb.com/images/high/animated-stars-loading-icon-38ccjfav8iijnqrb.gif" />
            }

        </>
    )
}

export default Firebase;