import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";

const AppState = (props) => {
  // const url = "http://localhost:1000/api";
  const url = "https://mern-e-commerce-api-mywp.onrender.com/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [userOrder, setUserOrder] = useState([]);




  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true,
      });
      console.log(api.data.products);
      setProducts(api.data.products);
      setFilteredData(api.data.products);
      userProfile();
    };
    fetchProduct();
    userCart();
    getAddress();
    user_Order();
  }, [token, reload]);

  useEffect(() => {
    let lstoken = localStorage.getItem("token");
    // console.log('ls token',lstoken)

    if (lstoken) {
      setToken(lstoken);
      setIsAuthenticated(true);
    }
    // setToken(localStorage.getItem('token'))
  }, []);

  //User Register
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true,
      }
    );
    // alert(api.data.message);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
    // console.log("User Register",api);
  };

  //User LOgin
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true,
      }
    );
    // alert(api.data.message);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    // console.log("User login",api.data);
    setToken(api.data.token);
    setIsAuthenticated(true);
    localStorage.setItem("token", api.data.token);
    return api.data;
  };

  //Logout User
  const logout = () => {
    setIsAuthenticated(false);
    setToken(" ");
    localStorage.removeItem("token");
    toast.success("Logout SuccessFully...!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //USer Profile
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: { "Content-Type": "Application/json", Auth: token },
      withCredentials: true,
    });
    // console.log('USer Profile',api.data);
    setUser(api.data.user);
    // setProducts(api.data.products);
    // setFilteredData(api.data.products);
  };

  //Add To cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: { "Content-Type": "Application/json", Auth: token },
        withCredentials: true,
      }
    );
    setReload(!reload);
    // console.log('my cart',api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //User cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: { "Content-Type": "Application/json", Auth: token },
      withCredentials: true,
    });
    // console.log('user cart',api.data.cart);
    setCart(api.data.cart);
  };

  //-- Qty
  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/decrease-qty`,
      { productId, qty },
      {
        headers: { "Content-Type": "Application/json", Auth: token },
        withCredentials: true,
      }
    );
    setReload(!reload);
    // console.log('decrease cart item',api);
    // setCart(api.data.cart)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //Remove from Cart
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: { "Content-Type": "Application/json", Auth: token },
      withCredentials: true,
    });
    setReload(!reload);
    console.log("Remove cart item", api);
    // setCart(api.data.cart)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //Clear All  Cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: { "Content-Type": "Application/json", Auth: token },
      withCredentials: true,
    });
    setReload(!reload);
    console.log("Remove cart item", api);
    // setCart(api.data.cart)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //Shipping Address
  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },
      {
        headers: { "Content-Type": "Application/json", Auth: token },
        withCredentials: true,
      }
    );
    setReload(!reload);
    console.log("Remove cart item", api);
    // setCart(api.data.cart)
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  //get User latest adress
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: { "Content-Type": "Application/json",
        Auth:token
       },
      withCredentials: true,
    });
    // console.log('user Address',api.data.userAddress);

    setUserAddress(api.data.userAddress);
    
   
  };

//get user order
  const user_Order = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: { "Content-Type": "Application/json",
        Auth:token
       },
      withCredentials: true,
    });
    // console.log('user Order',api.data);
    setUserOrder(api.data);
  };
  console.log('user Order',userOrder);


  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filteredData,
        setFilteredData,
        logout,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
        shippingAddress,
        userAddress,
        userOrder,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
