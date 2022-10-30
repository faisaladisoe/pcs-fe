import { IonContent, IonPage, IonRow, IonText } from "@ionic/react"
import { useEffect, useState } from "react";
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const ScannerCheckIn: React.FC = () => {
    const [err, setErr] = useState<string>();
    useEffect(() => {
        const checkPermission = async () => {
            try {
                const status = await BarcodeScanner.checkPermission({ force: true })

                if (status.granted) {
                    return true
                }

                return false
            } catch (error) {
                if (error instanceof Error) {
                    setErr(error.message)
                    console.log(error.message)
                } else {
                    console.log(String(error))
                }

            }
        }

        checkPermission()

        return () => { }
    }, [])

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonRow>
                    <IonText color="danger">{err}</IonText>
                </IonRow>
            </IonContent>
        </IonPage>
    )
}

export default ScannerCheckIn;