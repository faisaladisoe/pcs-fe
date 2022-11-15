import { IonAlert, IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import GoogleMapTracker from "../components/GoogleMapTracker";
import { startTracker, stopTracker } from "../utility/Tracker";
import './DriverHome.css';

const DriverHome: React.FC = () => {
    const [isDriving, setIsDriving] = useState(false);
    const [licensePlate, setLicensePlate] = useState<string>('');
    const [showAlert, setShowAlert] = useState(false);

    const startDrive = async () => {
        if (!licensePlate) {
            setShowAlert(true)
        } else {
            startTracker(licensePlate);
            setIsDriving(true)
        }

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
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header="Alert"
                    subHeader="Important message"
                    message="Please, fill in the license plate number before start driving."
                    buttons={['OK']}
                />
                <IonCard>
                    <IonCardContent>
                        <div className="driver-block-button">
                            {isDriving ?
                                <IonButton onClick={stopDrive} color={'danger'}>Stop Drive</IonButton>
                                :
                                <IonButton onClick={startDrive} color={'success'}>Start Drive</IonButton>
                            }
                            <div className="license-input">
                                <IonInput clearInput={isDriving} autoCapitalize='true' clearOnEdit={true} placeholder="e.g D 1011 JOK"
                                    onIonInput={(e: any) => setLicensePlate(e.target.value)}></IonInput>
                            </div>
                        </div>
                        <div className="map-driver">
                            <GoogleMapTracker isDriver={true} />
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default DriverHome;