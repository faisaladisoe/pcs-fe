import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import './Detail.css';
import { startAndStopTracker } from '../utility/Tracker';
import { DataSnapshot, off, onValue, ref, update } from 'firebase/database';
import db from '../utility/firebaseConfig';
import { useEffect, useState } from 'react';

const Detail: React.FC = () => {
  const [data, setData] = useState();
  const [update, setUpdate] = useState();

  startAndStopTracker('D 1012 JOK')
  const googleMap = ()=>{
    return (
      <><IonTitle>{(data as any)?.latitude}</IonTitle>
      <IonTitle>{(data as any)?.longitude}</IonTitle>
      <IonTitle>{(data as any)?.speed}</IonTitle>
      </>
    )
  }
  



  const stop = () => {
    startAndStopTracker('D 1012 JOK')
    console.log("YYYYYYYYYYYYYYYYYYYYY")
  }

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
        <IonHeader>
          <IonToolbar>
          {googleMap()}
          <IonButton onClick={stop}>Stop Share</IonButton>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Detail;