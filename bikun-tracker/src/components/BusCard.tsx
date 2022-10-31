import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { checkOut } from '../redux/checkinRedux';
import './BusCard.css';
import { flagOutline } from 'ionicons/icons';

interface BusProp {
    index: number,
    item: any
}
const BusCard: React.FC<BusProp> = (props: any): JSX.Element => {
    const { currentBus } = useSelector((state: any) => state.checkin);
    const dispatch = useDispatch();
    const openHideContent = (key: number) => {
        const content = document.getElementById(`ioncardcontent${key}`) as HTMLElement;
        content.style.transition = 'all 2s ease'
        content.style.display = content.style.display === 'none' ? '' : 'none';

    }

    const checkOutNow = (licensePlate: number) => {
        axios
            .patch(`http://ec2-54-251-180-24.ap-southeast-1.compute.amazonaws.com:3000/api/v1/checkinout/decrement/${licensePlate}`)
            .then(() => dispatch(checkOut()))
            .then(() => window.location.reload())
            .catch((err) => console.log(err))

    }
    if (props.item.status === 'active') {
        return (
            <IonCard className='ion-card-bus' key={props.index}>
                <IonCardHeader id={`ioncardheader${props.index}`} className='card-header' onClick={() => openHideContent(props.index)} >
                    <IonCardTitle className='card-title'>{`${props.item['license-plate-number']} - ${props.item['current-position']}`}</IonCardTitle>
                    <div className="icon-container">
                        {currentBus === props.item['license-plate-number'] ?
                            <IonIcon className='icon-checkin' icon={flagOutline} color={'success'} size={'large'} />
                            : <><div></div></>}
                        <div className={`bus-line-color line-${props.item.line}`}></div>
                    </div>
                </IonCardHeader>
                <IonCardContent className='ioncardcontent' id={`ioncardcontent${props.index}`} style={{ display: 'none' }}>
                    <div className="block-content">
                        <IonCardSubtitle className='subtitle'>License Plate Number</IonCardSubtitle>
                        <IonCardTitle>{props.item['license-plate-number']}</IonCardTitle>
                    </div>

                    <div className="block-content">
                        <IonCardSubtitle className='subtitle'>Capacity</IonCardSubtitle>
                        <IonCardTitle>{props.item.capacity}</IonCardTitle>
                    </div>
                    <div className="block-content">
                        <IonCardSubtitle className='subtitle'>Passenger Count</IonCardSubtitle>
                        <IonCardTitle>{props.item['passenger-num']}</IonCardTitle>
                    </div>

                    <div className="block-content">
                        <IonCardSubtitle className='subtitle'>Current Position</IonCardSubtitle>
                        <IonCardTitle>{props.item['current-position']}</IonCardTitle>

                    </div>
                    <div className="block-content">
                        <IonCardSubtitle className='subtitle'>ETA</IonCardSubtitle>
                        <IonCardTitle>{props.item['ETA']}</IonCardTitle>
                    </div>
                    <div className="block-content">
                        <IonCardSubtitle className='subtitle'>Updated At</IonCardSubtitle>
                        <IonCardTitle>{new Date(props.item['updatedAt']).toLocaleString()}</IonCardTitle>
                    </div>
                    <div className="card-btns">
                        <IonButton className='btn' routerLink='/detail'>Detail</IonButton><br />
                        {currentBus === props.item['license-plate-number'] ?
                            <IonButton className='btn' onClick={() => checkOutNow(props.item['license-plate-number'])}>Check-Out</IonButton>
                            :
                            <IonButton className='btn' routerLink={`/check-in/qrcode/${props.item['license-plate-number']}`}>Check-in</IonButton>

                        }
                    </div>
                </IonCardContent>
            </IonCard>
        )
    }
    return (<></>);
}

export default BusCard;

