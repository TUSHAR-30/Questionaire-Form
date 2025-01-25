// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import useAuthForm from '../../hooks/useAuthForm';
// import useAuth from '../../hooks/useAuth';
// import SignupDetailsContext from '../../Context/SignupDetailsContext';
// import LoadingSpinner from '../../components/LoadingSpinner';
// import './SignupPage.css';

// const SignupPage = () => {
//     const { setSignupdetails } = useContext(SignupDetailsContext);

//     const { formData, errors, isPasswordVisible, handleChange, handleErors, togglePasswordVisibility, setErrors } = useAuthForm(
//         { name: '', email: '', password: '' },
//         (name, value) => validateField(name, value)
//     );

//     const { loading, signup } = useAuth();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         let finalErrors = {};
//         Object.keys(formData).forEach((key) => finalErrors = handleErors(key, formData[key]));
//         if (Object.values(finalErrors).some((error) => error)) return;

//         signup(formData, setSignupdetails);
//     };

//     const validateField = (name, value) => {
//         switch (name) {
//             case 'name':
//                 return /^(?=.*[a-zA-Z]).{1,}$/.test(value) ? '' : 'Enter valid name';
//             case 'email':
//                 return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? '' : 'Enter a valid email address.';
//             case 'password':
//                 return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value) ? '' : 'Password must be at least 8 characters long and contain at least 1 alphabet and 1 digit.';
//             default:
//                 return '';
//         }
//     };

//     return (
//         <div className="signup-page">
//             {loading && <LoadingSpinner />}
//             <div className="signup-container">
//                 <h2>Sign Up</h2>
//                 <form onSubmit={handleSubmit} >
//                     <div className="form-group">
//                         <label htmlFor="name">Name</label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             placeholder="Enter your name"
//                             autoComplete='name'
//                             required
//                         />
//                         <div className={`error ${errors.name ? 'show-error' : ''}`}>{errors.name}</div>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="Enter your email"
//                             autoComplete='email'
//                             required
//                         />
//                         <div className={`error ${errors.email ? 'show-error' : ''}`}>{errors.email}</div>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type={isPasswordVisible ? 'text' : 'password'}
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             placeholder="Create a password"
//                             autoComplete='new-password'
//                             required
//                         />
//                         <div className={`error ${errors.password ? 'show-error' : ''}`}>{errors.password}</div>
//                         <div className="toggle-passwordVisibility-container">
//                             <input type="checkbox" checked={isPasswordVisible} onChange={togglePasswordVisibility} />
//                             <span>Show Password</span>
//                         </div>
//                     </div>
//                     <button type="submit" className="signup-button">Sign Up</button>
//                 </form>
//                 <p className="login-text">
//                     Already have an account? <Link to="/login">Login</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default SignupPage;



import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useAuthForm from '../../hooks/useAuthForm';
import useAuth from '../../hooks/useAuth';
import SignupDetailsContext from '../../Context/SignupDetailsContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const SignupPage = () => {
    const { setSignupdetails } = useContext(SignupDetailsContext);

    const { formData, errors, isPasswordVisible, handleChange, handleErors, togglePasswordVisibility } = useAuthForm(
        { name: '', email: '', password: '' },
        (name, value) => validateField(name, value)
    );

    const { loading, signup } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        let finalErrors = {};
        Object.keys(formData).forEach((key) => (finalErrors = handleErors(key, formData[key])));
        if (Object.values(finalErrors).some((error) => error)) return;

        signup(formData, setSignupdetails);
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                return /^(?=.*[a-zA-Z]).{1,}$/.test(value) ? '' : 'Enter valid name';
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? '' : 'Enter a valid email address.';
            case 'password':
                return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value)
                    ? ''
                    : 'Password must be at least 8 characters long and contain at least 1 alphabet and 1 digit.';
            default:
                return '';
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100 px-4">
            {loading && <LoadingSpinner />}
            <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-medium text-gray-600 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            autoComplete="name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                        <div className="mt-2 flex items-center">
                            <input
                                type="checkbox"
                                checked={isPasswordVisible}
                                onChange={togglePasswordVisibility}
                                className="mr-2"
                            />
                            <span className="text-gray-600">Show Password</span>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
                        Sign Up
                    </button>
                </form>
                <p className="text-gray-600 text-sm mt-4 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
