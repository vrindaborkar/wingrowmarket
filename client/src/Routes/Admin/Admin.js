import React,{useState , useEffect} from 'react'
import { Routes, Route } from "react-router-dom";
import AdminMain from './AdminMain';
import AdminHome from './AdminHome';
import FarmersListData from './FarmersListData';
import CustomersList from './CustomersList';
import CancellationFeed from './CancellationFeed';
import UserService from '../../services/user.service';
import axios from 'axios';
import authHeader from '../../services/auth.headers';
import FarmerService from '../../services/farmer.service';
import dayjs from 'dayjs'

const Admin = () => {
    const [Inward, setInward] = useState()
    const [Outward, setOutward] = useState()
    const [value, setValue] = useState(dayjs(Date.now()).format("YYYY-MM-DD"));
    const [filteredInData, setfilteredInData] = useState()
    const [filteredOutData, setfilteredOutData] = useState()
    const [fromDate, setfromDate] = useState(dayjs(Date.now()).format("YYYY-MM-DD"))
    const [toDate, settoDate] = useState(dayjs(Date.now()).format("YYYY-MM-DD"))
    const [market, setMarket] = React.useState('');
    const [CancelledStalls, setCancelledStalls] = useState()
    const [stallsBooked, setstallsBooked] = useState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [Farmers, setFarmers] = useState()
    const [Customer, setCustomer] = useState()
  
    const handleChangeMarket = (event) => {
      setMarket(event.target.value);
    };
  
    useEffect(() => {
      FarmerService.getBookedStalls().then(res => {
        const data = res?.data;
        setstallsBooked(data)
      })
      FarmerService.getInwardData().then(res => 
        {
          setInward(res?.data);
          setfilteredInData(res?.data)
        })
      FarmerService.getOutwardData().then(res => 
        {
          setOutward(res?.data);
          setfilteredOutData(res?.data)
        })
  
      FarmerService.getcancelledStalls().then(res=>{
        setCancelledStalls(res?.data)
      })
  
        UserService.getFarmers().then(res=>{
          setFarmers(res?.data)
        })
  
        UserService.getUsers().then(res=>{
          setCustomer(res?.data)
        })
    }, [])
  
    const totalFarmers = new Set();
    const farmers = new Set();
    const marketsData = new Set();
    const farmersMarket = []
    let purchaseQty = 0;
    let purchaseAmount = 0;
    let salesQty = 0;
    let salesAmount = 0;
    let noOfBookedStalls = stallsBooked?.length;
  
    Inward && Inward.forEach((e)=>{
      marketsData.add(e.market)
    });
  
    filteredInData && filteredInData.forEach(e => {
      totalFarmers.add(e.market)
      farmers.add(e.userId)
  
      purchaseQty += e.purchase_quantity
      purchaseAmount += e.purchase_rate
    });
  
    filteredOutData && filteredOutData.forEach(e => {
      salesQty += e.sales_quantity
      salesAmount += e.sales_rate
    });
  
  
    const handleSearchmarkets = () => {
      const marketresponse = Inward && Inward.filter(e => e.market === market);
      setfilteredInData(marketresponse)
      handleClose()
    }
  
    const handleSearchDate = () => {
      const inData = Inward && Inward.filter((e)=>{
        const [date] = e.time.split("T");
        return date === dayjs(value).format("YYYY-MM-DD")
      })
  
      const outData = Outward && Outward.filter((e)=>{
        const [date] = e.time.split("T");
        return date === dayjs(value).format("YYYY-MM-DD")
      })
  
      const stallsData = stallsBooked && stallsBooked.filter((e)=>{
        return e.bookedAt === dayjs(value).format("YYYY-MM-DD")
      })
  
      setstallsBooked(stallsData)
      setfilteredInData(inData)
      setfilteredOutData(outData)
      handleClose()
    }
    
  
    const handleSearch = () => {
      const filterIn = Inward && Inward.filter((e)=>{
        const [date] = e.time.split("T");
        return date >= dayjs(fromDate).format("YYYY-MM-DD") && date <= dayjs(toDate).format("YYYY-MM-DD")
      })
  
      const filterOut = Outward && Outward.filter((e)=>{
        const [date] = e.time.split("T");
        return date >= dayjs(fromDate).format("YYYY-MM-DD") && date <= dayjs(toDate).format("YYYY-MM-DD")
      })
  
      const stallsData = stallsBooked && stallsBooked.filter((e)=>{
        const [date] = e.bookedAt.split("T");
        return date >= dayjs(fromDate).format("YYYY-MM-DD") && date <= dayjs(toDate).format("YYYY-MM-DD")
      })
  
      setstallsBooked(stallsData)
      setfilteredInData(filterIn);
      setfilteredOutData(filterOut)
      handleClose()
    }
    
    for(let item of marketsData){
      farmersMarket.push(item)
    }
  
    const handleRefundDelete = (e) => {
      const id = e.target.id;
      const response = window.confirm("Confirm Refunded?")
      // if(response === true){
      //   axios.delete("https://wingrowagritech.herokuapp.com/cancelledstalls" , { headers: authHeader()  , data:{id: id}}).then(res=>{
      //     const data = res?.data;
      //     const filter = CancelledStalls.filter(e=>e._id !== data._id);
      //     setCancelledStalls(filter)
      //   })
      // }
      if(response === true){
        axios.delete("http://localhost:4000/cancelledstalls" , { headers: authHeader()  , data:{id: id}}).then(res=>{
          const data = res?.data;
          const filter = CancelledStalls.filter(e=>e._id !== data._id);
          setCancelledStalls(filter)
        })
      }
    }
  
  return (
    <Routes>
    <Route path='/' element={<AdminMain/>}>
          <Route index 
            element=
            {<AdminHome
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
                filteredInData={filteredInData}
                filteredOutData={filteredOutData}
                purchaseQty={purchaseQty}
                purchaseAmount={purchaseAmount}
                salesQty={salesQty}
                salesAmount={salesAmount}
                noOfBookedStalls={noOfBookedStalls}
                totalFarmers={totalFarmers}
                farmers={farmers}
                Farmers={Farmers}
                Customer={Customer}
            />}
            />

          <Route path='/listoffarmers' element={<FarmersListData Farmers={Farmers}/>}/>
          <Route path='/listofCustomers' element={<CustomersList Customer={Customer}/>}/>
          <Route path='/cancelledstalls' element={<CancellationFeed Farmers={Farmers} CancelledStalls={CancelledStalls} handleRefundDelete={handleRefundDelete}/>}/>
        </Route>
    </Routes>
  )
}

export default Admin