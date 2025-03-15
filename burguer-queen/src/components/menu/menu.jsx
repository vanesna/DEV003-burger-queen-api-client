import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
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
  const [productQuantities, setProductQuantities] = useState({});

  const menuDefault = 'Breakfast';

  const handleMenu = (event) => {
    const type = event?.target.value || menuDefault;
    const filteredResults = products.filter((product) => product.type === type);
    setFilteredMenu(filteredResults);
  };

  const handleCustomerName = (event) => {
    const newCustomer = event.target.value;
    setCustomer(newCustomer);
  };

  function handleAddToOrder(id) {
    const newItem = products.find((product) => product.id === id);
    const existingItem = productsInOrder.find((item) => item.id === id);

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      setProductsInOrder(
        productsInOrder.map((item) => {
          if (item.id === id) {
            return updatedItem;
          } else {
            return item;
          }
        }),
      );

      setProductQuantities((prevState) => ({
        ...prevState,
        [id]: existingItem.quantity + 1,
      }));
    } else {
      let newProduct = {
        ...newItem,
        quantity: 1,
      };

      setProductsInOrder([...productsInOrder, newProduct]);

      setProductQuantities((prevState) => ({
        ...prevState,
        [id]: 1,
      }));
    }
  }

  function handleRemoveFromOrder(id) {
    const existingItem = productsInOrder.find((item) => item.id === id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };

        setProductsInOrder(
          productsInOrder.map((item) => {
            if (item.id === id) {
              return updatedItem;
            } else {
              return item;
            }
          }),
        );

        setProductQuantities((prevState) => ({
          ...prevState,
          [id]: existingItem.quantity - 1,
        }));
      } else {
        setProductsInOrder(productsInOrder.filter((item) => item.id !== id));
        setProductQuantities((prevState) => {
          const newState = { ...prevState };
          delete newState[id];
          return newState;
        });
      }
    }
  }

  const submitOrder = (e) => {
    e.preventDefault();
  
    let d = new Date();
    let formatteddatestr = moment(d).format('hh:mm a');
    const token = localStorage.getItem('sessionToken');
    const id = new Date().getTime();
    const user = JSON.parse(localStorage.getItem('sessionUser'));
  
    const productList = productsInOrder.map((product) => product.id);
    const uniqueProducts = [...new Set(productList)];
    const products = uniqueProducts.map((id) => {
      const product = productsInOrder.find((product) => product.id === id);
      return { qty: product.quantity, product };
    });
  
    const order = {
      id,
      userId: user.id,
      client: customer, // Se usa el nombre del cliente que ya se ingresó
      products,
      status: 'pending',
      dataEntry: formatteddatestr,
    };
  
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    axios
      .post('http://localhost:8080/orders', order, { headers })
      .then((response) => {
        console.log(response);
  
        // 🟢 Después de confirmar la orden, restablecer todo
        setModalIsOpen(false); // Cierra el modal
        setProductsInOrder([]); // Vacía la orden
        setProductQuantities({}); // Reinicia las cantidades
        setCustomer(''); // Borra el nombre del cliente
      })
      .catch((error) => {
        console.log(error);
      });
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
      <CardsProd
        products={filteredMenu}
        handleAddToOrder={handleAddToOrder}
        handleRemoveFromOrder={handleRemoveFromOrder}
        productQuantities={productQuantities}
      />
      <OrderModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <Order submitOrder={submitOrder} productsInOrder={productsInOrder} />
      </OrderModal>
    </div>
  );
}
