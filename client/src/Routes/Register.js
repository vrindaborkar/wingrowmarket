import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { WithContext as ReactTags } from "react-tag-input";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const user = AuthService.getCurrentUser();

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function Register() {
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
    firstname: "",
    lastname: "",
    type: "",
    farmertype: "",
    address: "",
  });

  const [tags, setTags] = React.useState([]);
  const [error, seterror] = useState("");

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    seterror("");
    event.preventDefault();
    const { phone, firstname, lastname, farmertype, type, password } = data;

    if (!phone.match("[0-9]{10}")) {
      seterror("Please provide valid phone number");
    } else if (firstname.length === 0 && lastname.length === 0) {
      seterror("Please provide valid first and last name");
    } else if (type.length === 0) {
      seterror("Please select type");
    } else if (password.length < 6) {
      seterror("password must be greater than 6 characters");
    } else if (type === "farmer" && farmertype.length === 0) {
      seterror("select producer type");
    } else if (type === "farmer" && tags.length === 0) {
      seterror("select atleast one commodity and press enter");
    } else {
      seterror("no error");
      setLoading(true);
      AuthService.register(
        data.phone,
        data.password,
        data.firstname,
        data.lastname,
        data.type,
        data.farmertype,
        data.address,
        tags
      ).then(
        () => {
          toast.success("Registration successful!", {
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
            navigate("/registeration-successfull");
            window.location.reload();
          }, 1000);
        },
        (error) => {
          toast.warn("User Already Exists", {
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
            firstname: "",
            lastname: "",
            type: "",
            farmertype: "",
            address: "",
          });
          setTimeout(() => {
            navigate("/login");
            window.location.reload();
          }, 1000);
        }
      );
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
        color="success"
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
          <form
            className="register_details"
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <img className="form-logo" src="./logo.png"  alt="form-logo" />
            <Typography className="form-heading" component="h1" variant="h5">
              Welcome to Wingrowagritech
            </Typography>
            <Typography className="form-heading" mt={2} component="h1" variant="h5">
              Signup with us
            </Typography>
            <Grid className="input-div-holder" container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "monospace" },
                  }}
                  autoComplete="given-name"
                  name="firstname"
                  value={data.firstname}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  color="success"
                  className="textfield"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "monospace" },
                  }}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  value={data.lastname}
                  onChange={handleChange}
                  autoComplete="family-name"
                  color="success"
                  className="textfield"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "monospace" },
                  }}
                  required
                  fullWidth
                  id="phone"
                  label="Mobile Number"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  color="success"
                  className="textfield"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "monospace" },
                  }}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  color="success"
                  className="textfield"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  className="textfield"
                  sx={{ width: "100%", fontSize: 14 }}
                >
                  <InputLabel
                    inputlabelprops={{
                      style: { fontSize: 14, fontFamily: "monospace" },
                    }}
                    id="demo-simple-select-helper-label"
                  >
                    Type
                  </InputLabel>
                  <Select
                    sx={{ fontSize: "1.2rem" }}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={data.type}
                    label="Type"
                    name="type"
                    onChange={handleChange}
                    color="success"
                  >
                    <MenuItem
                      sx={{ fontSize: "1.3rem", fontFamily: "monospace" }}
                      value=""
                    >
                      <em>Select</em>
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: "1.3rem", fontFamily: "monospace" }}
                      value={"farmer"}
                    >
                      Producer
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: "1.3rem", fontFamily: "monospace" }}
                      value={"customer"}
                    >
                      Consumer
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {data.type === "farmer" && (
                <Grid item xs={12}>
                  <FormControl className='textfield' color="success" sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Producer Type
                    </InputLabel>
                    <Select
                      sx={{ fontSize: "1.3rem" }}
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={data.farmertype}
                      label="farmertype"
                      name="farmertype"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "1.3rem", fontFamily: "monospace" }}
                        value={"farmers"}
                      >
                        Farmer
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "1.3rem", fontFamily: "monospace" }}
                        value={"Organic farmers"}
                      >
                        Organic Farmer
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "1.3rem", fontFamily: "monospace" }}
                        value={"FPO/FPC"}
                      >
                        FPO/FPC
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "1.3rem", fontFamily: "monospace" }}
                        value={"Retailer"}
                      >
                        Retailer
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "1.3rem", fontFamily: "monospace" }}
                        value={"Wholesaler"}
                      >
                        Wholesaler
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "1.3rem", fontFamily: "monospace" }}
                        value={"Start-up"}
                      >
                        Start Up
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "1.3rem", fontFamily: "monospace" }}
                        value={"Vocal for local producers"}
                      >
                        Vocal for Local Producers
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "monospace" },
                  }}
                  fullWidth
                  name="address"
                  label="address (optional)"
                  type="address"
                  id="address"
                  value={data.address}
                  onChange={handleChange}
                  autoComplete="new-address"
                  color="success"
                  className="textfield"
                />
              </Grid>
              {data.type === "farmer" && (
                <Grid item xs={12}>
                  <ReactTags
                    InputProps={{ style: { fontSize: 15 } }}
                    inputlabelprops={{ style: { fontSize: 15 } }}
                    tags={tags}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    inputFieldPosition="bottom"
                    autocomplete
                    color="success" 
              className='textfield'
                    placeholder="Add Selling Products Names and press enter"
                  />
                </Grid>
              )}
            </Grid>
            {error !== "no error" && (
              <h3
                style={{ alignSelf: "center", color: "red", marginTop: "10px" }}
              >
                {error}
              </h3>
            )}
            <Button
              type="submit"
              fullWidth
              className="signup-btn"
              variant="contained"
              color="success"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link className="form-link" to="/login" variant="body2">
                  Already have an account? <span className="login">Log In</span>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
