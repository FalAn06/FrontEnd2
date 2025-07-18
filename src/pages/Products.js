import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Products.css';

const Products = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('botellones');
  const [reviews, setReviews] = useState([]); // Estado para las reseñas cargadas
  const [userId, setUserId] = useState(null); // Estado para el userId
  const [reviewText, setReviewText] = useState(''); // Estado para el texto de la reseña

  const [cartItems, setCartItems] = useState([]); // Estado para el carrito

  // Datos simulados de productos, ahora con una imagen URL
  const products = {
    botellones: [
      {
        name: 'Botellón de 5L',
        description: 'Ideal para familias grandes',
        price: '$10',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon5litros.jpg',
        productId: '123', // ID del producto para vincular con las reseñas
      },
      {
        name: 'Botellón de 10L',
        description: 'Botellón grande para oficinas',
        price: '$18',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon10.jpg',
        productId: '124',
      },
      {
        name: 'Botellón de 20L',
        description: 'Botellón para uso comercial',
        price: '$30',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon20.jpg',
        productId: '125',
      },
      {
        name: 'Botellón de 7L',
        description: 'Botellón práctico para el hogar',
        price: '$15',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon7.jpg',
        productId: '126',
      },
    ],
    valvulas: [
      {
        name: 'Válvula de cierre',
        description: 'Válvula para botellones de agua',
        price: '$5',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/valvulas/valvudecierre.jpg',
        productId: '223',
      },
      {
        name: 'Válvula de seguridad',
        description: 'Para evitar fugas de agua',
        price: '$8',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/valvulas/V%C3%A1lvula%20de%20seguridad.jpg',
        productId: '224',
      },
      {
        name: 'Válvula de presión',
        description: 'Regula la presión del agua',
        price: '$12',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/valvulas/V%C3%A1lvula%20de%20presi%C3%B3n.jpg',
        productId: '225',
      },
      {
        name: 'Válvula de drenaje',
        description: 'Ideal para sistemas de filtrado',
        price: '$6',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/valvulas/V%C3%A1lvula%20de%20drenaje.jpg',
        productId: '226',
      },
    ],
    filtros: [
      {
        name: 'Filtro de agua básico',
        description: 'Filtro de agua doméstico',
        price: '$20',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/filtros/Filtro%20de%20agua%20b%C3%A1sico.jpg',
        productId: '323',
      },
      {
        name: 'Filtro de agua industrial',
        description: 'Filtrado para grandes cantidades de agua',
        price: '$50',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/filtros/Filtro%20de%20agua%20industrial.jpg',
        productId: '324',
      },
      {
        name: 'Filtro purificador',
        description: 'Purifica el agua eliminando bacterias',
        price: '$35',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/filtros/Filtro%20purificador.jpg',
        productId: '325',
      },
      {
        name: 'Filtro de carbón activado',
        description: 'Elimina impurezas y malos olores',
        price: '$25',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/filtros/Filtro%20de%20carb%C3%B3n%20activado.jpg',
        productId: '326',
      },
    ],
  };

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

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Función para manejar el envío de reseña
  const handleAddReview = async (productId) => {
    if (!reviewText) {
      alert('Por favor, ingresa una reseña.');
      return;
    }

    const reviewData = {
      productId,
      user: userId, // Ahora estamos usando el userId desde el token
      review: reviewText,
      rating: 5, // Este ejemplo tiene una calificación de 5
    };

    try {
      const response = await fetch(`http://98.85.200.29:5000/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();
      if (data.message) {
        alert('Reseña agregada con éxito');
        setReviewText(''); // Limpiar el campo de reseña
        fetchReviews(productId); // Refrescar las reseñas después de agregar una nueva
      } else {
        alert('Error al agregar reseña');
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  // Función para obtener reseñas de un producto
  const fetchReviews = async (productId) => {
    try {
      const response = await fetch(`http://98.85.200.29:5001/reviews?productId=${productId}`);
      const data = await response.json();
      setReviews(data.reviews);
    } catch (error) {
      alert('Error al cargar reseñas');
    }
  };

  // Función para agregar al carrito
  const handleAddToCart = async (productId) => {
    const cartData = {
      userId,
      productId,
      quantity: 1, // Esto puede cambiar dependiendo de la lógica que desees
    };

    try {
      const response = await fetch('http://98.85.200.29:5002/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData),
      });

      const data = await response.json();
      if (data.message) {
        alert('Producto agregado al carrito');
        setCartItems([...cartItems, cartData]); // Agregar el producto al carrito
      } else {
        alert('Error al agregar producto al carrito');
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  // Función para ver el carrito
  const handleViewCart = () => {
    navigate('/cart');
  };

  return (
    <div className="products-container">
      <div className="category-menu">
        <button onClick={() => handleCategoryChange('botellones')}>Botellones</button>
        <button onClick={() => handleCategoryChange('valvulas')}>Válvulas</button>
        <button onClick={() => handleCategoryChange('filtros')}>Filtros</button>
      </div>

      <h1 className="category-title">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h1>

      <div className="products-grid">
        {products[selectedCategory].map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="product-price">{product.price}</p>

            {/* Botón para añadir al carrito */}
            <button onClick={() => handleAddToCart(product.productId)} className="add-to-cart-button">
              Añadir al carrito
            </button>

            {/* Campo para escribir reseña */}
            <textarea
              placeholder="Escribe tu reseña"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="review-textarea"
            />
            <button onClick={() => handleAddReview(product.productId)} className="add-review-button">
              Añadir reseña
            </button>

            {/* Botón para ver reseñas */}
            <button onClick={() => fetchReviews(product.productId)} className="view-reviews-button">
              Ver reseñas
            </button>

            <div className="reviews-container">
              {reviews.length > 0 ? (
                reviews.map((review, idx) => (
                  <div key={idx} className="review-card">
                    <p><strong>{review.user}</strong></p>
                    <p>{review.review}</p>
                    <p><strong>Calificación:</strong> {review.rating} estrellas</p>
                  </div>
                ))
              ) : (
                <p>No hay reseñas para este producto.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Botón para ver carrito */}
      <button onClick={handleViewCart} className="view-cart-button">
        Ver mi carrito
      </button>
    </div>
  );
};

export default Products;
