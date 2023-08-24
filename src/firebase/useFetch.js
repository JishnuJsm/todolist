import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { data } from "./config";
import { useAuthContext } from "./useAuthContext";

export const useFetch = (fbcollection) => {
  const { user, dispatch } = useAuthContext();
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    if (user) {
      let collectionRef = collection(data, fbcollection);

      const unsub = onSnapshot(collectionRef, (snapshot) => {
        snapshot.docs.map((doc) => {
          if (doc.id === user.uid) {
            setDocuments(doc.data());
            dispatch({ type: "DATA-FETCH", data: true });
          }
        });
      });

      return () => unsub();
    } else {
      setDocuments(null);
      dispatch({ type: "DATA-FETCH", data: false });
    }
  }, [fbcollection, user]);

  return { documents };
};
