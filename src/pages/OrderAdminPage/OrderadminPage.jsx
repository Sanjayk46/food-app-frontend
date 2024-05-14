import React, { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAll, admintrackId, getorderstatus } from '../../services/orderservice';
import classes from './orderadmin.module.css';
import Title from '../../components/Title/Title';
import DateTime from '../../components/Date/Date';
import Price from '../../components/Price/Price';

const initialState = {};
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ALL_STATUS_FETCHED':
      return { ...state, allStatus: payload };
    case 'ORDERS_FETCHED':
      return { ...state, orders: payload };
    default:
      return state;
  }
};

export default function OrderAdminPage() {
  const [{ orders }, dispatch] = useReducer(reducer, initialState);
  const { filter } = useParams();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getAll(filter).then(orders => {
      dispatch({ type: 'ORDERS_FETCHED', payload: orders });
      // Fetch individual order status
      fetchOrderStatus(orders);
    });
  }, [filter]);

  const fetchOrderStatus = async orders => {
    try {
      const statusPromises = orders.map(order => getorderstatus(order.id));
      const statuses = await Promise.all(statusPromises);
      setOrder(statuses);
    } catch (error) {
      console.error('Error fetching order status:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const confirmed = window.confirm(`Are you sure you want to change the status to ${newStatus}?`);
    if (confirmed) {
      try {
        await admintrackId(id, newStatus);
        // Update the order status in the frontend
        setOrder(prevOrder => {
          return prevOrder.map(order => {
            if (order.id === id) {
              return { ...order, status: newStatus };
            }
            return order;
          });
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
      <Title title="Manage Orders" margin="1.5rem 0 3 .2rem" fontSize="1.9rem" />
      {orders && (
        <table className={classes.ordersTable}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Items</th>
              <th>Total Price</th>
              <th className={classes.actionColumn}>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              // Filter out orders that are not payed
              {order.status === 'payed' &&
                <tr key={order.id}>
                  <td>
                    <ol>
                      {order.items.map(item => (
                        <li key={item.food.id}>
                          {item.food.name}
                        </li>
                      ))}
                    </ol>
                  </td>
                  <td>{order.firstName}</td>
                  <td>{order.lastName}</td>
                  <td><DateTime date={order.createdAt} /></td>
                  <td style={{ color: 'green' }}>{order.status}</td> {/* Green color for status */}
                  <td><Price price={order.totalPrice} /></td>
                  <td>{order.id}</td>
                  <td className={`${classes.customFont} ${classes.actionColumn}`}>
                    <div className={classes.buttonContainer}>
                      <button style={{ backgroundColor: 'red' }} onClick={() => handleStatusChange(order.id, 'CANCEL')}>Cancel</button> {/* Red color for cancel button */}
                      <button style={{ backgroundColor: 'green' }} onClick={() => handleStatusChange(order.id, 'REFUND')}>Refund</button> {/* Green color for refund button */}
                    </div>
                  </td>
                </tr>
              }
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
