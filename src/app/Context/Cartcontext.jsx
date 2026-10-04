import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

const getHeaders = () => ({
  token: localStorage.getItem("userToken"),
});

// الـ API أحيانا يرجّع product كـ string (ID) وأحيانا كـ object، فبنتعامل مع الحالتين
const extractIds = (products = []) =>
  products.map((item) =>
    typeof item.product === "string"
      ? item.product
      : item.product?._id ?? item.product?.id
  );

export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [cartId, setcartId] = useState(null);
  const [cartProductIds, setCartProductIds] = useState([]);
  const [wishListIds, setWishListIds] = useState([]);

  /* ---------------- Cart ---------------- */

  async function addToCart(productId) {
    return await axios
      .post(`${BASE_URL}/cart`, { productId }, { headers: getHeaders() })
      .then((response) => {
        setcartId(response.data.data._id);
        setTotalCartPrice(response.data.data.totalCartPrice);
        setNumOfCartItems(response.data.numOfCartItems);
        setCartProductIds(extractIds(response.data.data.products));
        toast.success(response.data.message);
        return response;
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
        return err;
      });
  }

  async function getCart() {
    return await axios
      .get(`${BASE_URL}/cart`, { headers: getHeaders() })
      .then((response) => {
        setNumOfCartItems(response.data.numOfCartItems);
        setcartId(response.data.data._id);
        setTotalCartPrice(response.data.data.totalCartPrice);
        setCartProductIds(extractIds(response.data.data.products));
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  async function removeCartItem(productId) {
    return await axios
      .delete(`${BASE_URL}/cart/${productId}`, { headers: getHeaders() })
      .then((response) => {
        setNumOfCartItems(response.data.numOfCartItems);
        setcartId(response.data.data._id);
        setTotalCartPrice(response.data.data.totalCartPrice);
        setCartProductIds(extractIds(response.data.data.products));
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  async function updateProduct(productId, count) {
    return await axios
      .put(`${BASE_URL}/cart/${productId}`, { count }, { headers: getHeaders() })
      .then((response) => {
        setNumOfCartItems(response.data.numOfCartItems);
        setcartId(response.data.data._id);
        setTotalCartPrice(response.data.data.totalCartPrice);
        setCartProductIds(extractIds(response.data.data.products));
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  async function onlinePayment(shippingAddress) {
    return await axios
      .post(
        `${BASE_URL}/orders/checkout-session/${cartId}?url=${window.location.origin}`,
        { shippingAddress },
        { headers: getHeaders() }
      )
      .then((response) => {
        sessionStorage.setItem("justPaid", String(Date.now()));
        window.location.href = response.data.session.url;
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  async function clearAllCart() {
    return await axios
      .delete(`${BASE_URL}/cart`, { headers: getHeaders() })
      .then((response) => {
        setTotalCartPrice(0);
        setNumOfCartItems(0);
        setCartProductIds([]);
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /* ---------------- Wishlist ---------------- */

  async function getToWishList() {
    return await axios
      .get(`${BASE_URL}/wishlist`, { headers: getHeaders() })
      .then((response) => {
        const list = response.data.data;
        if (Array.isArray(list)) {
          setWishListIds(list.map((p) => p._id));
        }
        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async function addToWishList(productId) {
    return await axios
      .post(`${BASE_URL}/wishlist`, { productId }, { headers: getHeaders() })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setWishListIds(response.data.data);
        }
        toast.success(response.data.message);
        return response;
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
        return err;
      });
  }

  async function removeWishList(productId) {
    return await axios
      .delete(`${BASE_URL}/wishlist/${productId}`, { headers: getHeaders() })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setWishListIds(response.data.data);
        }
        toast.success(response.data.message);
        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  function resetCounters() {
    setNumOfCartItems(0);
    setTotalCartPrice(0);
    setcartId(null);
    setCartProductIds([]);
    setWishListIds([]);
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCart,
        removeCartItem,
        updateProduct,
        onlinePayment,
        clearAllCart,
        numOfCartItems,
        totalCartPrice,
        cartProductIds,

        addToWishList,
        getToWishList,
        removeWishList,
        wishListIds,
        numOfWishListItems: wishListIds.length,

        resetCounters,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}