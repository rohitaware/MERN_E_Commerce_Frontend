import React, {  useEffect,useState } from "react";


const ShowOrderProduct = ({ items }) => {
 
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (items) {
      const totals = items.reduce(
        (acc, items) => {
          acc.qty += items.qty;
          acc.price += items.price;
          return acc;
        },
        { qty: 0, price: 0 }
      );
      setQty(totals.qty);
      setPrice(totals.price);
    }
  }, [items]);

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
           
          </tr>
        </thead>
        <tbody>
          {items?.map((product) => (
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
           
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ShowOrderProduct;
