import { BaseFirebaseAPI } from "./config/firebase";
import { Expense, Models } from "./config/models";

const firebaseConfig = {
  apiKey: "AIzaSyAon6iGzGTFKBjuz9A1ORLGgepZkzwZf30",
  authDomain: "expense-tracker-caa87.firebaseapp.com",
  projectId: "expense-tracker-caa87",
  storageBucket: "expense-tracker-caa87.appspot.com",
  messagingSenderId: "461589696799",
  appId: "1:461589696799:web:20e26cedd09a0b20b9a02a",
  measurementId: "G-1JHJL8X3MQ",
};
export class FirebaseAPI extends BaseFirebaseAPI<Models> {
  constructor() {
    super(firebaseConfig);
    this.collections = {
      expenses: this.createCollection<Expense>("expenses"),
    };
  }
}
