import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { startTracker, stopTracker } from "../utility/Tracker";

const DriverHome: React.FC = () => {
    const licensePlate = useHistory().location.pathname.split('/')[3];
    const [isDriving, setIsDriving] = useState(false);
    const startDrive = async ()=>{
        startTracker(licensePlate);
        setIsDriving(true)
    }

    const stopDrive = async () => {
        stopTracker()
        setIsDriving(false)
    }
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
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default DriverHome;