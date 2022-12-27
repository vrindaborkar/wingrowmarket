import React from 'react'

const FarmersListData = ({Farmers}) => {
  return (
    <>
          <div className='farmers_data_entries'>
                <div className='farmers_entries'>
                    <div className='farmers_entries_nav'>
                   
                    <span className='farmers_entries_nav_farmername'>
                       Name
                    </span>
                    <span  className='farmers_entries_nav_farmerstype'>
                       Type
                    </span>
                    <span  className='farmers_entries_nav_farmersContact'>
                        Contact
                    </span>
                    <span  className='farmers_entries_nav_farmersaddress'>
                        Address
                    </span>
                    </div>

                    <div className='farmers_entries_body'>
                        {
                        Farmers && Farmers.map((e,i)=>{
                            return(
                            <div key={i} className='farmers_entries_section'>
                                <span className='farmers_entries_nav_farmername'>
                                    {e.firstname} {e.lastname}
                                </span>
                                <span  className='farmers_entries_nav_farmerstype'>
                                    {e.farmertype}
                                </span>
                                <span  className='farmers_entries_nav_farmersContact'>
                                {e.phone}
                    </span>
                    <span  className='farmers_entries_nav_farmersaddress'>
                    {e.address}
                    </span>
                            </div>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
    </>
  )
}

export default FarmersListData