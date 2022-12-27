import "../../styles/Test.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Stall from "./Stall";
import authHeader from "../../services/auth.headers";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";
import ConfirmModal from "../../components/ConfirmModal";
import FarmerService from "../../services/farmer.service";
import dayjs from "dayjs";
import Spinner from "../../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectSeatModal from "../../components/SelectSeatModal";
import { Button } from "@mui/material";

const userCurr = AuthService.getCurrentUser();

function Test({ setbookingDetails }) {
  const navigate = useNavigate();
  const [data, setdata] = useState();
  const [UpdatedData, setUpdatedData] = useState();
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [bookedStalls, setBookedStalls] = useState([]);
  const [Loading, setLoading] = useState();
  const { Id } = useParams();
  const [alreadyBooked, setAlreadyBooked] = useState();
  const [open, setOpen] = useState();

  useEffect(() => {
    setLoading(true);
    FarmerService.getMyStalls().then((response) => {
      setLoading(false);
      setdata(response.data);
    });

    FarmerService.getBookedStalls().then((response) => {
      setAlreadyBooked(response.data);
    });
    handleOpen(true);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    const res = data && data.filter((e) => e.location === `${Id}`);
    setUpdatedData(res);
  }, [Id, data]);

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
            location: Id,
            bookedStalls: bookedStalls,
            bookedBy: userCurr.id,
            bookedAt: dayjs(Date.now()).format("YYYY-MM-DD"),
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

  const lengthofUpdatedData = UpdatedData?.length;

  return (
    <>
      {!Loading ? (
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
          <Link to="../advancebookings" className="advancebookinglink">
            Advance booking !
          </Link>
          <h2>{Id}</h2>
          <div className="main_container_stalls">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "200px",
              }}
            >
              <SelectSeatModal
                handleClose={handleClose}
                handleOpen={handleOpen}
                open={open}
                setNumberOfSeats={setNumberOfSeats}
              />
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "15px",
                  marginTop: "10px",
                }}
              >
                <b>: {numberOfSeats}</b>
              </span>
            </div>
            {UpdatedData && Id ? (
              <div className="stall_wrapper">
                {lengthofUpdatedData === 34 && (
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
                )}
                {lengthofUpdatedData === 50 && (
                  <div className="StallsContainer">
                    <Stall
                      data={UpdatedData.slice(0, 24)}
                      handleClick={handleClick}
                      bookedStalls={bookedStalls}
                      alreadyBooked={alreadyBooked}
                      date={dayjs(Date.now()).format("YYYY-MM-DD")}
                    />
                    <Stall
                      data={UpdatedData.slice(24, 25)}
                      handleClick={handleClick}
                      bookedStalls={bookedStalls}
                      alreadyBooked={alreadyBooked}
                      date={dayjs(Date.now()).format("YYYY-MM-DD")}
                    />
                    <Stall
                      data={UpdatedData.slice(25, 26)}
                      handleClick={handleClick}
                      bookedStalls={bookedStalls}
                      alreadyBooked={alreadyBooked}
                      date={dayjs(Date.now()).format("YYYY-MM-DD")}
                    />
                    <Stall
                      data={UpdatedData.slice(26, 50)}
                      handleClick={handleClick}
                      bookedStalls={bookedStalls}
                      alreadyBooked={alreadyBooked}
                      date={dayjs(Date.now()).format("YYYY-MM-DD")}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="select_market">
                <h2>Please select the market</h2>
              </div>
            )}
            {numberOfSeats !== 0 && bookedStalls.length !== 0 ? (
              <div className="modal_btn">
                <ConfirmModal confirmBooking={confirmBooking} />
              </div>
            ) : (
              <div className="bookStall_btn">
                <Button disabled>Book Stall</Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Test;




// Admin Home

import '../../styles/Admin.css'
import Card from '../../components/Card'
import Spinner from '../../components/Spinner'
import FilterModal from '../../components/FilterModal';
import { Link } from 'react-router-dom';

const AdminHome = ({
  handleChangeMarket,fromDate,setfromDate,toDate,settoDate,value,setValue,handleSearch,market,farmersMarket,
  open,setOpen,handleClose,handleOpen,handleSearchmarkets,handleSearchDate,filteredInData,filteredOutData,
  purchaseQty,purchaseAmount,salesQty,salesAmount,noOfBookedStalls,totalFarmers,farmers,Farmers,Customer
}) => {

  const FarmersObj = [];
  const farmersData = new Map();
  Farmers && Farmers.forEach((e)=>{
    if(farmersData.has(e.farmertype)){
      farmersData.set(e.farmertype , farmersData.get(e.farmertype)+1)
    }else{
      farmersData.set(e.farmertype, 0);
    }
  })

  farmersData.forEach((value, key) => {
    FarmersObj.push({farmertype : key , count : value})
  })

  return (
    <>
    <div className='admin_main_component'>
        <div>
          <FilterModal 
          handleChangeMarket={handleChangeMarket}
          fromDate={fromDate}
          setfromDate={setfromDate}
          toDate={toDate}
          settoDate={settoDate}
          value={value}
          setValue={setValue}
          handleSearch={handleSearch}
          market={market}
          farmersMarket={farmersMarket}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          handleOpen={handleOpen}
          handleSearchmarkets={handleSearchmarkets}
          handleSearchDate={handleSearchDate}
          />
        <h2 className='overalldata_header'>Farmers Statistics</h2>
          {filteredInData && filteredOutData && <div className='cards_container'>
              <Card header={"Total farmers market :"} value={totalFarmers.size}/>
              <Card header={"Purchase Quantity :"} value={purchaseQty}/>
              <Card header={"Purchase Amount :"} value={purchaseAmount}/>
              <Card header={"Sales Quantity :"} value={salesQty}/>
              <Card header={"Sales Amount :"} value={salesAmount}/>
              <Card header={"Profit of farmers :"} value={salesQty - purchaseQty}/>
              <Card header={"Stalls Booked :"} value={noOfBookedStalls}/>
            </div>}
        </div>
    

        <div>
        <h2 className='overalldata_header'>Types of Farmers</h2>
        {FarmersObj &&
          <div className='cards_container'>
          {FarmersObj.map((e,i)=>{
            return(
              <Card key={i} header={e.farmertype} value={e.count}/>
            )
          })}
          </div>}
        </div>

        {Customer && <div className='customers_entries_count'>
          <span>
            <h2>Total no. of customers</h2>
            <div className='customers_count'>{Customer.length}</div>
          </span>
        </div>}

        <div className='links_container'>
          <h2 className='overalldata_header'>Navigation Links</h2>
          <div className='admin_links'>
            <Link className='admin_links_details' to="../listoffarmers">Get list of Farmers</Link>
            <Link className='admin_links_details' to="../listofCustomers">Get list of Customers</Link>
            <Link className='admin_links_details' to="../cancelledstalls">Get list of Cancelled Stalls</Link>
          </div>
        </div>

  </div>
  {!filteredInData && !filteredOutData && !Farmers &&<Spinner/>}
  </>
  )
}

export default AdminHome


<div className="farmers_page">
{InwardData && OutwardData && (
  <div className="farmers_data">
    {InwardData.length !== 0 && (
      <div className="inwardData">
        <h3 style={{ padding: "1rem 0" }}>Inward Data</h3>
        <div className="farmersdata_container">
          {InwardData.map((e, i) => {
            return (
              <div key={i} className="farmerdata_items">
                <span>Market : {e.market}</span>
                <span>Commodity : {e.commodity}</span>
                <span>Time : {e.time}</span>
                <span>Purchase rate : {e.purchase_rate}</span>
                <span>Purchase quantity : {e.purchase_quantity}</span>
              </div>
            );
          })}
        </div>
      </div>
    )}

    {InwardData.length === 0 && (
      <div className="inwardData">
        <h3 style={{ padding: "1rem 0" }}>Inward Data</h3>
        <div className="farmersdata_container">
          No Inward Data available!
        </div>
      </div>
    )}

    {OutwardData.length !== 0 && (
      <div className="outwardData">
        <h3 style={{ padding: "1rem 0" }}>Outward Data</h3>
        <div className="farmersdata_container">
          {OutwardData.map((e, i) => {
            return (
              <div key={i} className="farmerdata_items">
                <span>Market : {e.market}</span>
                <span>Commodity : {e.commodity}</span>
                <span>Time : {e.time}</span>
                <span>Sales rate : {e.sales_rate}</span>
                <span>Sales quantity : {e.sales_quantity}</span>
              </div>
            );
          })}
        </div>
      </div>
    )}

    {OutwardData.length === 0 && (
      <div className="outwardData">
        <h3 style={{ padding: "1rem 0" }}>Outward Data</h3>
        <div className="farmersdata_container">
          No Outward Data available!
        </div>
      </div>
    )}
  </div>
)}
{!InwardData && !OutwardData && <Spinner />}
</div>




import React from "react";
import firebase from "./firebase";

class App extends React.Component {
  handleChange = (e) =>{
    const { name, value} =e.target
    this.setState({
      [name]: value
    })
  }

  configureCaptcha = () =>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit()
        console.log("Recaptcha Verified")
      },
      defaultCountry: "IN"
    });
  }

  onSignInSubmit = (e) =>{
    e.preventDefault()

    this.configureCaptcha()

    const phoneNumber = "+91" + this.state.mobile
    // // console.log(values.mobile)
    // // const phone = values.mobile
    // const phoneNumber = "+91" + mobile
    console.log(phoneNumber)

    
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent")
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("SMS not sent")
        });
      }
      onSubmitOTP = (e) => {
        e.preventDefault()
        const code = this.state.otp
        console.log(code)
        window.confirmationResult.confirm(code).then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log(JSON.stringify(user))
          alert("User is verified")
          window.location.href="/NewPassword"
    // ...
    }).catch((error) => {
    // User couldn't sign in (bad verification code?)
    // ...
  });


}

   render(){
    return(
      <div>
        {/* Login */}
        <h2>Login Form</h2>
        <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button"></div>
          <input type="number" name="mobile" placeholder="Mobile Number" required onChange={this.handleChange}/>
          <button type="submit">Submit</button>
        </form>
        {/* OTP */}
        <h2>Enter OTP</h2>
        <form onSubmit={this.onSubmitOTP}>
          <input type="number" name="otp" placeholder="OTP Number" required onChange={this.handleChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
export default App
