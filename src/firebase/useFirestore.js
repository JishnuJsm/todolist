import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { useState } from "react";
import { data } from "./config";

export const useFirestore = (fbcollection) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const collectionRef = collection(data, "userId");

  const addDocument = async (document) => {
    try {
      const doc = await addDoc(collectionRef, { ...document });
      setDocument(doc);
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteDocument = async (id) => {
    const documentRef = doc(data, fbcollection, id);

    try {
      await deleteDoc(documentRef);
    } catch (err) {
      setError(err);
    }
  };

  const updateDocument = async (id, document) => {
    const documentRef = doc(data, fbcollection, id);
    console.log("Updating", document);

    try {
      await updateDoc(documentRef, { ...document });
    } catch (err) {
      setError(err);
    }
  };

  return { addDocument, document, error, deleteDocument, updateDocument };
};
