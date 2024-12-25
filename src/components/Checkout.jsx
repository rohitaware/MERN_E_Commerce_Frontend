import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import TableProduct from "./TableProduct";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });

      const { orderId, amount: orderAmount } = orderResponse.data;
      console.log('order response', orderResponse);

      const options = {
        key: "rzp_test_alPa7pVaNXVc0w",
        amount: orderAmount,
        currency: "INR",
        name: "Rohit",
        description: "Order Payment",
        order_id: orderId,
        handler: async (response) => {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: userAddress,
          };

          try {
            const apiResponse = await axios.post(`${url}/payment/verify-payment`, paymentData);
            console.log(paymentData);
            if (apiResponse.data.success) {
              clearCart();
              navigate("/orderconfirmation");
            }
          } catch (error) {
            console.error("Payment verification failed", error);
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: user?.name || "User",
          email: user?.email || "user@example.com",
          contact: user?.phone || "0000000000",
        },
        notes: {
          address: userAddress?.address || "N/A",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">Order Summary</h1>
        <table className="table table-bordered border-primary bg-dark">
          <thead>
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Product Details
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-dark text-light">
                <TableProduct cart={cart} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold" }}>
                  <li>Name: {userAddress?.fullName || "N/A"}</li>
                  <li>Phone Number: {userAddress?.phoneNumber || "N/A"}</li>
                  <li>Country: {userAddress?.country || "N/A"}</li>
                  <li>State: {userAddress?.state || "N/A"}</li>
                  <li>City: {userAddress?.city || "N/A"}</li>
                  <li>Pincode: {userAddress?.pincode || "N/A"}</li>
                  <li>Nearby: {userAddress?.address || "N/A"}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg"
          style={{ fontWeight: "bold" }}
          onClick={handlePayment}
          disabled={!cart?.items?.length || !userAddress || loading}
        >
          {loading ? "Processing..." : "Proceed To Pay"}
        </button>
      </div>
    </>
  );
};

export default Checkout;
