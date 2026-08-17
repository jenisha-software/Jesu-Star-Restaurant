import "./App.css";
import { useState } from "react";
import pizzaImage from "./assets/pizza.avif";
import burgerImage from "./assets/burger.avif.webp";
import pastaImage from "./assets/pasta.avif.jpg";
import chickenImage from "./assets/chicken.avif.jpg";
import pizza2Image from "./assets/pizza2.avif.jpg";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [orderMessage, setOrderMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const addToOrder = (item, price) => {
  const existingItem = cart.find((cartItem) => cartItem.name === item);

  if (existingItem) {
    setCart(
      cart.map((cartItem) =>
        cartItem.name === item
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  } else {
    setCart([...cart, { name: item, price: price, quantity: 1 }]);
  }
  setOrderMessage(`${item} added to your order!`);
};
const removeFromOrder = (index) => {
  const updatedCart = cart.filter((_, i) => i !== index);
  setCart(updatedCart);
};
const clearOrder = () => {
  setCart([]);
};
  // Reservation state
  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
  });

  // Contact state
  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Reservation submit
  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://jesu-star-restaurant-backend.vercel.app/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });

      const data = await response.json();

      if (data.success) {
        alert("Table reserved successfully!");

        setReservation({
          name: "",
          phone: "",
          date: "",
          time: "",
          guests: "",
        });
      } else {
        alert("Failed to reserve table.");
      }
    } catch (error) {
      console.error("Reservation Error:", error);
      alert("Cannot connect to backend.");
    }
  };

  // Contact submit
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      const data = await response.json();

      if (data.success) {
        alert("Message sent successfully!");

        setContact({
          name: "",
          email: "",
          message: "",
        });
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Contact Error:", error);
      alert("Cannot connect to backend.");
    }
  };

  return (
    <div className="restaurant">
      {showNotification && (
  <div className="order-notification">
    🎉 {orderMessage}
  </div>
)}
      {/* Navbar */}
<nav className="navbar">
  <div className="logo">⭐ Jesu Star</div>

  <button
  type="button"
  className="menu-toggle"
  onClick={() => setMenuOpen((prev) => !prev)}
>
  ☰
</button>

  <div className={`nav-links ${menuOpen ? "active" : ""}`}>
    <a href="#home" onClick={() => setMenuOpen(false)}>
      Home
    </a>

    <a href="#about" onClick={() => setMenuOpen(false)}>
      About
    </a>

    <a href="#menu" onClick={() => setMenuOpen(false)}>
      Menu
    </a>

    <a href="#gallery" onClick={() => setMenuOpen(false)}>
      Gallery
    </a>

    <a href="#contact" onClick={() => setMenuOpen(false)}>
  Contact
</a>

<a href="#order" onClick={() => setMenuOpen(false)}>
  🛒 Order ({cart.reduce((total, item) => total + item.quantity, 0)})
</a>
  </div>
  

  <button
    type="button"
    className="book-btn"
    onClick={() => {
      document.getElementById("reservation").scrollIntoView({
        behavior: "smooth",
      });
      setMenuOpen(false);
    }}
  >
    Book a Table
  </button>
</nav>

      {/* Home / Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <p className="welcome">WELCOME TO JESU STAR</p>

          <h1>
            Delicious Food,
            <br />
            <span>Beautiful Moments.</span>
          </h1>

          <p className="hero-text">
            Enjoy delicious food, warm hospitality and unforgettable moments
            with your loved ones.
          </p>

          <div className="hero-buttons">
            <button
  className="menu-btn"
  onClick={() => {
    document.getElementById("menu").scrollIntoView({
      behavior: "smooth",
    });
  }}
>
  Explore Our Menu
</button>
            <button
  className="outline-btn"
  onClick={() => {
    document.getElementById("reservation").scrollIntoView({
      behavior: "smooth",
    });
  }}
>
  Book a Table
</button>
          </div>
        </div>

<div className="hero-food">
  <img src={pizza2Image} alt="Delicious Pizza" />
</div>
      </section>

      {/* Welcome Section */}
      <section id="about" className="welcome-section">
        <p className="small-title">OUR STORY</p>

        <h2>
          A Place Where <span>Food Meets Love</span>
        </h2>

        <p>
          At Jesu Star Restaurant, we believe great food brings people
          together. Every dish is prepared with fresh ingredients, care and
          passion.
        </p>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu-section">
        <p className="small-title">OUR MENU</p>

        <h2>
          Our Delicious <span>Specialties</span>
        </h2>

        <div className="menu-grid">
          <div className="menu-card">
            <div className="food-image">
  <img src={pizzaImage} alt="Margherita Pizza" />
</div>
            <h3>Margherita Pizza</h3>
<p>Fresh tomato, mozzarella and basil.</p>
<strong>₹249</strong>

<button onClick={() => addToOrder("Margherita Pizza", 249)}>
  Add to Order
</button>
          </div>

          <div className="menu-card">
            <div className="food-image">
  <img src={burgerImage} alt="Classic Burger" />
</div>
            <h3>Classic Burger</h3>
            <p>Juicy patty with fresh vegetables and cheese.</p>
            <strong>₹199</strong>
            <button onClick={() => addToOrder("Classic Burger", 199)}>
  Add to Order
</button>
          </div>

          <div className="menu-card">
            <div className="food-image">
  <img src={pastaImage} alt="Creamy Pasta" />
</div>
            <h3>Creamy Pasta</h3>
            <p>Delicious pasta cooked in creamy sauce.</p>
            <strong>₹229</strong>
            <button onClick={() => addToOrder("Creamy Pasta", 229)}>
  Add to Order
</button>
          </div>

          <div className="menu-card">
            <div className="food-image">
  <img src={chickenImage} alt="Grilled Chicken" />
</div>
            <h3>Grilled Chicken</h3>
            <p>Tender grilled chicken with special spices.</p>
            <strong>₹299</strong>
            <button onClick={() => addToOrder("Grilled Chicken", 299)}>
  Add to Order
</button>
          </div>
        </div>
      </section>
      {/* Order Section */}
{/* Order Section */}
<section id="order" className="order-section">
  <p className="small-title">YOUR ORDER</p>

  <h2>
    Your <span>Order</span>
  </h2>

  <p>
    You have{" "}
    {cart.reduce((total, item) => total + item.quantity, 0)} item(s) in
    your order.
  </p>

  {cart.map((item, index) => (
    <div key={index}>
      <p>
        🍽️ {item.name} - ₹{item.price} × {item.quantity}
      </p>

      <button
        onClick={() =>
          setCart(
            cart.map((cartItem, i) =>
              i === index
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          )
        }
      >
        +
      </button>

      <button
        onClick={() =>
          setCart(
            cart
              .map((cartItem, i) =>
                i === index
                  ? { ...cartItem, quantity: cartItem.quantity - 1 }
                  : cartItem
              )
              .filter((cartItem) => cartItem.quantity > 0)
          )
        }
      >
        −
      </button>

      <button onClick={() => removeFromOrder(index)}>
        Remove
      </button>
    </div>
  ))}

  <h3>
    Total: ₹
    {cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )}
  </h3>

  {cart.length > 0 && (
    <button onClick={clearOrder}>
      Clear Order
    </button>
  )}

  {cart.length > 0 && (
    <button
      className="place-order-btn"
      onClick={async () => {
        try {
          const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          const response = await fetch(
            "http://jesu-star-restaurant-backend.vercel.app/api/orders",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                items: cart,
                total: total,
              }),
            }
          );

          const data = await response.json();

          if (data.success) {
            setOrderMessage(
              "Your order has been placed successfully!"
            );

            setShowNotification(true);
            setCart([]);

            setTimeout(() => {
              setShowNotification(false);
              setOrderMessage("");
            }, 3000);
          } else {
            alert("Failed to place order.");
          }
        } catch (error) {
          console.error("Order Error:", error);
          alert("Cannot connect to backend.");
        }
      }}
    >
      Place Order
    </button>
  )}
