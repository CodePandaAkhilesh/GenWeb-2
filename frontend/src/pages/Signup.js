// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';
// import { handleError, handleSuccess } from '../utils';
// import '../styles/Signup.css';

// function Signup() {

//     const [signupInfo, setSignupInfo] = useState({
//         name: '',
//         email: '',
//         password: ''
//     })

//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setSignupInfo(prev => ({ ...prev, [name]: value }));
//     }

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         const { name, email, password } = signupInfo;
//         if (!name || !email || !password) {
//             return handleError('name, email and password are required')
//         }

//         try {
//             const url = `http://localhost:8080/auth/signup`;
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(signupInfo)
//             });

//             const result = await response.json();
//             const { success, message, error } = result;

//             if (success) {
//                 handleSuccess(message);
//                 setTimeout(() => {
//                     navigate('/login')
//                 }, 1000)
//             } else if (error) {
//                 const details = error?.details?.[0]?.message;
//                 handleError(details);
//             } else {
//                 handleError(message);
//             }

//         } catch (err) {
//             handleError(err.message || err);
//         }
//     }

//     return (
//         <div className='login-bg'>
//             <div className='login-card'>
//                 <h1 className='login-title'>Signup</h1>
//                 <form className='signup-form' onSubmit={handleSignup}>
//                     <div className='form-group'>
//                         <label htmlFor='name'>Name</label>
//                         <input
//                             onChange={handleChange}
//                             type='text'
//                             name='name'
//                             autoFocus
//                             placeholder='Enter your name...'
//                             value={signupInfo.name}
//                             className='form-input'
//                         />
//                     </div>
//                     <div className='form-group'>
//                         <label htmlFor='email'>Email</label>
//                         <input
//                             onChange={handleChange}
//                             type='email'
//                             name='email'
//                             placeholder='Enter your email...'
//                             value={signupInfo.email}
//                             className='form-input'
//                         />
//                     </div>
//                     <div className='form-group'>
//                         <label htmlFor='password'>Password</label>
//                         <input
//                             onChange={handleChange}
//                             type='password'
//                             name='password'
//                             placeholder='Enter your password...'
//                             value={signupInfo.password}
//                             className='form-input'
//                         />
//                     </div>
//                     <button type='submit' className='login-btn'>Signup</button>
//                     <div className='login-footer'>
//                         Already have an account? <Link to="/login">Login</Link>
//                     </div>
//                 </form>
//             </div>
//             <ToastContainer />
//         </div>
//     )
// }

// export default Signup;


import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import '../styles/Signup.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('name, email and password all are required');
    }

    try {
      const url = `http://localhost:8080/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo)
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate('/login'), 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || err);
    }
  };

  return (
    <div className='login-bg'>
      <div className='login-card'>
        <h1 className='login-title'>Signup</h1>
        <form className='signup-form' onSubmit={handleSignup}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              onChange={handleChange}
              type='text'
              name='name'
              autoFocus
              placeholder='Enter your name...'
              value={signupInfo.name}
              className='form-input'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              onChange={handleChange}
              type='email'
              name='email'
              placeholder='Enter your email...'
              value={signupInfo.email}
              className='form-input'
            />
          </div>
          <div className='form-group password-group'>
            <label htmlFor='password'>Password</label>
            <div className="password-input-wrapper">
              <input
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Enter your password...'
                value={signupInfo.password}
                className='form-input'
              />
              {signupInfo.password && (
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
            </div>
          </div>
          <button type='submit' className='login-btn'>Signup</button>
          <div className='login-footer'>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;

