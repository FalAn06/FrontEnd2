import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('botellones');

  // Datos simulados de productos, ahora con una imagen URL
  const products = {
    botellones: [
      {
        name: 'Botellón de 5L',
        description: 'Ideal para familias grandes',
        price: '$10',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFCQWQMsCakoOOvm6QToMCdU3q0SA_ERqokQ&s',
      },
      {
        name: 'Botellón de 10L',
        description: 'Botellón grande para oficinas',
        price: '$18',
        imageUrl: 'https://via.placeholder.com/150?text=Botellón+10L',
      },
      {
        name: 'Botellón de 20L',
        description: 'Botellón para uso comercial',
        price: '$30',
        imageUrl: 'https://via.placeholder.com/150?text=Botellón+20L',
      },
      {
        name: 'Botellón de 7L',
        description: 'Botellón práctico para el hogar',
        price: '$15',
        imageUrl: 'https://via.placeholder.com/150?text=Botellón+7L',
      },
    ],
    valvulas: [
      {
        name: 'Válvula de cierre',
        description: 'Válvula para botellones de agua',
        price: '$5',
        imageUrl: 'https://via.placeholder.com/150?text=Válvula+Cierre',
      },
      {
        name: 'Válvula de seguridad',
        description: 'Para evitar fugas de agua',
        price: '$8',
        imageUrl: 'https://via.placeholder.com/150?text=Válvula+Seguridad',
      },
      {
        name: 'Válvula de presión',
        description: 'Regula la presión del agua',
        price: '$12',
        imageUrl: 'https://via.placeholder.com/150?text=Válvula+Presión',
      },
      {
        name: 'Válvula de drenaje',
        description: 'Ideal para sistemas de filtrado',
        price: '$6',
        imageUrl: 'https://via.placeholder.com/150?text=Válvula+Drenaje',
      },
    ],
    filtros: [
      {
        name: 'Filtro de agua básico',
        description: 'Filtro de agua doméstico',
        price: '$20',
        imageUrl: 'https://via.placeholder.com/150?text=Filtro+Agua+Básico',
      },
      {
        name: 'Filtro de agua industrial',
        description: 'Filtrado para grandes cantidades de agua',
        price: '$50',
        imageUrl: 'https://via.placeholder.com/150?text=Filtro+Agua+Industrial',
      },
      {
        name: 'Filtro purificador',
        description: 'Purifica el agua eliminando bacterias',
        price: '$35',
        imageUrl: 'https://via.placeholder.com/150?text=Filtro+Purificador',
      },
      {
        name: 'Filtro de carbón activado',
        description: 'Elimina impurezas y malos olores',
        price: '$25',
        imageUrl: 'https://via.placeholder.com/150?text=Filtro+Carbón+Activado',
      },
    ],
  };

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Función para regresar a la página anterior
  const goBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <div className="products-container">
      {/* Barra de categorías */}
      <div className="category-menu">
        <button onClick={() => handleCategoryChange('botellones')}>Botellones</button>
        <button onClick={() => handleCategoryChange('valvulas')}>Válvulas</button>
        <button onClick={() => handleCategoryChange('filtros')}>Filtros</button>
      </div>

      <h1 className="category-title">
        {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
      </h1>

      {/* Botón de regresar */}
      <button onClick={goBack} className="back-button">
        Regresar
      </button>

      <div className="products-grid">
        {/* Mostrar productos de la categoría seleccionada */}
        {products[selectedCategory].map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="product-price">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
