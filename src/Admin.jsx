import { useEffect, useState } from "react";

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [reservations, setReservations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("adminLoggedIn") === "true"
);

  useEffect(() => {
    fetch("http://localhost:5000/api/reservations")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setReservations(data.reservations);
        }
      })
      .catch((error) => {
        console.error("Admin Reservations Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/contact")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessages(data.messages);
        }
      })
      .catch((error) => {
        console.error("Admin Messages Error:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders);
        }
      })
      .catch((error) => {
        console.error("Admin Orders Error:", error);
      });
  }, []);
  if (!isLoggedIn) {
  return (
    <div className="admin-login">
      <h1>🍽️ Jesu Star Admin</h1>

      <input
        type="email"
        placeholder="Admin Email"
        id="admin-email"
      />

      <input
        type="password"
        placeholder="Password"
        id="admin-password"
      />

      <button
        onClick={async () => {
          const email = document.getElementById("admin-email").value;
          const password = document.getElementById("admin-password").value;

          try {
            const response = await fetch(
              "http://localhost:5000/api/admin/login",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email,
                  password,
                }),
              }
            );

            const data = await response.json();

            if (data.success) {
  localStorage.setItem("adminLoggedIn", "true");
  setIsLoggedIn(true);}else {
              alert("Invalid email or password");
            }
          } catch (error) {
            console.error("Admin Login Error:", error);
            alert("Cannot connect to backend");
          }
        }}
      >
        Login
      </button>
    </div>
  );
}
  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <h2>🍽️ Menu</h2>

        <button onClick={() => setActiveTab("dashboard")}>
          📊 Dashboard
        </button>

        <button onClick={() => setActiveTab("reservations")}>
          📅 Reservations
        </button>

        <button onClick={() => setActiveTab("orders")}>
          🛒 Orders
        </button>

        <button onClick={() => setActiveTab("messages")}>
          💬 Messages
        </button>

        <button onClick={() => setActiveTab("menu")}>
          🍽️ Menu Management
        </button>
      </aside>

      <main className="admin-content">
        <div className="admin-header">
          <div>
            <p className="small-title">ADMIN PANEL</p>
            <h1>Jesu Star Admin Dashboard</h1>
          </div>

          <button
  className="admin-logout"
  onClick={() => {
    localStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
  }}
>
  Logout
</button>
        </div>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <section>
            <h2>Dashboard</h2>
            <p>Welcome, Restaurant Owner! 👋</p>

            <div className="admin-cards">
              <div className="admin-card">
                <span>📅</span>
                <h3>Reservations</h3>
                <strong>{reservations.length}</strong>
              </div>

              <div className="admin-card">
                <span>🛒</span>
                <h3>Orders</h3>
                <strong>{orders.length}</strong>
              </div>

              <div className="admin-card">
                <span>💬</span>
                <h3>Messages</h3>
                <strong>{messages.length}</strong>
              </div>

              <div className="admin-card">
                <span>🍽️</span>
                <h3>Menu Items</h3>
                <strong>4</strong>
              </div>
            </div>
          </section>
        )}

        {/* Reservations */}
        {activeTab === "reservations" && (
          <section className="admin-section">
            <h2>📅 Reservations</h2>

            {reservations.length === 0 ? (
              <div className="admin-empty">
                <p>No reservations to display.</p>
                <span>Customer bookings will appear here.</span>
              </div>
            ) : (
              <div className="reservation-list">
                {reservations.map((reservation) => (
                  <div
                    className="reservation-card"
                    key={reservation._id}
                  >
                    <h3>{reservation.name}</h3>
                    <p>📞 {reservation.phone}</p>
                    <p>📅 {reservation.date}</p>
                    <p>🕐 {reservation.time}</p>
                    <p>👥 Guests: {reservation.guests}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Orders */}
        {activeTab === "orders" && (
          <section className="admin-section">
            <h2>🛒 Customer Orders</h2>

            {orders.length === 0 ? (
              <div className="admin-empty">
                <p>No orders to display.</p>
                <span>Customer orders will appear here.</span>
              </div>
            ) : (
            <div className="order-list">
  {orders.map((order) => (
    <div className="admin-order-card" key={order._id}>
      
      <div className="order-card-header">
        <div>
          <h3>Order #{order._id.slice(-6)}</h3>
          <span>{order.status}</span>
        </div>
      </div>

      <div className="order-items">
        {order.items.map((item, index) => (
          <div className="order-item" key={index}>
            <div>
              <strong>{item.name}</strong>
              <p>₹{item.price} × {item.quantity}</p>
            </div>

            <strong>
              ₹{item.price * item.quantity}
            </strong>
          </div>
        ))}
      </div>

      <div className="order-total">
        <span>Total</span>
        <strong>₹{order.total}</strong>
      </div>

    </div>
  ))}
</div>
            )}
          </section>
        )}


        {/* Messages */}
        {activeTab === "messages" && (
          <section className="admin-section">
            <h2>💬 Customer Messages</h2>

            {messages.length === 0 ? (
              <div className="admin-empty">
                <p>No messages to display.</p>
                <span>Customer messages will appear here.</span>
              </div>
            ) : (
              <div className="message-list">
                {messages.map((message) => (
                  <div
                    className="message-card"
                    key={message._id}
                  >
                    <h3>{message.name}</h3>
                    <p>✉️ {message.email}</p>
                    <p>💬 {message.message}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Menu Management */}
        {activeTab === "menu" && (
          <section className="admin-section">
            <h2>🍽️ Menu Management</h2>

            <div className="admin-menu-list">
              <div>🍕 Margherita Pizza — ₹249</div>
              <div>🍔 Classic Burger — ₹199</div>
              <div>🍝 Creamy Pasta — ₹229</div>
              <div>🍗 Grilled Chicken — ₹299</div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Admin;