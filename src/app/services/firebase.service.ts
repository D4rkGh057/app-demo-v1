import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { User } from '../models/user.models';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  storage = inject(AngularFireStorage);
  firestore = inject(AngularFireStorage);
  utils = inject(UtilsService);

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
  //obtener coleccion
  getCollectionData(path: string, collectionQuery: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(ref, ...collectionQuery), { idField: 'id' };
  }
  //actualizar documento
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }
  //eliminar documento
  deleteDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path));
  }
  //obtener documento
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //agregar un documento
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  //STORAGE
  //subir una imagen
  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(
      () => {
        return getDownloadURL(ref(getStorage(), path));
      }
    );
  }
  //obtener ruta de imagen por url
  async getFilePath(url: string) {
    return ref(getStorage(), url).fullPath;
  }
  //eliminar una imagen
  deleteFile(path: string) {
    return deleteObject(ref(getStorage(), path));
  }

  //USUARIO
  //contraseña olvidada
  forgotPassword(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }
  


}
