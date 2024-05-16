import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { doc, getFirestore, setDoc } from '@angular/fire/firestore';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);

  //Autenticacion
  //acceso

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  //registro
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //actualizar perfil de usuario
  updateProfile(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  //traer datos usuario
  getUserData() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
      const userData = {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      };

      return userData;
    } else {
      return null;
    }
  }
  //base de datos
  //crear un documento
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  //contraseña olvidada
  forgotPassword(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }
}
