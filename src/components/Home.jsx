import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaCoffee, FaShoppingCart, FaHeart, FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaUser } from 'react-icons/fa';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProduct, setFeaturedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      let res = await axios.get("http://localhost:8080/api/product", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });

      if (res.data.success) {
        setProducts(res.data.data);
        if (res.data.data.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.data.data.length);
          setFeaturedProduct(res.data.data[randomIndex]);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Background Image Overlay */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-amber-900/30"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-amber-900/90 text-white shadow-lg backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center hover:text-amber-200 transition-colors">
            <FaCoffee className="mr-2 text-amber-300 animate-pulse" /> 𝐍𝐢𝐬𝐡𝐂𝐚𝐟𝐞
          </Link>
          <div className="flex items-center space-x-4">
            {localStorage.getItem('token') && localStorage.getItem('user') ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-amber-800/30 px-3 py-1 rounded-full border border-amber-700/50">
                  <FaUser className="text-amber-300 text-sm" />
                  <div className="flex flex-col">
                    <span className="text-xs text-amber-200/80">Welcome</span>
                    <span className="text-sm font-medium text-white truncate max-w-[120px]">
                      {JSON.parse(localStorage.getItem("user")).name}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="px-4 py-2 bg-gradient-to-br from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white rounded-md font-medium flex items-center space-x-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-px"
                >
                  <span>Logout</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-white rounded-md font-medium flex items-center space-x-2 transition-all duration-200 hover:bg-amber-800/70 hover:shadow-md hover:-translate-y-px border border-amber-700/30"
                >
                  <span>Sign In</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-gradient-to-br from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white rounded-md font-medium flex items-center space-x-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-px"
                >
                  <span>Sign Up</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <section className="relative h-[70vh] rounded-xl overflow-hidden mb-12 shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40">
              <div className="absolute inset-0 flex items-center pl-12">
                <div className="max-w-2xl text-white">
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 font-serif">Authentic Indian Coffee Experience</h2>
                  <p className="text-xl md:text-2xl mb-8">Discover handcrafted blends infused with traditional Indian spices</p>
                  <div className="flex space-x-4">
                    <button className="px-8 py-3 bg-amber-600 hover:bg-amber-700 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center text-lg">
                      <FaCoffee className="mr-2" /> View Menu
                    </button>
                    <button className="px-8 py-3 border-2 border-white text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center text-lg">
                      Book a Table
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Product */}
        {featuredProduct && (
          <section className="mb-16 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 h-96 bg-cover bg-center" 
                style={{ backgroundImage: `url(${featuredProduct.image || 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'})` }}>
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-amber-50 to-amber-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < 4 ? "fill-current" : "fill-current opacity-30"} />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">(24 reviews)</span>
                </div>
                <h2 className="text-3xl font-bold text-amber-900 mb-4">{featuredProduct.name}</h2>
                <p className="text-xl font-bold text-amber-700 mb-6">₹{featuredProduct.price.toFixed(2)}</p>
                <p className="text-gray-700 mb-6">{featuredProduct.description}</p>
                <Link 
                  to={`/order/${featuredProduct._id}`}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center shadow-md"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Promotional Sections */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center border border-amber-100">
            <div className="text-5xl mb-4 text-amber-600 animate-bounce">☕</div>
            <h3 className="text-2xl font-semibold mb-4 text-amber-900">Specialty Chai</h3>
            <p className="text-gray-600 mb-4">Traditional Indian chai with authentic spices and brewing techniques</p>
            <Link to="/products/chai" className="text-amber-600 hover:text-amber-800 font-medium transition-colors duration-300 inline-flex items-center">
              Discover chai <span className="ml-1">→</span>
            </Link>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center border border-amber-100">
            <div className="text-5xl mb-4 text-amber-600 animate-bounce">🍪</div>
            <h3 className="text-2xl font-semibold mb-4 text-amber-900">Indian Sweets</h3>
            <p className="text-gray-600 mb-4">Homemade mithai and snacks to complement your drinks</p>
            <Link to="/products/sweets" className="text-amber-600 hover:text-amber-800 font-medium transition-colors duration-300 inline-flex items-center">
              View sweets <span className="ml-1">→</span>
            </Link>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center border border-amber-100">
            <div className="text-5xl mb-4 text-amber-600 animate-bounce">🎭</div>
            <h3 className="text-2xl font-semibold mb-4 text-amber-900">Cultural Events</h3>
            <p className="text-gray-600 mb-4">Weekly performances featuring Indian music and poetry</p>
            <Link to="/events" className="text-amber-600 hover:text-amber-800 font-medium transition-colors duration-300 inline-flex items-center">
              See events <span className="ml-1">→</span>
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 font-serif mb-4">Today's Specials</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover our carefully curated selection of Indian-inspired coffee creations</p>
          </div>
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-amber-600 border-r-transparent"></div>
              <p className="mt-6 text-gray-600 text-xl">Brewing your experience...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div 
                  key={product._id}
                  className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-amber-100"
                >
                  <div 
                    className="h-64 bg-cover bg-center transition-all duration-500 group-hover:scale-110 relative"
                    style={{ 
                      backgroundImage: product.image 
                        ? `url(${product.image})` 
                        : 'url(https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'
                    }}
                  >
                    <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-amber-900 mb-2">{product.name}</h3>
                    <p className="text-lg font-bold text-amber-700 mb-3">₹{product.price.toFixed(2)}</p>
                    <p className="text-gray-600 line-clamp-2 mb-4">{product.description}</p>
                    <Link 
                      to={`/order/${product._id}`}
                      className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center shadow-md"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-amber-100">
              <div className="text-6xl mb-6 animate-pulse">☕</div>
              <h3 className="text-2xl text-gray-700 mb-2">Our chaiwalas are preparing fresh products</h3>
              <p className="text-gray-500">Please check back soon!</p>
            </div>
          )}
        </section>

        {/* Cafe Info Section */}
        <section className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden mb-16 border border-amber-100">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-amber-50 to-amber-100">
              <h2 className="text-3xl font-bold text-amber-900 mb-6 font-serif">Visit Our Café</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-amber-600 mt-1 mr-4 flex-shrink-0 text-xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">Location</h3>
                    <p className="text-gray-600">Jalandhar, Punjab 144401</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaPhone className="text-amber-600 mt-1 mr-4 flex-shrink-0 text-xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">Phone</h3>
                    <p className="text-gray-600">+91 7970922655</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaEnvelope className="text-amber-600 mt-1 mr-4 flex-shrink-0 text-xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">Email</h3>
                    <p className="text-gray-600">nk79709222@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaClock className="text-amber-600 mt-1 mr-4 flex-shrink-0 text-xl" />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 7am - 10pm</p>
                    <p className="text-gray-600">Weekends: 8am - 11pm</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 h-96">
              <iframe 
                title="Cafe Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3407.454146479639!2d75.5762583151017!3d31.32534898142542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5a594d22b88d%3A0x4cc934c58d0992ec!2sLovely%20Professional%20University!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                className="w-full h-full" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-12 border border-amber-100">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12 font-serif">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The best filter coffee I've had outside of South India! Takes me back to my childhood.",
                author: "Rahul Sharma",
                rating: 5
              },
              {
                quote: "The masala chai is perfectly spiced and reminds me of my grandmother's recipe.",
                author: "Priya Patel",
                rating: 5
              },
              {
                quote: "Love the ambiance and the innovative Indian coffee creations. A must-visit!",
                author: "Arjun Mehta",
                rating: 4
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-amber-50/50 p-6 rounded-lg border border-amber-100">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < testimonial.rating ? "text-amber-400 fill-current" : "text-amber-200 fill-current"} />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-amber-800">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-amber-900/90 text-white py-12 backdrop-blur-sm border-t border-amber-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaCoffee className="mr-2 text-amber-300" /> 𝐍𝐢𝐬𝐡𝐂𝐚𝐟𝐞
              </h3>
              <p className="text-amber-200">Where traditional Indian flavors meet modern coffee culture.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-amber-200 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/menu" className="text-amber-200 hover:text-white transition-colors">Menu</Link></li>
                <li><Link to="/about" className="text-amber-200 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-amber-200 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Offerings</h4>
              <ul className="space-y-2">
                <li><Link to="/products/coffee" className="text-amber-200 hover:text-white transition-colors">Indian Coffee Blends</Link></li>
                <li><Link to="/products/chai" className="text-amber-200 hover:text-white transition-colors">Traditional Chai</Link></li>
                <li><Link to="/products/sweets" className="text-amber-200 hover:text-white transition-colors">Indian Sweets</Link></li>
                <li><Link to="/products/snacks" className="text-amber-200 hover:text-white transition-colors">Evening Snacks</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-amber-200 hover:text-white text-2xl transition-colors">
                  <FaFacebook />
                </a>
                <a href="#" className="text-amber-200 hover:text-white text-2xl transition-colors">
                  <FaInstagram />
                </a>
                <a href="#" className="text-amber-200 hover:text-white text-2xl transition-colors">
                  <FaTwitter />
                </a>
                <a href="https://www.linkedin.com/in/nishant-kumar797/" className="text-amber-200 hover:text-white text-2xl transition-colors">
                  <FaLinkedin />
                </a>
              </div>
              <p className="text-amber-200 mb-2">Subscribe to our newsletter</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 rounded-l text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-r transition-colors font-medium">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-800 pt-8 text-center text-amber-200">
            <p>© {new Date().getFullYear()} 𝐍𝐢𝐬𝐡𝐂𝐚𝐟𝐞. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;