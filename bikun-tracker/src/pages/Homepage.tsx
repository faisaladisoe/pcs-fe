import {IonCard, IonCardHeader, IonCardTitle, IonContent, IonList, IonLoading, IonPage, IonToast } from '@ionic/react';
import './Homepage.css';
import { useEffect, useState } from 'react';
import { App } from '@capacitor/app';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../redux/checkinRedux';
import axios from 'axios';
import BusCard from '../components/BusCard';

const Homepage: React.FC = () => {
  const [data, setData] = useState([]);
  const { isSuccess } = useSelector((state)=> (state as any).checkin)
  const [loading, setLoading] = useState(true);
  const [errorLoadData, setErrorLoadData] = useState(false);
  const dispatch = useDispatch();
  
  setTimeout(()=>{
    dispatch(reset())
  }, 2500);

  App.addListener('backButton', ({ canGoBack })=>{
    if(!canGoBack){
      App.exitApp();
    }
  })

  

  const loadBusData = async () => {
    const url = 'http://ec2-54-251-180-24.ap-southeast-1.compute.amazonaws.com:3000/api/v1/schedule';
    const response = await axios.get(url);
    const result = response.data;
    return result;
  }

  useEffect(() => {
    loadBusData()
    .then((res)=>{
      setLoading(false)
      setData(res)
      console.log(res)
    })
    .catch((err)=>{
      setErrorLoadData(true);
      console.log(err)
    });

  }, [dispatch, isSuccess])
 
  return (
    <IonPage>
      <IonLoading
        isOpen={loading && !errorLoadData}
        message='Retrieving Bikun Data For You'
        duration={1000000}
      />
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
          {!errorLoadData ? data.map((item: any, idx: number) => (
            <BusCard index={idx} item={item}/>
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
