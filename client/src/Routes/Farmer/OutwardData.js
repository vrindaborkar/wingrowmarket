import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../styles/Farmer.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import FarmerService from "../../services/farmer.service";
import Autocomplete from "@mui/material/Autocomplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const locations = [
  { location: "Hadapsar" },
  { location: "Karve Nagar" },
  { location: "Kharadi" },
  { location: "Wanawadi" },
  { location: "Magarpatta" },
  { location: "Amanora City" },
  { location: "Bramhasun City" },
];

const options = [
  // Leaves
  { label: "Amaranthus" },
  { label: "Beet Root" },
  { label: "Chukka- sorrel Leaves" },
  { label: "Colocasia Leaves" },
  { label: "Curry Leaves" },
  { label: "Dill" },
  { label: "Fenugreek Leaves" },
  { label: "Green Amaranth" },
  { label: "Spinach" },
  { label: "Spring Onion" },
  { label: "Sufflower" },
  // Wild-Antic
  { label: "Chilli" },
  { label: " Colocasia Roots" },
  { label: "Cucumber Madras" },
  { label: "Kohlrabi" },
  { label: "Onion White-Pandhara Kanda" },
  { label: "Pointed Gourd" },
  { label: "Pumpkin" },
  { label: "Raw Jackfruit" },
  { label: "Raw Papaya" },
  { label: "Sambhar Kanda" },
  { label: "Snake Gourd" },
  { label: "Spiny Gourd" },
  { label: "Sweet Potato" },
  { label: "Yam" },
  // Exotic
  { label: "Asparagus" },
  { label: "Avocado" },
  { label: "Baby Corn" },
  { label: "Baby Potato" },
  { label: "Basil" },
  { label: "Broccoli" },
  { label: "Celery" },
  { label: "Cherry Tomato" },
  { label: "chinese Cabbage" },
  { label: "Coccinia" },
  { label: "Green Zucchini" },
  { label: "Iceberg Lettuce" },
  { label: "Parsley" },
  { label: "Red Cabbage" },
  { label: "Red Capsicum" },
  { label: "Romaine Lettuce" },
  { label: "Yellow Capsicum" },
  { label: "Yellow Zucchini" },
  { label: "Mushroom" },
  { label: "Sweet Corn" },
  { label: "Sweet Corn Grains" },
  // Special stall
  { label: "Cabbage" },
  { label: "Potato (Agra)" },
  { label: "Potato (Indore)" },
  { label: "Potato (Talegav)" },
  // Fruit Vegetables
  { label: "Beans Double" },
  { label: "Bitter Gourd" },
  { label: "Brinjal Big" },
  { label: "Brinjal Green" },
  { label: "Brinjal Long Green" },
  { label: "Brinjal Purple" },
  { label: "Carrot" },
  { label: "Cauliflower" },
  { label: "Chavali Beans" },
  { label: "Chickpeas - Chana sprouts" },
  { label: "chilli - Bhavgagari Mirchi" },
  { label: "Chilli Green" },
  { label: "chilli Simple" },
  { label: "Cluster Beans" },
  { label: "Coconut" },
  { label: "Colocasia Roots" },
  { label: "Coriander" },
  { label: "Cucumber" },
  { label: "Cucumder Madras" },
  { label: "Cucumber Madras- Sambar Kakadi" },
  { label: "Cucumber Polyhouse- English Kakadi" },
  { label: "Drum Sticks" },
  { label: "Field Beans" },
  { label: "Fresh Peeled Green Peas" },
  { label: "Garlic" },
  { label: "Ginger" },
  { label: "Green Capsicum" },
  { label: "Green Mango" },
  { label: "Green Peas" },
  { label: "Groundnut Pods" },
  { label: "Tamarind" },
  { label: "Lady Finger" },
  { label: "Lemon Grass" },
  { label: "Mint" },
  { label: "Onion" },
  { label: "Onion Sambhar" },
  { label: "Lima Beans" },
  { label: "Peeled Garlic" },
  { label: "Potato" },
  { label: "Radish" },
  { label: "Ridgegourd" },
  { label: "Sponge Gourd" },
  { label: "Tomato" },
  { label: "Wal" },
  { label: "Wal Broad" },
  { label: "Wal surati" },
  { label: "Water Chestnuts" },
  // Fruit Export
  { label: "Apple Fuji" },
  { label: "Apple Green" },
  { label: "Apple Kinnaur" },
  { label: "Apple Red Delicious" },
  { label: "Apple Shimla Big" },
  { label: "Kiwi" },
  { label: "Litchi" },
  { label: "Strawberry" },
  // Fruit Summer
  { label: "Grapes Black" },
  { label: "Grapes Green" },
  { label: "Jambhul" },
  { label: "Mango Badami (For Juice)" },
  { label: "Mango Devgad Hapus" },
  { label: "Mango Keshar" },
  { label: "Mango Lalbag" },
  { label: "Mango Payri" },
  { label: "Mango Ratnagiri Hapus" },
  { label: "Mango Totapuri" },
  { label: "Muskmelon" },
  { label: "Watermelon Kiran" },
  { label: "Watermelon Regular" },
  // Fruit
  { label: "Amla" },
  { label: "Apple Gourd" },
  { label: "Ashgourd" },
  { label: "Banana" },
  { label: "Custard-apple" },
  { label: "Elaichi Banana" },
  { label: "Figs" },
  { label: "Guava" },
  { label: "Jackfruit Peeled" },
  { label: "Jujube - Ber" },
  { label: "Orange Small" },
  { label: "Orange Kinnow" },
  { label: "Papaya" },
  { label: "Pear Imported" },
  { label: "Pomogranate" },
  { label: "Raw Banana" },
  { label: "Sapodilla" },
  { label: "Sugarcane" },
  { label: "Sweet Lime" },
  { label: "Tender" },
];

