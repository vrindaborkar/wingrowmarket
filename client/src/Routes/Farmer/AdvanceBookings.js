import React, { useState, useEffect } from "react";
import Datepicker from "../../components/Datepicker";
import "../../styles/AdvanceBookings.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Stall from "./Stall";
import authHeader from "../../services/auth.headers";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import ConfirmModal from "../../components/ConfirmModal";
import FarmerService from "../../services/farmer.service";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import { TextField } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import SelectSeatModal from "../../components/SelectSeatModal";
// import Spinner from '../../components/Spinner';
const userCurr = AuthService.getCurrentUser();

const locations = [
  { location: "Hadapsar" },
  { location: "Karve Nagar" },
  { location: "Kharadi" },
  { location: "Wanawadi" },
  { location: "Magarpatta" },
  { location: "Amanora City" },
  { location: "Bramhasun City" },
];

const AdvanceBookings = ({ setbookingDetails,setValue }) => {
  const [location, setlocation] = useState("");
  const navigate = useNavigate();
  const [data, setdata] = useState();
  const [UpdatedData, setUpdatedData] = useState();
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [bookedStalls, setBookedStalls] = useState([]);
  const [value, setvalue] = useState(dayjs(Date.now()).format("YYYY-MM-DD"));
  const [alreadyBooked, setAlreadyBooked] = useState();
  const [open, setOpen] = useState();



  const handleChange = (e , newValue) => {
    setNumberOfSeats(e.nativeEvent.data);
    setValue(newValue);
  };


  useEffect(() => {
    FarmerService.getMyStalls().then((response) => {
      setdata(response.data);
    });

    FarmerService.getBookedStalls().then((response) => {
      setAlreadyBooked(response.data);
    });
    handleOpen(true);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const res = data && data.filter((e) => e.location === `${location}`);
    setUpdatedData(res);
  }, [location, data, value]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const confirmBooking = async (e) => {
    const price = bookedStalls.reduce(
      (total, item) => item.stallPrice + total,
      0
    );

    if (bookedStalls.length === 0) {
      toast.warn("Failed to book stalls!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      // const orderUrl = "https://wingrowagritech.herokuapp.com/order";
      const orderUrl = "http://localhost:4000/order";
      const { data } = await axios.post(
        orderUrl,
        { amount: price * 100 },
        { headers: authHeader() }
      );
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const initPayment = (data) => {
    let bookedStats = bookedStalls.toString();
    const options = {
      key: process.env.KEY_ID,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      bookedStalls: bookedStats,
      description: "Wingrow Agritech",

      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:4000/verify";
          const { data } = await axios.post(verifyUrl, response, {
            headers: authHeader(),
          });
          const orderId = data.orderId;

          const responseData = {
            location: location,
            bookedStalls: bookedStalls,
            bookedBy: userCurr.id,
            bookedAt: dayjs(value).format("YYYY-MM-DD"),
            isBooked: true,
          };

          const stallsBooked = [];
          bookedStalls.forEach((e) => {
            stallsBooked.push(e.stallName);
          });

          const price = bookedStalls.reduce(
            (total, item) => item.stallPrice + total,
            0
          );
          const Url = "http://localhost:4000/bookedstalls";

          axios
            .post(Url, responseData, { headers: authHeader() })
            .then((response) => {
              const { data } = response;
              if (data) {
                setbookingDetails({
                  farmer: userCurr.firstname + " " + userCurr.lastname,
                  phone: userCurr.phone,
                  paymentDetails: orderId,
                  BookedStalls: stallsBooked,
                  stallsBooked: bookedStalls.length,
                  totalAmount: price,
                });
              }
              toast.success("stalls booked successfully!", {
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
                navigate("../ticket");
              }, 1000);
            })
            .catch((error) => {
              toast.warn("Failed to book stalls!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setBookedStalls([]);
              setNumberOfSeats(0);
            });
        } catch (error) {
          console.log(error);
          setBookedStalls([]);
          setNumberOfSeats(0);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleClick = (ev) => {
    if (numberOfSeats && ev.target.className !== "booked") {
      const seatsToBook = parseInt(numberOfSeats, 20);
      if (bookedStalls.length <= seatsToBook) {
        if (bookedStalls.includes(ev.target.id)) {
          const newAvailable = bookedStalls.filter(
            (seat) => seat !== ev.target.id
          );
          setBookedStalls(newAvailable);
        } else if (bookedStalls.length < numberOfSeats) {
          const item = UpdatedData.filter((e) => e._id === ev.target.id);
          setBookedStalls([...bookedStalls, item[0]]);
        } else if (bookedStalls.length === seatsToBook) {
          const item = UpdatedData.filter((e) => e._id === ev.target.id);
          bookedStalls.shift();
          setBookedStalls([...bookedStalls, item[0]]);
        }
      }
    }
  };

  return (
    <div className="Test">
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
      <Link to="../" className="advancebookinglinkback">
        Go Back to stalls!
      </Link>
      <div className="main_container_stalls">
        <Grid className="input-div-holder" container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputLabel className="stall-booking-lable">
              Enter Booking Date
            </InputLabel>
            <TextField
              inputlabelprops={{
                style: { fontSize: 14, fontFamily: "monospace" },
              }}
              name="booking-date"
              required
              fullWidth
              type="date"
              id="booking-date"
              autoFocus
              value={value}
              setValue={setvalue}
              color="success"
              className="textfield"
            />
          </Grid>
          <Grid  className="select-market-grid" item xs={12} sm={6}>
            <FormControl className="formcontrol" sx={{ width: "100%", fontSize: 14 }}>
              <InputLabel color="success" className="stall-booking-lable">
                Market
              </InputLabel>
              <Select
                className="textfield"
                id="demo-simple-select-autowidth"
                value={location}
                color="success"
                onChange={(e) => {
                  setlocation(e.target.value);
                }}
                label="address"
                name="address"
                required
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
          <Grid item xs={12} sm={6}>
                <InputLabel className="stall-booking-lable">
                  Number Of Stall Required
                </InputLabel>
                <TextField
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "monospace" },
                  }}
                  name="number-of-stalls-req"
                  required
                  placeholder="00"
                  fullWidth
                  type="number"
                  id="number-of-stalls-req"
                  autoFocus
                  color="success"
                  className="textfield"
                  onChange={handleChange}
                />
              </Grid>
        </Grid>

        <div className="secondary_container_stalls">
          {UpdatedData && location !== "" ? (
            <Grid className="stalls-count-cantainer">
            <div className="stall_wrapper">
                     
                        <div className="StallsContainer">
                          <Stall
                            data={UpdatedData.slice(0, 16)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={dayjs(Date.now()).format("YYYY-MM-DD")}
                          />
                          <Stall
                            data={UpdatedData.slice(16, 17)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={dayjs(Date.now()).format("YYYY-MM-DD")}
                          />
                          <Stall
                            data={UpdatedData.slice(17, 18)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={dayjs(Date.now()).format("YYYY-MM-DD")}
                          />
                          <Stall
                            data={UpdatedData.slice(18, 34)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={dayjs(Date.now()).format("YYYY-MM-DD")}
                          />
                        </div>
                    </div>
            </Grid>
           ) : (
            <div className="select_market">
              <h2>Please select the market</h2>
            </div>
          )}
          <div className="modal_btn">
            <ConfirmModal confirmBooking={confirmBooking} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceBookings;
