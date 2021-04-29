import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import fakeData from "./fakeData.json";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Admin from "./components/Admin/Admin";
import Orders from "./components/Orders/Orders";
import firebase from "firebase/app";
import firebaseConfig from "./firebase.config";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Spinner from "react-bootstrap/Spinner";
import CheckOut from "./components/CheckOut/CheckOut";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const UserContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
  });
  useEffect(() => {
    fetch("https://rhubarb-cobbler-67677.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  // const handleProduct = () => {
  //   fetch("http://localhost:5000/addProducts", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(fakeData),
  //   });
  // };
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Header checkUser={[user, setUser]} />
        {/* <Spinner animation="grow" /> */}
        <Route exact path="/">
          <div style={{ display: "flex" }} className="product-container">
            {!products.length && <Spinner className="m-5" animation="grow" />}
            {products.map((product) => (
              <Home product={product} />
            ))}
          </div>
        </Route>
        <Route exact path="/home">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="product-container"
          >
            {!products.length && <Spinner className="m-5" animation="grow" />}
            {products.map((product) => (
              <Home product={product} />
            ))}
          </div>
        </Route>
        <Route path="/login">
          <Login checkUser={[user, setUser]} />
        </Route>
        <PrivateRoute path="/admin">
          <Admin products={products} />
        </PrivateRoute>
        <PrivateRoute path="/orders">
          <Orders />
        </PrivateRoute>
        <PrivateRoute path="/checkout/:id">
          <CheckOut />
        </PrivateRoute>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
