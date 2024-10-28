
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './css/Admin.css'
import { Link } from 'react-router-dom';

const Dashboard = () => {
 
  return (
    <>
      <div className="admin-container">
        {/* Dashboard Landing */}
        <main className="main-content">
          <section className="dashboard-welcome">
            <h1>Welcome, Admin!</h1>
            <p>Here’s a snapshot of what’s happening on your bookstore platform.</p>
          </section>

          {/* Metrics Section */}
          <section className="dashboard-metrics">
            <div className="metric-card">
              <h3>Books in Store</h3>
              <p>10,300+</p>
            </div>
            <div className="metric-card">
              <h3>Total Sales</h3>
              <p>$120,500</p>
            </div>
            <div className="metric-card">
              <h3>New Users Today</h3>
              <p>35</p>
            </div>
            <div className="metric-card">
              <h3>Orders Pending</h3>
              <p>45</p>
            </div>
          </section>

          {/* Recent Transactions */}
          <section className="recent-transactions">
            <h2>Recent Orders</h2>
            <ul>
              <li>
                <strong>Order #12345</strong> - <em>&quot;The Pragmatic Programmer&quot;</em> - $40
              </li>
              <li>
                <strong>Order #12346</strong> - <em>&quot;Clean Code&quot;</em> - $35
              </li>
              <li>
                <strong>Order #12347</strong> - <em>&quot;JavaScript: The Good Parts&quot;</em> - $30
              </li>
              <li>
                <strong>Order #12348</strong> - <em>&quot;React for Beginners&quot;</em> - $50
              </li>
            </ul>
          </section>

          {/* Quick Actions */}
          <section className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              {/* <button>Add New Book</button> */}
              <Link to="/admin/addBooks">Add New Book</Link>
              <button>Manage Inventory</button>
              <button>Generate Reports</button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Dashboard;