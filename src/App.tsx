import { Fragment, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const URLDataUserPosts = "https://jsonplaceholder.typicode.com/users/1/posts";
const URLDataUserTodos = "https://jsonplaceholder.typicode.com/users/1/todos";

interface DataUserPostsProps {
  body: string;
  userId: number;
  id: number;
  title: string;
}

interface DataUserTodosProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type ResponseData<T> = T extends () => Promise<infer DataUserPostsProps>
  ? DataUserPostsProps
  : DataUserTodosProps;

const fetchData = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

const DataListPosts: React.FC<DataUserPostsProps> = (data) => {
  return (
    <>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
      <h3>{data.id}</h3>
    </>
  );
};

const DataListTodos: React.FC<DataUserTodosProps> = (data) => {
  return (
    <>
      <h1>{data.title}</h1>
      <h3>{data.id}</h3>
      <h3>{String(data.completed)}</h3>
    </>
  );
};

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<ResponseData<typeof fetchData>[]>([]);
  const [changeUrl, setChangeUrl] = useState(URLDataUserPosts);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const fetchedData = await fetchData(changeUrl);
      setData(fetchedData);
    };

    fetchDataAndSetData();
  }, [changeUrl]);

  const handleChangeUrl = () => {
    setChangeUrl(
      changeUrl === URLDataUserPosts ? URLDataUserTodos : URLDataUserPosts
    );
  };

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
      <button onClick={handleChangeUrl}>change url</button>

      <div>
        {data?.map((data) => (
          <Fragment key={data.id}>
            {changeUrl === URLDataUserPosts ? (
              <DataListPosts {...data} />
            ) : (
              <DataListTodos {...data} />
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default App;
