import React,{useContext,useEffect,useState} from 'react'
import AppContext from '../context/AppContext'
import ShowOrderProduct from './ShowOrderProduct'




const OrderConfirmation = () => {
    const {userOrder} = useContext(AppContext)

    const [latestOrder, setLatestOrder] = useState({})

    useEffect(() => {

        if(userOrder){
            setLatestOrder(userOrder[0]);
        }
     
    }, [userOrder])
    
    console.log('latest order',latestOrder);
  return (
    <>
   <div className="container my-3">
    <h1 className='text-center'>Your Order Has Been Confirm,</h1>
    <h3 className='text-center'>It Will Delivered Soon</h3>
   </div>

   <div className="container">
        <table className="table table-bordered border-primary bg-dark">
          <thead>
            <tr>
              <th scope="col" className="bg-dark text-light text-center">
                Order Items
              </th>
              <th scope="col" className="bg-dark text-light text-center">
                OrderDetails & ShippingAddress
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-dark text-light">
                {/* <TableProduct cart={cart} /> */}
                <ShowOrderProduct items= {latestOrder?.orderItems}/>
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold" }}>
                  <li>OrderID: {latestOrder?.orderId || "N/A"}</li>
                  <li>PaymentId: {latestOrder?.paymentId || "N/A"}</li>

                  <li>Paymentstatus: {latestOrder?.payStatus || "N/A"}</li>

                  <li>Name: {latestOrder?.userShipping?.fullName || "N/A"}</li>

                  <li>Phone Number: {latestOrder?.userShipping?.phoneNumber || "N/A"}</li>
                  <li>Country: {latestOrder?.userShipping?.country || "N/A"}</li>
                  <li>State: {latestOrder?.userShipping?.state || "N/A"}</li>
                  <li>City: {latestOrder?.userShipping?.city || "N/A"}</li>
                  <li>Pincode: {latestOrder?.userShipping?.pincode}</li>
                  <li>Nearby: {latestOrder?.userShipping?.address || "N/A"}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg"
        style={{ fontWeight: "bold" }}>
          Proceed To Pay
        </button>
      </div> */}
    </>
  )
}

export default OrderConfirmation
