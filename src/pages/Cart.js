import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de tener jwt-decode instalado

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  // Decodificar el token para obtener el userId
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId); // Asumiendo que el userId está en el payload del token
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
  }, []);

  // Obtener los productos del carrito
  useEffect(() => {
    if (userId) {
      const fetchCartItems = async () => {
        try {
          const response = await fetch(`http://98.85.200.29:5002/cart?userId=${userId}`);
          const data = await response.json();
          setCartItems(data.cart);
        } catch (error) {
          alert('Error al obtener el carrito');
        }
      };

      fetchCartItems();
    }
  }, [userId]);

  // Función para eliminar un producto del carrito
  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(`http://98.85.200.29:5002/cart/${productId}?userId=${userId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.message) {
        setCartItems(cartItems.filter(item => item.productId !== productId));
        alert('Producto eliminado del carrito');
      } else {
        alert('Error al eliminar el producto');
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="cart-container">
      <h1>Mi Carrito</h1>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.productId} className="cart-item">
              <p>Producto ID: {item.productId}</p>
              <p>Cantidad: {item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item.productId)} className="remove-button">
                Eliminar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
    </div>
  );
};

export default Cart;
