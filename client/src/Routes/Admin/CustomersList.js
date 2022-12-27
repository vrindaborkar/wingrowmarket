import React from 'react'
import Spinner from '../../components/Spinner'

const CustomersList = ({Customer}) => {
  return (
    <>
          <div className='farmers_data_entries'>
                <div className='farmers_entries'>
                    <div className='farmers_entries_nav'>
                    <span className='farmers_entries_nav_farmername'>
                        Customers Name
                    </span>
                    <span  className='farmers_entries_nav_farmerstype'>
                        Phone No.
                    </span>
                    <span  className='farmers_entries_nav_farmersaddress'>
                        Address
                    </span>
                    </div>

                    <div className='farmers_entries_body'>
                        {
                        Customer && Customer.length!==0 && Customer.map((e,i)=>{
                            return(
                            <div key={i} className='farmers_entries_section'>
                                <span className='farmers_entries_nav_farmername'>
                                    {e.firstname} {e.lastname}
                                </span>
                                <span  className='farmers_entries_nav_farmerstype'>
                                    {e.phone}
                                </span>
                                <span  className='farmers_entries_nav_farmerstype'>
                                    {e.address}
                                </span>
                            </div>
                            )
                        })
                        }
                        {
                            !Customer && <Spinner/>
                        }
                        {
                            Customer && Customer.length === 0 && <div className='farmers_entries_section'>No data available</div>
                        }
                    </div>
                </div>
            </div>
    </>
  )
}

export default CustomersList