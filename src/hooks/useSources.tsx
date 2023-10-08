import { collection, getFirestore } from "firebase/firestore"
import { useCollection  } from "react-firebase-hooks/firestore"
import {  app } from "../configs/firebase-config"

const useSources = () => {
  const collectionRef = collection(getFirestore(app), 'incharge_foods_baverage_list')

  const [value, loading, error] = useCollection(collectionRef)

  if (value) {
    const result = value.docs.map((doc) => {
      return doc.data()
    })

    console.log(result)
  }

  if (error) {
    console.log(error)
  }

  return {  }
}

export { useSources }