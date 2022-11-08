import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonToolbar, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillLeave } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import './Detail.css';
import GoogleMapTracker from '../components/GoogleMapTracker';
import { useEffect, useState } from 'react';
import { startTracker, stopTracker } from '../utility/Tracker';
import { DataSnapshot, onValue, ref } from 'firebase/database';
import db from '../utility/firebaseConfig';

const Detail: React.FC = () => {
  const [location, setLocation] = useState({latitude:-6.364677, longitude:  106.829123});
  useIonViewDidEnter(()=>{
    startTracker('D1')
    console.log('OOOPPPPPPSSSS')
    onValue(ref(db, 'bikun/D1'), (snap)=>{
      if(snap.exists()){
        setLocation(snap.val())
      }else{
        console.log("YAAH")
      }
    })
    
  })
  useIonViewWillLeave(()=>stopTracker())
  useEffect(()=>{
    console.log("HAI")
  },[location]);
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
          <GoogleMapTracker position={location}/>
      </IonContent>
        
    </IonPage>
  );
};

export default Detail;