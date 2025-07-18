import React, { useState } from 'react';
import './Products.css';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('botellones');

  // Datos simulados de productos
  const products = {
    botellones: [
      { name: 'Botellón de 5L', description: 'Ideal para familias grandes', price: '$10' },
      { name: 'Botellón de 10L', description: 'Botellón grande para oficinas', price: '$18' },
      { name: 'Botellón de 20L', description: 'Botellón para uso comercial', price: '$30' },
      { name: 'Botellón de 7L', description: 'Botellón práctico para el hogar', price: '$15' },
    ],
    valvulas: [
      { name: 'Válvula de cierre', description: 'Válvula para botellones de agua', price: '$5' },
      { name: 'Válvula de seguridad', description: 'Para evitar fugas de agua', price: '$8' },
      { name: 'Válvula de presión', description: 'Regula la presión del agua', price: '$12' },
      { name: 'Válvula de drenaje', description: 'Ideal para sistemas de filtrado', price: '$6' },
    ],
    filtros: [
      { name: 'Filtro de agua básico', description: 'Filtro de agua doméstico', price: '$20' },
      { name: 'Filtro de agua industrial', description: 'Filtrado para grandes cantidades de agua', price: '$50' },
      { name: 'Filtro purificador', description: 'Purifica el agua eliminando bacterias', price: '$35' },
      { name: 'Filtro de carbón activado', description: 'Elimina impurezas y malos olores', price: '$25' },
    ],
  };

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="products-container">
      {/* Barra de categorías */}
      <div className="category-menu">
        <button onClick={() => handleCategoryChange('botellones')}>Botellones</button>
        <button onClick={() => handleCategoryChange('valvulas')}>Válvulas</button>
        <button onClick={() => handleCategoryChange('filtros')}>Filtros</button>
      </div>

      <h1 className="category-title">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h1>

      <div className="products-grid">
        {/* Mostrar productos de la categoría seleccionada */}
        {products[selectedCategory].map((product, index) => (
          <div key={index} className="product-card">
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
