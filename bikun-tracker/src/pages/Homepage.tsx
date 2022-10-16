import { BackButtonEvent, IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { App } from '@capacitor/app';
import ExploreContainer from '../components/ExploreContainer';
import './Homepage.css';

const Homepage: React.FC = () => {
  const ionRouter = useIonRouter();
  document.addEventListener('ionBackButton', (ev) => {
    (ev as BackButtonEvent).detail.register(-1, () => {
      if(!ionRouter.canGoBack()){
        App.exitApp();
      }
    });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        <IonButton routerLink='/detail'>Detail</IonButton><br/>
        <IonButton routerLink='/check-in'>Check-in</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
