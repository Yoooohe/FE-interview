import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setCount(count + 1);
  //   }, 1000);
  //   return () => {
  //     clearInterval(id);
  //   };
  // }, [count]);

  const [number, setNumber] = useState(0);
  console.log("????", number);

  useEffect(() => {
    setNumber((num) => {
      console.log("---0---: ", num);
      return num + 1;
    });
    console.log("----0000");
    setNumber((num) => {
      console.log("---1---: ", num);
      return num + 1;
    });
    console.log("----1111");
    setNumber((num) => {
      console.log("---2---: ", num);
      return num + 1;
    });
    console.log("----2222");
  }, []);

  return <div>{number}</div>;
}

export default App;
