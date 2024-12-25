import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext); // Ensure these are defined in AppContext
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (cart?.items) {
      const totals = cart.items.reduce(
        (acc, item) => {
          acc.qty += item.qty;
          acc.price += item.price;
          return acc;
        },
        { qty: 0, price: 0 }
      );
      setQty(totals.qty);
      setPrice(totals.price);
    }
  }, [cart]);

  return (
    <>
    {cart?.items?.length == 0 ? (
        <>
        <div className="text-center my-5">
        <button
          className="btn btn-warning mx-3"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
          onClick={()=> navigate('/')}
          >
          Continue Shopping...
        </button>
        </div>
        </>
          

    ) : (
        <>
        <div className="my-5 text-center">
        <button
          className="btn btn-info mx-3"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Total Qty: {qty}
        </button>
        <button
          className="btn btn-warning mx-3"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Total Price: {price}
        </button>
      </div>
        </>

    )}
      
      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container bg-dark my-5 p-3 text-center"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className="cart_img">
              <img
                src={product.imgSrc}
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                  border: "2px solid yellow",
                }}
              />
            </div>
            <div className="cart_des">
              <h1>{product.title}</h1>
              <h4>{product.price}</h4>
              <h4>QTY: {product.qty}</h4>
            </div>
            <div className="cart_action">
              <button
                className="btn btn-warning mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => decreaseQty(product.productId, 1)} // Ensure _id is correct
              >
                Qty--
              </button>
              <button
                className="btn btn-info mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() =>
                  addToCart(
                    product?.productId, // Ensure _id is correct
                    product.title,
                    product.price / product.qty, // Avoid division by zero
                    1,
                    product.imgSrc
                  )
                }
              >
                Qty++
              </button>
              <button
                className="btn btn-danger mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to remove this item from the cart?"
                    )
                  ) {
                    removeFromCart(product?.productId);
                  }
                }}
              >
                Remove Item
              </button>
            </div>
          </div>
        </div>
      ))}

      {cart?.items?.length > 0 && (
        <div className="container text-center my-5">
          <button
            className="btn btn-warning mx-3"
            style={{ fontWeight: "bold" }}
            onClick={()=>navigate('/shipping')}
          >
            CheckOut
          </button>
          <button
            className="btn btn-danger mx-3"
            style={{ fontWeight: "bold" }}
            onClick={() => {
              if (confirm("Are You Sure Want To Clear Cart?")) {
                clearCart();
              }
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
