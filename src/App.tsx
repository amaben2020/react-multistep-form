import { useEffect, useState } from "react";
import "./App.css";
import { getShipping } from "./app/services/shipping-services";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const getUsers = async () => {
    try {
      setLoading(true);
      const { data } = await getShipping("shippin");
      console.log(data);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>{loading && "⏱️⏱️⏱️⏱️ LOADING...."}</p>
      <p style={{ color: "red" }}>{error && error}</p>
      {data.map((d: any) => (
        <div>{d.title}</div>
      ))}
    </>
  );
}

export default App;
