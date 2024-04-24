import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const URL = "https://jsonplaceholder.typicode.com/users/1/posts";

interface DataProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const DataList: React.FC<DataProps> = (data) => {
  return (
    <>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      <h3>{data.id}</h3>
    </>
  );
};

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setData(data);
  };

  console.log(data);

  useEffect(() => {
    fetchData();
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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div>
        {data?.map((data) => (
          <DataList {...data} />
        ))}
      </div>
    </>
  );
}

export default App;
