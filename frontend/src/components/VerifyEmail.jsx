import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Login from './Login';

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('Verifying...');
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`https://creative-86-backend.onrender.com/verify-email/${token}`);
        setMessage('Email verified successfully!');
        setTimeout(() => {
          navigate('/login?verified=true');
        }, 2000);
      } catch (err) {
        setMessage('Invalid or expired link.');
      }
    };
    verify();
  }, [token, navigate]);

  return <div>
    <Login/>
  </div>;
};

export default VerifyEmail;
