import * as React from 'react';
import Modal from '@mui/material/Modal';
import '../styles/Admin.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Datepicker from '../components/Datepicker'


export default function FilterModal(
    {
        handleChangeMarket,
        fromDate,
        setfromDate,
        toDate,
        settoDate,
        value,
        setValue,
        handleSearch,
        farmersMarket,
        market,
        handleClose,
        handleOpen,
        open,
        handleSearchmarkets,
        handleSearchDate
    }
    ) {

  return (
    <div>
      <button className='filter_btn_admin' onClick={handleOpen}><img src="https://cdn-icons-png.flaticon.com/512/1159/1159641.png" width={"30px"}/></button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='box_filter'>
            <h2 style={{margin:"0 auto",fontSize: "30px"}}>Filters</h2>
                <div className='header_items'>
                    <span className='date_picker_label'>Filter by date</span>
                    <div className='date_picker'>
                        <Datepicker setValue={setValue} value={value}/>
                    </div>
                    <button className='filter_btn' onClick={handleSearchDate}>Search</button>
                </div>

                <div className='header_items_center'>
                    <div className='header_items_filter'>
                        <span className='date_picker_label'>Filter between dates from</span>
                        <div className='date_picker'>
                        <Datepicker setValue={setfromDate} value={fromDate}/>
                        </div>
                    </div>
                    <div className='header_items_filter'>
                        <span className='date_picker_label'>Filter between dates to</span>
                        <div className='date_picker'>
                        <Datepicker setValue={settoDate} value={toDate}/>
                        </div>
                    </div>
                    <button className='filter_btn' onClick={handleSearch}>Search</button>
            </div>

            <div className='header_items'>
                <span className='filter-market'>Filter market wise :</span>
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                <InputLabel id="demo-select-small">Market</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={market}
                    label="Market"
                    onChange={handleChangeMarket}
                >
                    {
                    farmersMarket.length!==0 && farmersMarket.map((e , i)=>{
                        return(
                        <MenuItem key={i} value={e}>{e}</MenuItem>
                        )
                    })
                    }
                </Select>
                </FormControl>
                <button className='filter_btn' onClick={handleSearchmarkets}>Search</button>
            </div>
        </div>
      </Modal>
    </div>
  );
}
