 import AxiosService from "../axiosConfig";
// import axios from 'axios';

export const createOrder = async order => {
 
    const { data } = AxiosService.post('/api/orders/create', order);
    return data;
};

export const getNewOrderForCurrentUser = async () => {
  const { data } = await AxiosService.get('/api/orders/newOrderForCurrentUser');
  return data;
};

export const pay = async paymentId => {
  try {
    const { data } = await AxiosService.put('/api/orders/pay', { paymentId });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const trackOrderById = async orderId => {
  const { data } = await AxiosService.get('/api/orders/track/' + orderId);
  return data;
};
export const admintrackId = async (orderId, newStatus) => {
  const { data } = await AxiosService.put(`/api/orders/${orderId}`, { status: newStatus });
  return data;
};
export const getorderstatus = async orderId => {
  const { data } = await AxiosService.get('/api/orders/orderlist' + orderId);
  return data;
};

export const getAll = async state => {
  const { data } = await AxiosService.get(`/api/orders/${state ?? ''}`);
  return data;
};

export const getAllStatus = async () => {
  const { data } = await AxiosService.get(`/api/orders/allstatus`);
  return data;
};
