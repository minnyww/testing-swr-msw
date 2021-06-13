import axios from "axios";
import { useEffect } from "react";
import useSWR, { SWRConfig } from "swr";
import "./App.css";
import { fetcher } from "./fetcher";

const Post = () => {
  const { data: surveyData, error } = useSWR("/posts?userId=1&_limit=1");

  if (error) return <span>Error!</span>;
  if (!surveyData) return <span>Loading!</span>;

  return <div>{surveyData[0]?.title}</div>;
};
function App() {
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      config.baseURL = `https://jsonplaceholder.typicode.com`;
      return config;
    });
  }, []);
  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <Post />
    </SWRConfig>
  );
}

export default App;
