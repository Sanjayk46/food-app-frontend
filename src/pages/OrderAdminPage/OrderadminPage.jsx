import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getorderstatus, admintrackId } from '../../services/orderservice';
import Title from '../../components/Title/Title';
import classes from './orderadmin.module.css';

export default function OrderAdminPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null); // Initialize as null initially

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const fetchedOrder = await getorderstatus(orderId);
        setOrder(fetchedOrder);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const handleStatusChange = async (id, newStatus) => {
    const confirmed = window.confirm(`Are you sure you want to change the status to ${newStatus}?`);
    if (confirmed) {
      try {
        await admintrackId(id, newStatus);
        // Update the order status in the frontend
        setOrder(prevOrder => {
          if (prevOrder.id === id) {
            return { ...prevOrder, status: newStatus };
          }
          return prevOrder;
        });
        alert('Order status updated successfully!');
      } catch (error) {
        console.error('Error updating status:', error);
        alert(error.message || 'Failed to update order status!');
      }
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Title title="Manage Orders" margin="1rem auto" />
        <table>
          <thead>
            <tr>
              <th>OrderID</th>
              <th>FirstName</th>
              <th>FoodName</th>
              <th>PaymentID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {order && (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.FirstName}</td>
                <td>{order.food}</td>
                <td>{order.paymentId}</td>
                <td>
                  <button onClick={() => handleStatusChange(order.id, 'SHIPPED')}>Shipped</button>
                  <button onClick={() => handleStatusChange(order.id, 'CANCELED')}>Canceled</button>
                  <button onClick={() => handleStatusChange(order.id, 'REFUNDED')}>Refunded</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
