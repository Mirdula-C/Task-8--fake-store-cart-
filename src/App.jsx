import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products from the API
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  // Add product to the cart
  const addToCart = (product) => {
    const isAlreadyAdded = cart.some((item) => item.id === product.id);
    if (isAlreadyAdded) {
      window.alert('Item already added to the cart');
    } else {
      setCart((prevCart) => [...prevCart, product]);
    }
  };

  // Remove product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  // Toggle cart visibility
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header className="header">
        <div className="store-name">Fake Store</div>
        <input
          className="search-bar"
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="cart-button" onClick={toggleCart}>
          <i className="fas fa-shopping-cart"></i> Cart ({cart.length})
        </button>
      </header>

      <div className="body-container">
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3 className="product-title">{product.title}</h3> {/* Added class for title */}
              <p className="product-price">${product.price}</p> {/* Added class for price */}
              <div className="product-buttons">
                <button
                  className="add-to-cart-button"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCart && (
        <div className="cart-modal">
          <div className="cart-container">
            <div className="cart-items">
              {cart.length > 0 ? (
                cart.map((product, index) => (
                  <div key={index} className="cart-item">
                    <img src={product.image} alt={product.title} />
                    <div className="cart-item-info">
                      <h4>{product.title}</h4>
                      <p>${product.price}</p>
                    </div>
                    <button
                      className="remove-from-cart-button"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>

            <div className="cart-footer">
              <button className="close-cart-btn" onClick={toggleCart}>
                Close Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
