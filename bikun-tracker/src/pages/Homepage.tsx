import { BackButtonEvent, IonButton, IonCard, IonCardHeader, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { App } from '@capacitor/app';
import './Homepage.css';

const Homepage: React.FC = () => {
  const ionRouter = useIonRouter();
  document.addEventListener('ionBackButton', (ev) => {
    (ev as BackButtonEvent).detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonTitle>Hi, Shel!</IonTitle>
        <IonButton routerLink='/detail'>Detail</IonButton><br/>
        <IonButton routerLink='/check-in'>Check-in</IonButton>
        <IonList>
          <IonCard className='ion-card-bus'>
            <IonCardHeader>
              <h3>B 123 DD</h3>
            </IonCardHeader>
          </IonCard>
          <IonCard className='ion-card-bus'>
            <IonCardHeader>
              <h3>B 123 DD</h3>
            </IonCardHeader>
          </IonCard>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
