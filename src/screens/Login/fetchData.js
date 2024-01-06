import { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';

const useFirebaseData = (path) => {
  const [data, setData] = useState(null);
  const [objData, setObjData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await database().ref(path).once('value');
        const fetchedData = snapshot.val();
        setData(Object.values(fetchedData));
        setObjData(fetchedData)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  return { data, loading, error, objData };
};

export default useFirebaseData;
