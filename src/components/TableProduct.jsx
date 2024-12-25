import React, { useContext, useEffect,useState } from "react";
import AppContext from "../context/AppContext";

const TableProduct = ({ cart }) => {
  const { decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext); // Ensure these are defined in AppContext
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

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
      <table className="table table-bordered border-primary bg-dark text-center">
        <thead>
          <tr>
            <th scope="col" className="bg-dark text-light">
              product Img
            </th>
            <th scope="col" className="bg-dark text-light">
              Title
            </th>
            <th scope="col" className="bg-dark text-light">
              price
            </th>
            <th scope="col" className="bg-dark text-light">
              Qty
            </th>
            <th scope="col" className="bg-dark text-light">
              Qty++
            </th>

            <th scope="col" className="bg-dark text-light">
              Qty--
            </th>

            <th scope="col" className="bg-dark text-light">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
            <tr key={product._id}>
              <th scope="row" className="bg-dark text-light">
                <img
                  src={product.imgSrc}
                  style={{ width: "50px", height: "50px" }}
                />
              </th>
              <td className="bg-dark text-light">{product.title}</td>
              <td className="bg-dark text-light">{product.price}</td>
              <td className="bg-dark text-light">{product.qty}</td>
              <td className="bg-dark text-light"><span className="material-symbols-outlined"
               onClick={() =>
                addToCart(
                  product?.productId, // Ensure _id is correct
                  product.title,
                  product.price / product.qty, // Avoid division by zero
                  1,
                  product.imgSrc
                )
              }>
add
</span></td>

              <td className="bg-dark text-light"><span className="material-symbols-outlined"
              onClick={() => decreaseQty(product.productId, 1)}>
remove
</span></td>

              <td className="bg-dark text-light"><span className="material-symbols-outlined"
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to remove this item from the cart?"
                  )
                ) {
                  removeFromCart(product?.productId);
                }
              }}>
delete
</span></td>
            </tr>
          ))}

          <tr>
            <th scope="row" className="bg-dark text-light"></th>
            <td className="bg-dark text-light">
              <button
                className="btn btn-primary"
                style={{ fontWeight: "bold" }}
              >
                Total
              </button>
            </td>
            <td className="bg-dark text-light">
              <button
                className="btn btn-warning"
                style={{ fontWeight: "bold" }}
              >
                {price}
              </button>
            </td>
            <td className="bg-dark text-light">
              <button className="btn btn-info" style={{ fontWeight: "bold" }}>
                {qty}
              </button>
            </td>
            <td className="bg-dark text-light" ></td>

            <td className="bg-dark text-light"></td>

            <td className="bg-dark text-light"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TableProduct;
