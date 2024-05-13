import React, {useState, useEffect} from 'react';
import classes from './Payment.module.css';
import Title from '../../components/Title/Title';
import {getNewOrderForCurrentUser} from '../../services/orderservice';
import PaypalButtons from '../../components/PaypalButtons/PaypalButtons';
import Map from '../../components/Map/Map';
import OrderItemsList from '../../components/OrderItemList/OrderItemList';

export default function PaymentPage() {
  const [order, setOrder] = useState();

  useEffect(() => {
    getNewOrderForCurrentUser().then(data => setOrder(data));
  }, []);

  if (!order) return;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.summary}>
            <div>
              <h3>firstName:</h3>
              <span>{order.firstName}</span>
            </div>
            <div>
              <h3>lastName:</h3>
              <span>{order.lastName}</span>
            </div>
            <div>
              <h3>Address:</h3>
              <span>{order.address}</span>
            </div>
          </div>
          <OrderItemsList order={order} />
        </div>

        <div className={classes.map}>
          <Title title="Your Location" fontSize="1.6rem" />
          <Map readonly={true} location={order.addressLatLng} />
        </div>

        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <PaypalButtons order={order} />
          </div>
        </div>
      </div>
    </>
  );
}


