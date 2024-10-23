
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword ,signOut} from "firebase/auth";
import {   addDoc, collection ,  getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDbornQA2TiU9DAMcJgGNiPClZh_ImVHaU",
  authDomain: "netflix-clone-6d2b4.firebaseapp.com",
  projectId: "netflix-clone-6d2b4",
  storageBucket: "netflix-clone-6d2b4.appspot.com",
  messagingSenderId: "288129724879",
  appId: "1:288129724879:web:b4d73ba150e6d16a0222ba"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db= getFirestore(app);

const signup=async(name,email,password)=>{
  try{
     const res = await createUserWithEmailAndPassword(auth,email,password);
     const user=res.user;
     await addDoc(collection(db,"user"),{
      udi:user.uid,
      name,
      authprovider:"local",
     })

  }
   catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));

   }
}

const login= async(email, password)=>{
  try{
    await signInWithEmailAndPassword(auth,email,password);

  } catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
    

  }
}

const logout =()=>{
  signOut (auth) ;
}
export{auth,db,login,signup,logout };

