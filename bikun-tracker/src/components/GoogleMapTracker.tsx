import { IonButton, IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, useIonModal, useIonViewDidEnter, useIonViewDidLeave, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { useRef, useState } from 'react';
import './GoogleMapTracker.css';

import { GoogleMap } from '@capacitor/google-maps';
import { analytics } from 'ionicons/icons';
import { stopTracker } from '../utility/Tracker';
import { onValue, ref } from 'firebase/database';
import db from '../utility/firebaseConfig';

interface Maps{
  position: any;
}
const GoogleMapTracker: React.FC<Maps> = (position: any): JSX.Element => {
  //  This key is now dead!
  //  Replace with your own :)
  //  Remember to secure keys using env files or requesting from server!
  //  This was for demo purposes :)
  const key = process.env.REACT_APP_MAPS_API_KEY || '';
  let newMap: GoogleMap;
  let markersId: string[] = [''];
  const mapRef = useRef(null);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState({latitude:-6.364677, longitude:  106.829123});

  const [mapConfig, setMapConfig] = useState({

    zoom: 30,
    center: {

      lat: -6.364677,
      lng: 106.829123
    }
  });

  const setCamera = async (pos: any) => {


    addMapMarker({
      lat: pos.latitude,
      lng: pos.longitude,
      title: 'Bikun'
    })
      .then(() => newMap.setCamera({
        coordinate: {
          lat: pos.latitude,
          lng: pos.longitude
        },
        animate: true,

      })).then(() => newMap.removeMarkers(markersId.slice(0, markersId.length - 1)))
      .then(() => markersId = markersId.slice(markersId.length - 1))



  }

  const addMapMarker = async (marker: { lat: any; lng: any; title: any; }) => {

    let id = await newMap.addMarker({

      coordinate: {
        lat: marker.lat,
        lng: marker.lng
      },
      title: marker.title,
      isFlat: true
    });
    markersId.push(id)
    console.log(id)
  }


  const createMap = async () => {
    (document.querySelector('body') as HTMLElement).classList.add('remove-bg')
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: "google-map",
      element: mapRef.current,
      apiKey: key,
      config: mapConfig
    });
    await newMap.enableCurrentLocation(true)
    await newMap.enableClustering()
  }
  console.log({mymap: position})
  useIonViewDidEnter(async ()=>{
    await createMap();
  })
  useIonViewWillLeave(()=>(document.querySelector('body') as HTMLElement).classList.remove('remove-bg'))
  useIonViewDidLeave(async ()=> {
    await newMap.destroy();
  })
  return (
    <div className="map-wrapper">
      <capacitor-google-map ref={mapRef} id="map"></capacitor-google-map>
      {/* <IonButton onClick={createMap}>Show Map</IonButton> */}
    </div>
  );
};

export default GoogleMapTracker;