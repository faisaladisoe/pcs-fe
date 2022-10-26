import { BackButtonEvent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonList, IonPage, IonTitle } from '@ionic/react';
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

  const c = (props: any) => {
    console.log(props)
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonTitle>Hi, Shel!</IonTitle>
       
        <IonList>
          <IonCard className='ion-card-bus' key={12} onClick={c}>
            <IonCardHeader className='card-header'>
              <IonCardTitle>B 15 D - FKM</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonCardSubtitle>License Plate Number</IonCardSubtitle>
              <IonCardTitle>B 15 D</IonCardTitle>

              <IonCardSubtitle>Capacity</IonCardSubtitle>
              <IonCardTitle>Loose</IonCardTitle>

              <IonCardSubtitle>Current Position</IonCardSubtitle>
              <IonCardTitle>Fakultas Ilmu Keperawatan</IonCardTitle>

              <IonCardSubtitle>ETA</IonCardSubtitle>
              <IonCardTitle>7 mins</IonCardTitle>

            </IonCardContent>
            <IonButton routerLink='/detail'>Detail</IonButton><br />
        <IonButton routerLink='/check-in'>Check-in</IonButton>
          </IonCard>
          <IonCard className='ion-card-bus'>
            <IonCardHeader>
              <IonCardTitle>B 15 D - FKM</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonCardSubtitle>License Plate Number</IonCardSubtitle>
              <IonCardTitle>B 15 D</IonCardTitle>

              <IonCardSubtitle>Capacity</IonCardSubtitle>
              <IonCardTitle>Loose</IonCardTitle>

              <IonCardSubtitle>Current Position</IonCardSubtitle>
              <IonCardTitle>Fakultas Ilmu Keperawatan</IonCardTitle>

              <IonCardSubtitle>ETA</IonCardSubtitle>
              <IonCardTitle>7 mins</IonCardTitle>
            </IonCardContent>
          </IonCard>

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
