// Inside the return statement of OrderAdminPage component
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
        <td>{order.id}</td>
        <td style={{ color: 'green' }}>{order.status}</td>
        <td><Price price={order.totalPrice} /></td>
        <td className={`${classes.customFont} ${classes.actionColumn}`}>
          <div className={classes.buttonContainer}>
            <button style={{ backgroundColor: 'red' }} onClick={() => handleStatusChange(order.id, 'CANCEL')}>Canceled</button> 
            <button style={{ backgroundColor: 'green' }} onClick={() => handleStatusChange(order.id, 'REFUND')}>Refunded</button> 
        </td>
      </tr>
    }
  ))}
</tbody>
