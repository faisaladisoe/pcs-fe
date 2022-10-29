import { BackButtonEvent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonList, IonPage } from '@ionic/react';
import { useIonRouter } from '@ionic/react';
import { App } from '@capacitor/app';
import './Homepage.css';
import { useEffect, useState } from 'react';

const Homepage: React.FC = () => {
  const ionRouter = useIonRouter();
  const [data, setData] = useState([]);
  document.addEventListener('ionBackButton', (ev) => {
    (ev as BackButtonEvent).detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });

  useEffect(() => {
    const loadBusData = async () => {
      // const url = 'http://ec2-54-251-180-24.ap-southeast-1.compute.amazonaws.com:3000/api/v1/schedule';
      // const response = await fetch(url);
      // const result = await response.json();
      // setData(result);
      setData(JSON.parse(localStorage.getItem('data') || '{}'));
    }
    loadBusData();
  }, [])

  const showAndHideCardContent = (id: any) => {
    const cardContent = document.getElementById(`ioncardcontent${id}`) as HTMLElement;
    cardContent.style.transition = 'all 2s ease'
    cardContent.style.display = cardContent.style.display === 'none' ? '' : 'none';
  }

  return (
    <IonPage>
      <IonContent fullscreen className='no-scroll'>
        <div className="main-header">
          <div className="red-bar"></div>
          <div className="title">
            <h2 className='title-text'>Hi, Shel!</h2>
          </div>
          <div className="legend">
            <div className="legend-container">
              <div className="blue-line-legend-main-header"></div>
              <div className="legend-info">Stasiun UI - Psikologi</div>
            </div>
            <div className="legend-container">
              <div className="red-line-legend-main-header"></div>
              <div className="legend-info">Stasiun UI - Hukum</div>
            </div>
          </div>
        </div>

        <IonList className='card-list'>
          {data.map((item: any, index: number) => (
            <IonCard className='ion-card-bus' key={index} onClick={() => showAndHideCardContent(index)}>
              <IonCardHeader id={`ioncardheader${index}`} className='card-header'>
                <IonCardTitle>{`${item['license-plate-number']} - ${item['current-position']}`}</IonCardTitle>
                <div className={`bus-line-color line-${item.line}`}></div>
              </IonCardHeader>
              <IonCardContent className='ioncardcontent' id={`ioncardcontent${index}`} style={{ display: 'none' }}>
                <div className="block-content">
                  <IonCardSubtitle className='subtitle'>License Plate Number</IonCardSubtitle>
                  <IonCardTitle>{item['license-plate-number']}</IonCardTitle>
                </div>

                <div className="block-content">
                  <IonCardSubtitle className='subtitle'>Capacity</IonCardSubtitle>
                  <IonCardTitle>{item.capacity}</IonCardTitle>
                </div>

                <div className="block-content">
                  <IonCardSubtitle className='subtitle'>Current Position</IonCardSubtitle>
                  <IonCardTitle>{item['current-position']}</IonCardTitle>

                </div>
                <div className="block-content">
                  <IonCardSubtitle className='subtitle'>ETA</IonCardSubtitle>
                  <IonCardTitle>{item['ETA']}</IonCardTitle>
                </div>
                <div className="block-content">
                  <IonCardSubtitle className='subtitle'>Updated At</IonCardSubtitle>
                  <IonCardTitle>{new Date(item['updatedAt']).toLocaleString()}</IonCardTitle>
                </div>
                <div className="card-btns">
                  <IonButton className='btn' routerLink='/detail'>Detail</IonButton><br />
                  <IonButton className='btn' routerLink='/check-in'>Check-in</IonButton>
                </div>
              </IonCardContent>
            </IonCard>

          ))}

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