</section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section">
        <p className="small-title">OUR GALLERY</p>

        <h2>
          Food & <span>Memories</span>
        </h2>

        <div className="gallery-grid">
  <div className="gallery-item">
    <img src={pizzaImage} alt="Pizza" />
  </div>

  <div className="gallery-item">
    <img src={burgerImage} alt="Burger" />
  </div>

  <div className="gallery-item">
    <img src={pastaImage} alt="Pasta" />
  </div>

  <div className="gallery-item">
    <img src={chickenImage} alt="Chicken" />
  </div>

  <div className="gallery-item">
    <img src={pizzaImage} alt="Pizza" />
  </div>

  <div className="gallery-item">
    <img src={burgerImage} alt="Burger" />
  </div>
</div>
      </section>

      {/* Reservation Section */}
      <section id="reservation" className="reservation-section">
        <div className="reservation-content">
          <p className="small-title">RESERVATION</p>

          <h2>
            Book Your <span>Table</span>
          </h2>

          <p className="reservation-text">
            Reserve your table and enjoy a wonderful dining experience with
            your family and friends.
          </p>

          <form
            className="reservation-form"
            onSubmit={handleReservationSubmit}
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              value={reservation.name}
              onChange={(e) =>
                setReservation({
                  ...reservation,
                  name: e.target.value,
                })
              }
            />

            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={reservation.phone}
              onChange={(e) =>
                setReservation({
                  ...reservation,
                  phone: e.target.value,
                })
              }
            />

            <input
              type="date"
              required
              value={reservation.date}
              onChange={(e) =>
                setReservation({
                  ...reservation,
                  date: e.target.value,
                })
              }
            />

            <input
              type="time"
              required
              value={reservation.time}
              onChange={(e) =>
                setReservation({
                  ...reservation,
                  time: e.target.value,
                })
              }
            />

            <select
              required
              value={reservation.guests}
              onChange={(e) =>
                setReservation({
                  ...reservation,
                  guests: e.target.value,
                })
              }
            >
              <option value="" disabled>
                Number of Guests
              </option>

              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5 Guests</option>
              <option value="6">6 Guests</option>
              <option value="7">7 Guests</option>
              <option value="8">8 Guests</option>
            </select>

            <button type="submit">Reserve My Table</button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <p className="small-title">CONTACT US</p>

        <h2>
          Let's <span>Connect</span>
        </h2>

        <div className="contact-container">
          <div className="contact-info">
            <h3>Jesu Star Restaurant</h3>

            <p>📍 123 Main Street, Tamil Nadu</p>

            <p>📞 +91 98765 43210</p>

            <p>✉️ jesustarrestaurant@gmail.com</p>

            <p>🕐 Monday - Sunday: 11:00 AM - 10:30 PM</p>
          </div>

          <form
            className="contact-form"
            onSubmit={handleContactSubmit}
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              value={contact.name}
              onChange={(e) =>
                setContact({
                  ...contact,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Your Email"
              required
              value={contact.email}
              onChange={(e) =>
                setContact({
                  ...contact,
                  email: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              required
              value={contact.message}
              onChange={(e) =>
                setContact({
                  ...contact,
                  message: e.target.value,
                })
              }
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <h3>⭐ Jesu Star Restaurant</h3>
        <p>Good Food • Good People • Good Memories</p>
      </footer>
    </div>
  );
}

export default App;