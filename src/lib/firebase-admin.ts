import { initializeApp, getApps, cert, type ServiceAccount, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let app: App | undefined;
let firestore: Firestore | undefined;

function getApp(): App | undefined {
    if (app) return app;

    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
        console.warn("Firebase Admin: Missing credentials, running in fallback mode.");
        return undefined;
    }

    if (!getApps().length) {
        const serviceAccount: ServiceAccount = {
            projectId,
            clientEmail,
            privateKey,
        };

        app = initializeApp({
            credential: cert(serviceAccount),
        });
    } else {
        app = getApps()[0];
    }

    return app;
}

export function getDb(): Firestore | null {
    if (firestore) return firestore;

    const application = getApp();
    if (!application) return null;

    firestore = getFirestore(application);
    return firestore;
}
