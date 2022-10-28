import { IonButton, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import './CheckIn.css';

const CheckIn: React.FC = () => {
  return (
    <IonPage>
      <IonHeader class='ion-no-border'>
        <IonToolbar class='toolbar'>
          <div className='toolbar-red-line'></div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='check-in-container'>
          <div className='check-in-greeting'>Hi, Shel!</div>
          <div className='check-in-qr-container'></div>
          <div className='check-in-button-container'>
            <IonButton className='check-in-button'>Scan</IonButton>
            <IonButton className='check-in-button'>NFC</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CheckIn;