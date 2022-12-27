import "../../styles/Admin.css";
import Card from "../../components/Card";
import Spinner from "../../components/Spinner";
import FilterModal from "../../components/FilterModal";
import { Link } from "react-router-dom";
import { Divider, Grid } from "@mui/material";

const AdminHome = ({
  handleChangeMarket,
  fromDate,
  setfromDate,
  toDate,
  settoDate,
  value,
  setValue,
  handleSearch,
  market,
  farmersMarket,
  open,
  setOpen,
  handleClose,
  handleOpen,
  handleSearchmarkets,
  handleSearchDate,
  filteredInData,
  filteredOutData,
  purchaseQty,
  purchaseAmount,
  salesQty,
  salesAmount,
  noOfBookedStalls,
  totalFarmers,
  farmers,
  Farmers,
  Customer,
}) => {
  const FarmersObj = [];
  const farmersData = new Map();
  Farmers &&
    Farmers.forEach((e) => {
      if (farmersData.has(e.farmertype)) {
        farmersData.set(e.farmertype, farmersData.get(e.farmertype) + 1);
      } else {
        farmersData.set(e.farmertype, 1);
      }
    });

  farmersData.forEach((value, key) => {
    FarmersObj.push({ farmertype: key, count: value });
  });

  return (
    <>
      <div className="admin_main_component">
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
        <div className="farmers-stats-main">
          <h2 className="overalldata_header stats">Farmers Statistics</h2>
          <div className="farmers-stats-holder">
            {filteredInData && filteredOutData && (
              <div className="total-stall-market">
                <Card header={"Total Market"} value={totalFarmers.size} />
                <Card header={"Stalls Booked"} value={noOfBookedStalls} />
              </div>
            )}
              <div className="quantity">
            <h2>Quantity</h2>
            {filteredInData && filteredOutData && (
              <div className="total-quantity">
               
                <Card header={"Purchase:"} value={purchaseQty} />
                <Card header={"Sales:"} value={salesQty} />
              </div>
            )}
            </div>
            <div className="amount">
                <h2>Amount</h2>
            {filteredInData && filteredOutData && (
              <div className="total-amount">
                <Card header={"Purchase:"} value={purchaseAmount} />
                <Card header={"Sales:"} value={salesAmount} />
              </div>
            )}
            </div>
          </div>
        </div>

        <div className="farmers-stats-main">
          <h2 className="overalldata_header farmers-type">Types of Farmers</h2>
          {FarmersObj && (
            <div className="cards_container">
              {FarmersObj.map((e, i) => {
                return <Card key={i} header={e.farmertype} value={e.count} />;
              })}
            </div>
          )}
        </div>
        <div className="total-customers">
          <h2 className="overalldata_header no-consumers">
            Total No. Of Customers
          </h2>
          {Customer && <div className="customers_count">{Customer.length}</div>}
        </div>

        <div className='admin_links'>
          <div className="two">
            <Link className="admin_links_details" to="../listoffarmers">
              Farmers List
            </Link>
            <Link className='admin_links_details' to="../listofCustomers">Customers List</Link>
          </div>
          <div className="one">
          <Link className='admin_link' to="../cancelledstalls">Cancelled Stalls List</Link>
          </div>
          </div>
      </div>
      {!filteredInData && !filteredOutData && !Farmers && <Spinner />}
    </>
  );
};

export default AdminHome;
