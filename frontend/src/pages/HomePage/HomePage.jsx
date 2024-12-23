import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <header className="header">
        <div className="header-content">
          <h1 className="title">Welcome to Your Questionnaire App</h1>
          <p className="subtitle">
            Create, share, and analyze forms with ease. Explore cool features
            like categorization, cloze questions, and comprehension quizzes.
          </p>
          <a className="cta-button" onClick={()=>navigate("/createform")}>
            Get Started
          </a>
        </div>
      </header>

      <section className="features">
  <h2 className="features-title">Why Choose Our App?</h2>
  <div className="features-grid">
    <div className="feature-card">
      <h3>Customizable Questionnaires</h3>
      <p>
        Create tailored forms with multiple question types like Categorize, Cloze, and Comprehension.
      </p>
    </div>
    <div className="feature-card">
      <h3>Real-Time Submissions</h3>
      <p>
        Track form submissions in real time and analyze responses with ease.
      </p>
    </div>
    <div className="feature-card">
      <h3>User Management</h3>
      <p>
        Manage user profiles, pre-fill form fields for logged-in users, and track submission histories.
      </p>
    </div>
    <div className="feature-card">
      <h3>Secure Data Handling</h3>
      <p>
        All data is stored securely in the database, ensuring privacy and reliability.
      </p>
    </div>
    <div className="feature-card">
      <h3>Drag-and-Drop Functionality</h3>
      <p>
        Easily organize questions and answers with an intuitive drag-and-drop interface, making form creation seamless and efficient.
      </p>
    </div>
  </div>
</section>


      <footer className="footer">
        <p>&copy; 2024 Your Questionnaire App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
