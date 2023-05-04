import { useEffect, useState } from 'react';
import axios from 'axios';
import './menu.css';

import Header from '../Header/header';
import NavBar from '../navbar/NavBar';
import CardsProd from '../cardsProd/cardsProd';
import Order from '../order/Order';
import OrderModal from '../UI/Modal';

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [productsInOrder, setProductsInOrder] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [customer, setCustomer] = useState('');
  // const [quantity, setQuantity] = useState(0);

  const menuDefault = 'Breakfast';

  const handleMenu = (event) => {
    const type = event?.target.value || menuDefault;
    const filteredResults = products.filter((product) => product.type === type);
    setFilteredMenu(filteredResults);
  };

  function handleAddToOrder(id) {
    const newItem = products.filter((product) => product.id === id);
    setProductsInOrder([...productsInOrder, ...newItem]);
  }

  const handleCustomerName = (event) => {
    const newCustomer = event.target.value;
    setCustomer(newCustomer);
  };

  const submitOrder = (e) => {
    e.preventDefault();
    const orderObj = {
      userId: '',
      client: customer,
      products: [
        {
          qty: 1,
          product: {
            id: 1,
            name: '',
            price: '',
            image: '',
            type: '',
            dateEntry: '',
          },
        },
      ],
    };
    const productsInaaaa = productsInOrder.forEach((product) =>
      console.log(product),
    );
    console.log('orden enviada');
  };

  const getProducts = async () => {
    const token = localStorage.getItem('sessionToken');
    await axios
      .get('http://localhost:8080/products', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const response = res.data;
        const filteredResults = response.filter(
          (product) => product.type === menuDefault,
        );
        setProducts(response);
        setFilteredMenu(filteredResults);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Header />
      <NavBar
        handleMenu={handleMenu}
        setModalIsOpen={setModalIsOpen}
        handleCustomerName={handleCustomerName}
      />
      <CardsProd products={filteredMenu} handleAddToOrder={handleAddToOrder} />
      <OrderModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <Order submitOrder={submitOrder} productsInOrder={productsInOrder} />
      </OrderModal>
    </div>
  );
}
