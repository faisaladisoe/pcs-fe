import { ref, set, update } from "firebase/database";
import db from "./firebaseConfig";
import {Geolocation} from '@capacitor/geolocation'

let id: any,
    isWatching = false

const clearWatch = async (id: any) => {
    return window.navigator.geolocation.clearWatch(id);
},

success = (position: any, licensePlateNumber: string) => {
    const {latitude, longitude, speed } = position.coords;
    console.log(position)
    set(ref(db, `bikun/${licensePlateNumber}`), {
      licensePlateNumber,
      latitude,
      longitude,
      speed,
    }).then((val)=> console.log(val))
    .then(()=> console.log("SET"))
    .catch(err => console.log({err}))
},

error = (err: any) => {
    isWatching = false
    return alert(`Error ${err.code}: ${err.message}`)
},

watch = (licensePlateNumber: string) => {
    id = window.navigator.geolocation.watchPosition((pos)=>success(pos, licensePlateNumber), error,{enableHighAccuracy:true})
}

const startTracker = (licensePlateNumber: string) => {
  if (!isWatching) {
    isWatching = true
    watch(licensePlateNumber)
  } else {
      console.log('Already started')
  }
}

const stopTracker = () => {
    if(isWatching){
        isWatching = false;
        clearWatch(id)
    }else{
        console.warn('Already stopped')
    }
}
export{startTracker, stopTracker};