const theme = createTheme();

export default function OutwardData() {
  const [Data, setData] = useState({
    sales_quantity: undefined,
    sales_rate: undefined,
    market: "",
  });

  const [commodity, setcommodity] = useState("");

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const time = dayjs(Date.now()).format("YYYY-MM-DDTHH:mm:ss");

    if (
      commodity &&
      Data.sales_quantity &&
      Data.sales_rate &&
      Data.market &&
      time
    ) {
      FarmerService.postOutward(
        commodity,
        Data.sales_quantity,
        Data.sales_rate,
        Data.market,
        time
      ).then(
        () => {
          toast.success("Outward data has been added successfully!", {
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
            window.location.reload();
          }, 2000);
        },
        (error) => {
          toast.warn("Failed to add data!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setData({
            market: "",
            sales_rate: 0,
            sales_quantity: 0,
          });
          setcommodity("");
        }
      );
    } else {
      toast.warn("Invalid data!", {
        position: "top-right",
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
    <div className="data_container">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ThemeProvider theme={theme}>
        <Container className="main" component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            className="box2"
            sx={{
              // marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 40px 10px 40px",
              height: "100%",
              width: "100%",
            }}
          >
            <Typography component="h1" variant="h4">
              Farmer Outward Data!!
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <Typography className="stall-booking-lable">
                      Select Market
                    </Typography>
                    <Select
                      className="textfield select-market"
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={Data.market}
                      onChange={handleData}
                      // label="market"
                      name="market"
                      required
                      color="success"
                    >
                      {locations.map((e, i) => {
                        return (
                          <MenuItem key={i} value={e.location}>
                            {e.location}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel className="stall-booking-lable">
                    Select One Commodity
                  </InputLabel>
                  <Autocomplete
                    className="textfield"
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    disablePortal
                    id="combo-box-demo"
                    onChange={(event, value) => setcommodity(value?.label)}
                    options={options}
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        color="success"
                        className="textfield"
                        name="commodity"
                        {...params}
                        // label="commodities"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel className="stall-booking-lable">
                    Sales Quantity (kg)<sup>*</sup>
                  </InputLabel>
                  <TextField
                    className="textfield"
                    required
                    fullWidth
                    color="success"
                    name="sales_quantity"
                    value={Data.sales_quantity}
                    onChange={handleData}
                    // label="Sales Quantity"
                    type="number"
                    id="sales quantity"
                    autoComplete="new-sales quantity"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel className="stall-booking-lable">
                    Sales Rate (Rs/kg)<sup>*</sup>
                  </InputLabel>
                  <TextField
                    className="textfield"
                    required
                    fullWidth
                    color="success"
                    name="sales_rate"
                    value={Data.sales_rate}
                    onChange={handleData}
                    // label="Sales Rate"
                    type="number"
                    id="sales rate"
                    autoComplete="new-sales rate"
                  />
                </Grid>
              </Grid>
              <Grid>
                <Button
                  className="btn"
                  type="submit"
                  variant="contained"
                  sx={{ m: 2 }}
                >
                  Add
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
