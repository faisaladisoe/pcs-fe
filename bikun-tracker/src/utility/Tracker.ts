import { ref, update } from "firebase/database";
import db from "./firebaseConfig";


let id: any,
    isWatching = false

const clearWatch = (id: any) => {
    return window.navigator.geolocation.clearWatch(id)
},

success = (position: any, licensePlateNumber: string) => {
    const {latitude, longitude, speed } = position;
    console.log({id})
    update(ref(db, 'bikun/'+licensePlateNumber), {
      licensePlateNumber,
      latitude,
      longitude,
      speed,
    })
},

error = (err: any) => {
    isWatching = false
    return alert(`Error ${err.code}: ${err.message}`)
},

watch = (licensePlateNumber: string) => {
    id = navigator.geolocation.watchPosition((pos)=>success(pos, licensePlateNumber), error, {
        "maximumAge": 0,
        "timeout": 15000,
        "enableHighAccuracy": true
    })
}

const startAndStopTracker = (licensePlateNumber: string) => {
  if (isWatching) {
      isWatching = false
     clearWatch(id)
  } else {
      isWatching = true
      watch(licensePlateNumber)
  }
}
export{startAndStopTracker};