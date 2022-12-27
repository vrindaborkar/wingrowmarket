import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Farmer.css";
import useWindowDimensions from "../../components/useWindowDimensions";

const FarmerNav = () => {
  const [close, setClose] = useState(true);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width < 800) {
      setClose(false);
    }
  }, [width]);

  return (
    <>
      {!close && (
        <div className="farmers_navigate">
          <img
            className="close_btn"
            onClick={() => setClose(!close)}
            src="https://cdn-icons-png.flaticon.com/512/2989/2989988.png"
            alt="logo"
          />
          <Link className="links_farmersdata red" to="/farmers">
            Book Stall
          </Link>
          <Link className="links_farmersdata green" to="./mybookings">
            My Bookings
          </Link>
          <Link className="links_farmersdata red" to="./inward">
            Fill Inward
          </Link>
          <Link className="links_farmersdata green" to="./outward">
            Fill Outward
          </Link>
          <Link className="links_farmersdata red" to="./farmershome">
            Data
          </Link>
        </div>
      )}
      {close && (
        <div className="farmers_close_navigate">
          <img
            className="close_btn"
            onClick={() => setClose(!close)}
            src="https://as2.ftcdn.net/v2/jpg/04/20/10/99/1000_F_420109963_Ykw6qJNRq0dwj8kry6ytLTZtg9w3GJlf.jpg"
            alt="logo"
          />
        </div>
      )}
    </>
  );
};

export default FarmerNav;
