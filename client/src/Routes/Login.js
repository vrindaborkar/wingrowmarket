import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const user = AuthService.getCurrentUser();

export default function SignIn() {
  useEffect(() => {
    if (!!user) {
      AuthService.logout();
      window.location.reload();
    }
  }, []);

  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState({
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (data.password && data.phone) {
      setLoading(true);
      AuthService.login(data.phone, data.password).then(
        (res) => {
          if (res.role === "farmer") {
            toast.success("Login successful!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              navigate("/farmers");
              window.location.reload();
            }, 1000);
          }
          if (res.role === "admin") {
            toast.success("Login successful!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              navigate("/admin");
              window.location.reload();
            }, 1000);
          }
          if (res.role === "customer") {
            toast.success("Login successful!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              navigate("/customers");
              window.location.reload();
            }, 1000);
          }
          setLoading(false);
        },
        (error) => {
          toast.warn("Login failed", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setData({
            phone: "",
            password: "",
          });
          setLoading(false);
        }
      );
    } else {
      toast.warn("data invalid", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="authContainer">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      {!Loading ? (
        <div className="authbox">
          <img
            className="login_image"
            src="./images/slidestall2.webp"
            alt="logo"
          />
          <form onSubmit={handleLogin} className="login_details">
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              </Avatar> */}
            <img className="form-logo" src="./logo.png" alt="form-logo" />
            <Typography component="h1" variant="h5">
              Welcome to Wingrowagritech
            </Typography>
            <Typography mt={2} component="h1" variant="h5">
              Login here.
            </Typography>
            <TextField
              inputlabelprops={{
                style: { fontSize: 16, fontFamily: "monospace" },
              }}
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Mobile Number"
              name="phone"
              value={data.phone}
              autoComplete="phone"
              autoFocus
              color="success"
              className="textfield"
              onChange={handleChange}
            />
            <TextField
              inputlabelprops={{
                style: { fontSize: 16, fontFamily: "monospace" },
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={data.password}
              type="password"
              id="password"
              autoComplete="current-password"
              color="success"
              className="textfield"
              onChange={handleChange}
            />
            <Link className="form-link" to={"/Forgot"} variant="body2">
              Forgot your password?
            </Link>
            <Button
              className="form-btn"
              type="submit"
              color="success"
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Typography className="form-link" mt={2}>
              New to Wingrow? 
               <Link to="/Register" variant="body2" className="form-link signupWithUs">
                 Signup with us
              </Link>
            </Typography>
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
