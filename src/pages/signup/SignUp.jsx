// SignUp.jsx
import "./signup.scss";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from '../../components/snackbar/SnackBar';
const SignUp = () => {
  const [data, setdata] = useState({
    email: "",
    password: "",
    displayName: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });

      setSnackbarSeverity('success');
      setSnackbarMessage('User successfully registered!');
      setOpenSnackbar(true);

      console.log("Kullanıcı başarıyla kaydedildi:", res.user.uid);
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Error registering user.');
      setOpenSnackbar(true);
      console.error("Kullanıcı kaydetme hatası:", error.message);
    }
  };

  return (
    <div className="signup">
      <CustomSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />

      <div className="register-image-cont">
        <div className="register-image"></div>
      </div>

      <form onSubmit={handleSignUp}>
        <div className="already">
          <div className="already-title">Already have an account?</div>
          <div className="already-btn">
            <button onClick={handleSignIn}>Sign In</button>
          </div>
        </div>

        <h1>Welcome to focus!</h1>
        <p>Register your account</p>

        <div className="formInput">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>

        <div className="formInput">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>

        <div className="formInput">
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={data.displayName}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Sign Up</button>

        <div className="social">
          <div className="social-title">create account with:</div>
          <div className="social-icn"></div>
          <div className="social-icn"></div>
          <div className="social-icn"></div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
