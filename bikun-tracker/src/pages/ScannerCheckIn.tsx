import { IonButton, IonButtons, IonHeader, IonIcon, IonPage, IonTitle, IonToast, IonToolbar } from "@ionic/react"
import { useEffect, useState } from "react";
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { App } from '@capacitor/app';
import { useHistory, useLocation } from "react-router";
import './ScannerCheckIn.css'
import { qrCode, stopCircleOutline, wifiOutline } from "ionicons/icons";
import { useDispatch } from 'react-redux';
import { checkInFail, checkInSuccess } from "../redux/checkinRedux";
import axios from 'axios';

const ScannerCheckIn: React.FC = () => {
    const history = useHistory();
    const [err, setErr] = useState<string>();
    const [useNFC, setNFC] = useState(false);
    const dispatch = useDispatch();


    const stopScan = () => {
        (document.querySelector('body') as HTMLElement).classList.remove('scanner-active');
        BarcodeScanner.stopScan();
        history.goBack();
    };

    App.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
            App.exitApp();
        } else {
            stopScan();
            history.goBack();
        }
    });

    const startScan = async () => {
        // Check camera permission
        // This is just a simple example, check out the better checks below
        await BarcodeScanner.checkPermission({ force: true });

        // make background of WebView transparent
        // note: if you are using ionic this might not be enough, check below
        (document.querySelector('body') as HTMLElement).classList.add('scanner-active');
        BarcodeScanner.hideBackground();

        const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] }); // start scanning and wait for a result

        // if the result has content
        if (result.hasContent) {
            console.log(result.content); // log the raw scanned content
            if (result.content) {
                var config = {
                    method: 'patch',
                    url: `http://ec2-54-251-180-24.ap-southeast-1.compute.amazonaws.com:3000/api/v1/checkinout/increment/${result.content}`,
                    headers: {}
                };

                axios(config)
                    .then((res) => {
                        dispatch(checkInSuccess(result.content));
                        stopScan();
                    })
                    .catch((err) => {
                        dispatch(checkInFail());
                        setErr(err.message)
                    });
            }else{
                dispatch(checkInFail());
                setErr('QR Code Doesn\'t match');
                setTimeout(()=>{ setErr(''); startScan();},1000)
            }
        } else {
            dispatch(checkInFail());
            setErr('Invalid QR Code')
        }
    };



    useEffect(() => {
        const checkPermission = async () => {
            try {
                const status = await BarcodeScanner.checkPermission({ force: true })
                BarcodeScanner.prepare();
                return status.granted;

            } catch (error) {
                if (error instanceof Error) {
                    setErr(error.message)
                    dispatch(checkInFail())
                } else {
                    console.log(String(error))
                }

            }
        }

        checkPermission()
            .then(() => startScan())
            .catch(() => stopScan())

        return () => { }
    }, [])


    return (
        <IonPage>

            <IonHeader className="scanner-header">
                <IonToolbar className="scanner-toolbar">
                    <IonTitle>Check-In</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color="success" onClick={() => setNFC(!useNFC)}>
                            <IonIcon icon={useNFC ? qrCode : wifiOutline} slot="start" />
                            {useNFC ? 'QR Code' : 'Use NFC'}
                        </IonButton>
                        <IonButton color="danger" onClick={stopScan}>
                            <IonIcon icon={stopCircleOutline} slot="start" />
                            Stop Scan
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonToast
                isOpen={err ? true : false}
                message={err}
                duration={3000}
                position='middle'
            />
        </IonPage>
    )
}

export default ScannerCheckIn;