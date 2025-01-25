// import React from "react";
// import "./HomePage.css";
// import { useNavigate } from "react-router-dom";

// const HomePage = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="homepage">
//       <header className="header">
//         <div className="header-content">
//           <h1 className="title">Welcome to Your Questionnaire App</h1>
//           <p className="subtitle">
//             Create, share, and analyze forms with ease. Explore cool features
//             like categorization, cloze questions, and comprehension quizzes.
//           </p>
//           <a className="cta-button" onClick={() => navigate("/createform")}>
//             Get Started
//           </a>
//         </div>
//       </header>

//       <section className="features">
//         <h2 className="features-title">Why Choose Our App?</h2>
//         <div className="features-grid">
//           <div className="feature-card">
//             <h3>Customizable Questionnaires</h3>
//             <p>
//               Create tailored forms with multiple question types like Categorize, Cloze, and Comprehension.
//             </p>
//           </div>
//           <div className="feature-card">
//             <h3>Real-Time Submissions</h3>
//             <p>
//               Track form submissions in real time and analyze responses with ease.
//             </p>
//           </div>
//           <div className="feature-card">
//             <h3>User Management</h3>
//             <p>
//               Manage user profiles, pre-fill form fields for logged-in users, and track submission histories.
//             </p>
//           </div>
//           <div className="feature-card">
//             <h3>Secure Data Handling</h3>
//             <p>
//               All data is stored securely in the database, ensuring privacy and reliability.
//             </p>
//           </div>
//           <div className="feature-card">
//             <h3>Drag-and-Drop Functionality</h3>
//             <p>
//               Easily organize questions and answers with an intuitive drag-and-drop interface, making form creation seamless and efficient.
//             </p>
//           </div>
//         </div>
//       </section>


//       <footer className="footer">
//         <p>&copy; 2024 Your Questionnaire App. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;




import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center text-center">
      {/* Header Section */}
      <header className="w-full h-screen bg-gradient-to-br from-indigo-500 to-gray-700 text-white flex justify-center items-center px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slideDown">
            Welcome to Your Questionnaire App
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Create, share, and analyze forms with ease. Explore cool features
            like categorization, cloze questions, and comprehension quizzes.
          </p>
          <button
            onClick={() => navigate("/createform")}
            className="text-white bg-pink-500 hover:bg-pink-400 py-2 px-6 rounded-full text-lg transition duration-300"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-3xl font-semibold mb-8">
          Why Choose Our App?
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2">
            <h3 className="font-semibold text-xl mb-2">
              Customizable Questionnaires
            </h3>
            <p>
              Create tailored forms with multiple question types like Categorize, Cloze, and Comprehension.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2">
            <h3 className="font-semibold text-xl mb-2">
              Real-Time Submissions
            </h3>
            <p>
              Track form submissions in real time and analyze responses with ease.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2">
            <h3 className="font-semibold text-xl mb-2">User Management</h3>
            <p>
              Manage user profiles, pre-fill form fields for logged-in users, and track submission histories.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2">
            <h3 className="font-semibold text-xl mb-2">
              Secure Data Handling
            </h3>
            <p>
              All data is stored securely in the database, ensuring privacy and reliability.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2">
            <h3 className="font-semibold text-xl mb-2">
              Drag-and-Drop Functionality
            </h3>
            <p>
              Easily organize questions and answers with an intuitive drag-and-drop interface, making form creation seamless and efficient.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-6 bg-gray-700 text-white w-full text-center">
        <p>&copy; 2024 Your Questionnaire App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
