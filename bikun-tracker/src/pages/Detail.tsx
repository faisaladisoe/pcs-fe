import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import './Detail.css';

const Detail: React.FC = () => {
  return (
    <IonPage>
      <IonHeader class='ion-no-border'>
        <IonToolbar style={{minHeight: 56}}>
          <div style={{paddingLeft: 10}}>
            <IonButton fill='clear' className='detail-back-button' routerLink='/home'>
              <IonIcon icon={arrowBackOutline} size='large'></IonIcon>
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='detail-container'>
          <div className='detail-map-container'></div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Detail;