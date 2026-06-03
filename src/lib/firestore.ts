import {
  collection,
  query,
  orderBy,
  getDoc,
  getDocs,
  setDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  type CollectionReference,
  type DocumentData,
} from "firebase/firestore";
import { firestore } from "./firebase";

function getFirestoreInstance() {
  if (!firestore) {
    throw new Error("Firestore is not initialized. Ensure Firebase is configured and executed on the client.");
  }

  return firestore;
}

export function getCollectionRef<T extends DocumentData>(
  collectionName: string,
): CollectionReference<T> {
  return collection(getFirestoreInstance(), collectionName) as CollectionReference<T>;
}

export async function getCollection<T extends DocumentData>(collectionName: string) {
  const snapshot = await getDocs(query(getCollectionRef<T>(collectionName), orderBy("order", "asc")));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Array<T & { id: string }>;
}

export async function getDocument<T extends DocumentData>(collectionName: string, id: string) {
  const reference = doc(getCollectionRef(collectionName), id);
  const snapshot = await getDoc(reference);
  return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as T & { id: string }) : null;
}

export async function createDocument(collectionName: string, data: DocumentData) {
  return await addDoc(getCollectionRef(collectionName), {
    ...data,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
}

export async function setDocument(collectionName: string, id: string, data: DocumentData) {
  return await setDoc(doc(getCollectionRef(collectionName), id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function updateDocument(collectionName: string, id: string, data: DocumentData) {
  return await updateDoc(doc(getCollectionRef(collectionName), id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDocument(collectionName: string, id: string) {
  return await deleteDoc(doc(getCollectionRef(collectionName), id));
}
