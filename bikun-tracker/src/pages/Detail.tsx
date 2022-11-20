import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import './Detail.css';
import GoogleMapTracker from '../components/GoogleMapTracker';
import { useHistory, useLocation } from 'react-router';

const Detail: React.FC = () => {
  const location = useLocation();
  const licensePlateNumber = decodeURIComponent(location.pathname.split('/')[2]);
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader class='ion-no-border'>
        <IonToolbar style={{ minHeight: 56 }}>
          <div style={{ paddingLeft: 10 }}>
            <IonButton fill='clear' className='detail-back-button' onClick={()=> history.goBack()}>
              <IonIcon icon={arrowBackOutline} size='large'></IonIcon>
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <GoogleMapTracker licensePlateNumber={licensePlateNumber} isDriver={false}/>
      </IonContent>
        
    </IonPage>
  );
};

export default Detail;