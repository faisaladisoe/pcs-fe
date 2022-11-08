import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonToolbar, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import './Detail.css';
import GoogleMapTracker from '../components/GoogleMapTracker';
import { startTracker, stopTracker } from '../utility/Tracker';
import { useLocation } from 'react-router';

const Detail: React.FC = () => {
  const location = useLocation();
  const licensePlateNumber = decodeURIComponent(location.pathname.split('/')[2]);

  useIonViewDidEnter(()=>{
    startTracker(licensePlateNumber)    
  })
  useIonViewWillLeave(()=>stopTracker())
  return (
    <IonPage>
      <IonHeader class='ion-no-border'>
        <IonToolbar style={{ minHeight: 56 }}>
          <div style={{ paddingLeft: 10 }}>
            <IonButton fill='clear' className='detail-back-button' routerLink='/home'>
              <IonIcon icon={arrowBackOutline} size='large'></IonIcon>
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <GoogleMapTracker licensePlateNumber={licensePlateNumber}/>
      </IonContent>
        
    </IonPage>
  );
};

export default Detail;