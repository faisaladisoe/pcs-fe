import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { DataSnapshot, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import GoogleMapTracker from "../components/GoogleMapTracker";
import db from "../utility/firebaseConfig";
import { startTracker, stopTracker } from "../utility/Tracker";

const DriverHome: React.FC = () => {
    const licensePlate = useHistory().location.pathname.split('/')[3];
    const [isDriving, setIsDriving] = useState(false);
    const [position, setPosition] = useState({latitude: 0, longitude: 0});

    const startDrive = async ()=>{
        startTracker(licensePlate);
        setIsDriving(true)
    }

    const stopDrive = async () => {
        stopTracker()
        setIsDriving(false)
    }

    useEffect(() =>{
        return onValue(ref(db, `bikun/${licensePlate}`),(snap: DataSnapshot)=>{
            if(snap.exists()){
                setPosition(snap.val())
                console.log(snap.val())
            }
        },
        {
            onlyOnce:true
        })
    })
    console.log(position)
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bus Management</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardContent>
                        <div className="driver-block-button">
                            {isDriving ?
                            <IonButton onClick={stopDrive} color={'danger'}>Stop Drive</IonButton>
                            :
                            <IonButton onClick={startDrive} color={'success'}>Start Drive</IonButton>
                            }
                        </div>
                        <div className="map-driver">
                            <GoogleMapTracker/>
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default DriverHome;