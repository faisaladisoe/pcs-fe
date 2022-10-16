import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonToolbar, useIonRouter } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import './Detail.css';

const Detail: React.FC = () => {
  const ionRouter = useIonRouter();
  const goBack = () => {
    if(ionRouter.canGoBack()){
      ionRouter.goBack();
    }
  }

  return (
    <IonPage>
      <IonHeader class='ion-no-border'>
        <IonToolbar style={{minHeight: 56}}>
          <div style={{paddingLeft: 10}}>
            <IonButton fill='clear' className='detail-back-button' onClick={goBack}>
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