import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`https://creative-86-backend.onrender.com/verify-email/${token}`);
        alert(res.data.message);
        navigate("/login"); // or home
      } catch (err) {
        alert("Invalid or expired link.");
      }
    };
    verify();
  }, [token, navigate]);

  return <div>Verifying Email...</div>;
};

export default VerifyEmail;
