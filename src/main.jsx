import { StrictMode } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createRoot } from "react-dom/client";
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import App from "./app/router/App.jsx";
import CounterContextProvider from "./app/Context/CounterContext.jsx";
import TokenContextProvider from "./app/Context/TokenContext.jsx";
import CartContextProvider, {
  CartContext,
} from "./app/Context/Cartcontext.jsx";
import { Provider } from "react-redux";
import { store } from "./app/Context/Redux/store.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById("root")).render(
  <TokenContextProvider>
    <Provider store={store}>
      {/* <WishListContextProvider> */}
      <CartContextProvider>
        <CounterContextProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </CounterContextProvider>
      </CartContextProvider>
      {/* </WishListContextProvider> */}
    </Provider>
  </TokenContextProvider>
);
