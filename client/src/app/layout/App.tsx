import { useEffect, useState } from "react";
import Header from "./Header";
import {
  Container,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../context/StoreContext";
import agent from "../api/agent";
import { getCookie } from "../util/util";
import LoadingComponent from "./LoadingComponent";
function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [setBasket]);
  const [darkMode, setDarkMode] = useState(false);
  const theme: PaletteMode = darkMode ? "dark" : "light";
  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  function HandleChange() {
    setDarkMode((prevState) => {
      return !prevState;
    });
  }
  if (loading) return <LoadingComponent message="Initialising app..." />;
  return (
    <ThemeProvider theme={darkTheme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header dark={darkMode} HandleChange={HandleChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
// let [name, setName] = useState("");
// const [price, setPrice] = useState(0);

// function parseIntWithFilter(value: string): number {
//   console.log(value, typeof value);
//   // Add your own logic here to filter out non-numeric characters
//   if (!isNaN(parseInt(value[value.length - 1]))) {
//     return parseInt(value);
//   } else {
//     if (value == "NaN" || value == "Na") {
//       return 0;
//     }
//     value = value.slice(0, -1);
//     return parseInt(value.slice(0, -1));
//   }
//   // const filteredValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
//   // return parseInt(filteredValue, 10); // Parse the filtered value as an integer
// }
{
  /* <input
        id="name"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        id="price"
        placeholder="Product Price"
        value={price}
        onChange={(e) => setPrice(parseIntWithFilter(e.target.value))}
      ></input> */
}
