import { useState, useEffect } from 'react';

const useListQuestions = () => {
  const [createData, setCreateData] = useState(null);
  const [createLoading, setCreateLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (requestData) => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/sample_apis/list_questions_api`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from the API');
      }

      const responseData = await response.json();
      setCreateData(responseData);
    } catch (error) {
      setError(error);
    } finally {
        setCreateLoading(false);
    }
  };

  const cretateGetData = (requestData) => {
    fetchData(requestData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { createData, createLoading, error, cretateGetData };
};

export default useListQuestions;
