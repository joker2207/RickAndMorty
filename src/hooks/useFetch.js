import axios from "axios";
import { useState } from "react";

const useFetch = (baseUrl) => {
  const [response, setResponse] = useState();
  const [hasError, setHasError] = useState(false);

  const fetchData = async (url) => {
    try {
      const res = await axios.get(url);
      setResponse(res.data);
      setHasError(false);
    } catch (error) {
      console.error(error);
      setHasError(true);
    }
  };

  const getApi = async (page = 1) => {
    const urlWithPage = `${baseUrl}?page=${page}`;
    await fetchData(urlWithPage);
  };

  return [response, getApi, hasError];
};

export default useFetch;
