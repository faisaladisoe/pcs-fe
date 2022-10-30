import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonList, IonPage, IonToast } from '@ionic/react';
import './Homepage.css';
import { useEffect, useState } from 'react';
import { App } from '@capacitor/app';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../redux/checkinRedux';

const Homepage: React.FC = () => {
  const [data, setData] = useState([]);
  const { isSuccess } = useSelector((state)=> (state as any).checkin)
  const dispatch = useDispatch();

  setTimeout(()=>{
    dispatch(reset())
  }, 2500);

  App.addListener('backButton', ({ canGoBack })=>{
    if(!canGoBack){
      App.exitApp();
    }
  })

  useEffect(() => {
    const loadBusData = async () => {
      const url = 'http://ec2-54-251-180-24.ap-southeast-1.compute.amazonaws.com:3000/api/v1/schedule';
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      // setData(JSON.parse(localStorage.getItem('data') || '{}'));
    }
    loadBusData().catch((err)=>{
      setData([])
      console.log("YESSS")
    });
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
          {data.length > 0 ? data.map((item: any, index: number) => (
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
                  <IonButton className='btn' routerLink='/check-in/qrcode'>Check-in</IonButton>
                </div>
              </IonCardContent>
            </IonCard>

          )) : (
            <IonCard className='ion-card-error'>
              <IonCardHeader>
                <IonCardTitle className='error-title'>Can't load Bikun data at this time</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          )}

        </IonList>
        <IonToast
                    isOpen={isSuccess}
                    message="Check-In Success. Enjoy the ride!"
                    duration={2000}
                    position='top'
                    />
      </IonContent>
    </IonPage>
  );
};

export default Homepage;
