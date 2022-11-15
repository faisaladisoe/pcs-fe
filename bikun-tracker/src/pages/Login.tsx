import { IonButton, IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import './Login.css';

const Login: React.FC = () => {
    return (
        <IonPage>
             <IonHeader>
                <IonToolbar color={'light'}>
                   <div className="toolbar">
                   Login
                   </div>
                </IonToolbar>
             </IonHeader>
            <IonContent className="ion-padding">
                <div className="container">
                    <div className="btn-container">
                        <IonButton className='btn-login' color={'success'} routerLink="/login/guest">Guest</IonButton><br/>
                        <IonButton className='btn-login' routerLink="/login/driver">Driver</IonButton>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Login;