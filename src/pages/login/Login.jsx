// Login.jsx
import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CustomSnackbar from '../../components/snackbar/SnackBar'; 

const Login = () => {
  const [ setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
        setSnackbarSeverity('error');
        setSnackbarMessage('Wrong email or password!');
        setOpenSnackbar(true);
      });
  };

  return (
    <div className="login">
      <CustomSnackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />

      <div className="register-image-cont">
        <div className="register-image"></div>
      </div>

      <form onSubmit={handleLogin}>
        <div className="already">
          <div className="already-title">For new registration</div>
          <div className="already-btn">
            <button onClick={handleSignUp}>Sign Up</button>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="formInput">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>

      </form>
    </div>
  );
};

export default Login;
