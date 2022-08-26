// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import {
  Firestore,
  getFirestore,
  collection,
  getDocs,
  DocumentData,
  CollectionReference,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  Auth,
  AuthError,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

type CollectionsType<T> = {
  [Property in keyof T]: CollectionReference<T[Property]>;
};

export class BaseFirebaseAPI<M = {}> {
  app: FirebaseApp;
  analytics: Analytics;
  db: Firestore;
  auth: Auth;
  user: User | null;
  authError: AuthError | null;
  error: unknown;
  collections?: CollectionsType<M>;

  constructor(firebaseConfig: FirebaseOptions) {
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
    this.user = null;
    this.authError = null;
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  googleSignIn() {
    console.log(this);
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        this.user = result.user;
      })
      .catch((error: AuthError) => {
        this.authError = error;
      });
  }

  signOut() {
    signOut(this.auth)
      .then(() => {
        this.user = null;
      })
      .catch((error: AuthError) => {
        this.authError = error;
      });
  }

  async addData(item: unknown, table: keyof M, name: string) {
    if (this.collections === undefined) {
      throw Error("Collections are not implemented");
    }
    const docRef = doc(this.collections[table], name);
    try {
      await setDoc(docRef, item);
      console.log("Successfully Fetched Data");
    } catch (e) {
      console.error(e);
      this.error = e;
    }
  }

  createCollection = <T = DocumentData>(collectionName: string) =>
    collection(this.db, collectionName) as CollectionReference<T>;

  async readTable(table: keyof M) {
    if (this.collections === undefined) {
      throw Error("Collections are not implemented");
    }
    try {
      const Docs = await getDocs(this.collections[table]);
      return Docs.docs.map((doc) => doc.data());
    } catch (e) {
      console.error(e);
      this.error = e;
      return [];
    }
  }
}
