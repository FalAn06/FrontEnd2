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
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon5litros.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJGMEQCICuXf9In%2BD4L0R%2BZPAm%2B7MpvOjxcAguCIjEwTJOm2vM2AiB1lbr7Ov3Eu7v0PNy%2FB%2BgBv8t5I6t4rijMPlfActEZdyrkAwiS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDg3NDY3NjU0ODI1MCIM52XjJ67dVCbeWOitKrgD0lESR%2FKCFjxi6iUuTD2MrrrHiqvtkNZpZbTFS7M4l7JNPYTTE%2FIaHE03lIvYehb%2FUNthQrX%2BHXFJ9GCvFrH0RGO3MEF2QGAR2plO2J5cm77bFoyOM1PMXsJHhkyEucIMUO6GAqeRi6xr3pmyFDGA41WUEX3S7oqtkp5esPuQ%2F1oXMUcOy%2FyncJsxLfhs%2B4B%2BUYNp2o9fR37TTgSuJ%2BWZQuH7DNXCYhd28nBOtJ6Z0iBkhZdCpHx3gWS65xOSsEpf9Mw7yrbHppul0xL3IVNhIBeGjW6Kru%2FX5YT7%2BZyY9WqCcurY3Au%2BcSL0gCl3n1bQBo9FXNEVQyrdzPTbftTttRcwHbq0rNvfD1acHUGLuHSPObnkh9l%2Ftt6b26S9zPXAc1fp%2FI%2FP0brNFtvsU3i8CNkPdxj7BZ8LrZSurVG%2FZqF9tMRWtf%2BfegvHtqC69VbitTOu7mPlbDnQrtaVc%2FoVhbuLc99kP8an5nn6oOwwjqVR8ogDOKf0hRZxmhdVfOxoSvfD2NUWHsWEpjIROIHoN67IaaOBRpzXPJDJDCCf5%2FAAPkS4O4%2BzNy7Wsv2TauQxU41kVBqQz7MwzOrpwwY6uAK8TS7ACMHZpEiBoKJFfPzMjp8SUYTcDa%2FGCwElBoQX1Pu3%2Fl2pawb8QnSI1MbnF1bm9H5tJpmzNrgFpsIrEy0jN0q6AanQmUQL1pP7Ed7rbgbjI32C%2BXLiCfzhVugpZWGQKBGlFr1yKWlLj%2Ftg68OIiPVnNT8kZt6uDiLHQXlCTO%2Bsf8ofUNNeblJqqAQXllx%2FIg1h%2BZX9zs8YrAefaCbK3VltkFTGevIUOv8udfUR7YgPbCC4e0Rs8LpCY34t7adfNcX6b%2FlopiNTQO2QFg%2BQpzjU2J2M5SVe2BdjtShhkV%2F2wwJojjZ3ODBgrp%2BHYo57sNGo%2BAipotqxbeFuMpYCxqeB3CpFmnVBTXg07E4M4E4VPimKrTfsspIFzbCLgg2lP%2Fuhyx%2FLsQqe7IL2vug0%2Fj8LxRj2nls%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4XJWI6KNE6HVWMZD%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T163316Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6ef7c9afe8be907dbc1d5bb67f162bd8f93e24ca6d8ef863ab7f437501ae588e',
      },
      {
        name: 'Botellón de 10L',
        description: 'Botellón grande para oficinas',
        price: '$18',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon10.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4XJWI6KNFXWQ5SUT%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T163055Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJHMEUCIQCDlL9zC8VTFxMHp0kqAaQx55K9KYIDiKcJTLGGqEvNeAIgexzqCzVhjghkBFiDhOuxidknrNwzmTqeyCKm9UpwlG8qhAMIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4NzQ2NzY1NDgyNTAiDNw65fg%2BxAPTRbaEASrYAoPs%2FG0YFB21ktn6tv5pdo%2FpPigsxPtD4yOpJrUscecqcwecxZRTXKXi6nciYUax0j35dhHdbpdyhA88NcMfRvcLGO7oOyBSfXJlNbCAS63LqM81tb6%2BCEChz2hnEjHldZJ6BcHqJAkcklqFm7sPQWIdEgsShwWd1DqGypTduA0WxumNeMHoT9r6HJINQeGH3WrL1YZ%2Fi9us%2FkmJpgyiSVQhHscE02iWy2vXFMQZE3fNXYzSVqFYSrzjI%2BTTozdMvtd87JWFPPJ1SrlZ6eCfNAczc0YLnp6eAsCqExa6%2FItdz6Ua7f0QNeyJeO8rj1pO2V0I7dv8A8%2B6IhBNOwvh05kHEEZGluBQH%2Fi7Y1ECJOMgmbw6nh%2F7pbwamqKEtgmH9FOyNbee8tTROdufwuyQFhjurAS9PgUkg5xsSS4iON1phLDyTBl2Cxm0L7Q%2BCN3f1YdX8%2BjC7MKpMMzq6cMGOocCPyxfSKr3Lfemqj%2B%2BAcW53C4FKG%2BA5jXk17kJvsD1THguJxDK%2Fxvy%2Fh6Uj4Oa76aBMpDEv%2BaXFR%2BBsAMJ0L66zSnAlhk8NW18tZ98JJ5WYlWb8bvdHKh4ti0%2BjtJayKsreYkPELHW3Q0dq2563HD%2Ba4yTfrQ0VdnrEp8JUcSxnD7pku5bYC4SxORWWgOzB%2Boqlm4nnoZGg%2Bd8TmI85STcLFa5HPTGVCoHbyxV9WRqnb0q71dFjyktnGvRajCGmnhnMCJD6i2SxHBRoIEBorLwpa7kqFQ%2BJ64IV3vYlzdZGrZH83OKNlntm8EeCK6FA5MLXtJ9Exwp3Fl5ygd49M%2F8Nhza0RZ9g78%3D&X-Amz-Signature=c4be98b391d8197873663090433396fea671e265f6132273d417714a98726b9b&X-Amz-SignedHeaders=host&response-content-disposition=inline',
      },
      {
        name: 'Botellón de 20L',
        description: 'Botellón para uso comercial',
        price: '$30',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon20.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJGMEQCICuXf9In%2BD4L0R%2BZPAm%2B7MpvOjxcAguCIjEwTJOm2vM2AiB1lbr7Ov3Eu7v0PNy%2FB%2BgBv8t5I6t4rijMPlfActEZdyrkAwiS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDg3NDY3NjU0ODI1MCIM52XjJ67dVCbeWOitKrgD0lESR%2FKCFjxi6iUuTD2MrrrHiqvtkNZpZbTFS7M4l7JNPYTTE%2FIaHE03lIvYehb%2FUNthQrX%2BHXFJ9GCvFrH0RGO3MEF2QGAR2plO2J5cm77bFoyOM1PMXsJHhkyEucIMUO6GAqeRi6xr3pmyFDGA41WUEX3S7oqtkp5esPuQ%2F1oXMUcOy%2FyncJsxLfhs%2B4B%2BUYNp2o9fR37TTgSuJ%2BWZQuH7DNXCYhd28nBOtJ6Z0iBkhZdCpHx3gWS65xOSsEpf9Mw7yrbHppul0xL3IVNhIBeGjW6Kru%2FX5YT7%2BZyY9WqCcurY3Au%2BcSL0gCl3n1bQBo9FXNEVQyrdzPTbftTttRcwHbq0rNvfD1acHUGLuHSPObnkh9l%2Ftt6b26S9zPXAc1fp%2FI%2FP0brNFtvsU3i8CNkPdxj7BZ8LrZSurVG%2FZqF9tMRWtf%2BfegvHtqC69VbitTOu7mPlbDnQrtaVc%2FoVhbuLc99kP8an5nn6oOwwjqVR8ogDOKf0hRZxmhdVfOxoSvfD2NUWHsWEpjIROIHoN67IaaOBRpzXPJDJDCCf5%2FAAPkS4O4%2BzNy7Wsv2TauQxU41kVBqQz7MwzOrpwwY6uAK8TS7ACMHZpEiBoKJFfPzMjp8SUYTcDa%2FGCwElBoQX1Pu3%2Fl2pawb8QnSI1MbnF1bm9H5tJpmzNrgFpsIrEy0jN0q6AanQmUQL1pP7Ed7rbgbjI32C%2BXLiCfzhVugpZWGQKBGlFr1yKWlLj%2Ftg68OIiPVnNT8kZt6uDiLHQXlCTO%2Bsf8ofUNNeblJqqAQXllx%2FIg1h%2BZX9zs8YrAefaCbK3VltkFTGevIUOv8udfUR7YgPbCC4e0Rs8LpCY34t7adfNcX6b%2FlopiNTQO2QFg%2BQpzjU2J2M5SVe2BdjtShhkV%2F2wwJojjZ3ODBgrp%2BHYo57sNGo%2BAipotqxbeFuMpYCxqeB3CpFmnVBTXg07E4M4E4VPimKrTfsspIFzbCLgg2lP%2Fuhyx%2FLsQqe7IL2vug0%2Fj8LxRj2nls%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4XJWI6KNE6HVWMZD%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T163242Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=dd825406418a09bd837efadac82a77e0f91289e4a77074a9a5d78544fa57ab5c',
      },
      {
        name: 'Botellón de 7L',
        description: 'Botellón práctico para el hogar',
        price: '$15',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon7.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJGMEQCICuXf9In%2BD4L0R%2BZPAm%2B7MpvOjxcAguCIjEwTJOm2vM2AiB1lbr7Ov3Eu7v0PNy%2FB%2BgBv8t5I6t4rijMPlfActEZdyrkAwiS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDg3NDY3NjU0ODI1MCIM52XjJ67dVCbeWOitKrgD0lESR%2FKCFjxi6iUuTD2MrrrHiqvtkNZpZbTFS7M4l7JNPYTTE%2FIaHE03lIvYehb%2FUNthQrX%2BHXFJ9GCvFrH0RGO3MEF2QGAR2plO2J5cm77bFoyOM1PMXsJHhkyEucIMUO6GAqeRi6xr3pmyFDGA41WUEX3S7oqtkp5esPuQ%2F1oXMUcOy%2FyncJsxLfhs%2B4B%2BUYNp2o9fR37TTgSuJ%2BWZQuH7DNXCYhd28nBOtJ6Z0iBkhZdCpHx3gWS65xOSsEpf9Mw7yrbHppul0xL3IVNhIBeGjW6Kru%2FX5YT7%2BZyY9WqCcurY3Au%2BcSL0gCl3n1bQBo9FXNEVQyrdzPTbftTttRcwHbq0rNvfD1acHUGLuHSPObnkh9l%2Ftt6b26S9zPXAc1fp%2FI%2FP0brNFtvsU3i8CNkPdxj7BZ8LrZSurVG%2FZqF9tMRWtf%2BfegvHtqC69VbitTOu7mPlbDnQrtaVc%2FoVhbuLc99kP8an5nn6oOwwjqVR8ogDOKf0hRZxmhdVfOxoSvfD2NUWHsWEpjIROIHoN67IaaOBRpzXPJDJDCCf5%2FAAPkS4O4%2BzNy7Wsv2TauQxU41kVBqQz7MwzOrpwwY6uAK8TS7ACMHZpEiBoKJFfPzMjp8SUYTcDa%2FGCwElBoQX1Pu3%2Fl2pawb8QnSI1MbnF1bm9H5tJpmzNrgFpsIrEy0jN0q6AanQmUQL1pP7Ed7rbgbjI32C%2BXLiCfzhVugpZWGQKBGlFr1yKWlLj%2Ftg68OIiPVnNT8kZt6uDiLHQXlCTO%2Bsf8ofUNNeblJqqAQXllx%2FIg1h%2BZX9zs8YrAefaCbK3VltkFTGevIUOv8udfUR7YgPbCC4e0Rs8LpCY34t7adfNcX6b%2FlopiNTQO2QFg%2BQpzjU2J2M5SVe2BdjtShhkV%2F2wwJojjZ3ODBgrp%2BHYo57sNGo%2BAipotqxbeFuMpYCxqeB3CpFmnVBTXg07E4M4E4VPimKrTfsspIFzbCLgg2lP%2Fuhyx%2FLsQqe7IL2vug0%2Fj8LxRj2nls%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4XJWI6KNE6HVWMZD%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T163344Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a15dca05061b2260cb491297355d320bc4a3893b661ffd87e71a3d94bd3f4049',
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
