import React from 'react'
import Spinner from '../../components/Spinner'

const CancellationFeed = ({CancelledStalls , Farmers , handleRefundDelete}) => {
  return (
    <>
        {CancelledStalls && <div className='cancellation_feed'>
        <div className='cancellation_feed_container'>
            <h2 className='cancellation_header'>Cancellation Data</h2>
            <div className='cancellation_body'>
                {
                    CancelledStalls && CancelledStalls.length !== 0 && CancelledStalls.map((e,i)=>{
                    const [user] = Farmers && Farmers.filter( ele => ele._id === e.bookedBy)
                    return(
                        <div key={i} className='cancellation_card'>
                            <h2 style={{textAlign:"center",padding:"0.5rem",textTransform:"capitalize"}}>{user.firstname+" "+user.Datelastname}</h2>
                            <div><b>Phone No : </b>{user.phone}</div>
                            <div><b>Stall Address : </b>{e.address}</div>
                            <div><b>Cancellation Date : </b>{e.cancelledAt}</div>
                            <div><b>Booked Date : </b>{e.bookedAt}</div>
                            <div><b>Stall Name :</b>{e.stallName}</div>
                            <div><b>Refund Status :</b>Not Refunded</div>
                            <div className='refund_btn_wrapper'>
                                <button className='refund_btn' id={e._id} onClick={handleRefundDelete}>Mark as Refunded</button>
                            </div>
                        </div>
                    )
                    })
                }
                {
                    CancelledStalls && CancelledStalls.length === 0 && <h2 style={{margin:"auto"}}>No Cancellation Data!</h2>
                }
                {
                    !CancelledStalls && <Spinner/>
                }
            </div>
        </div>
        </div>}
    </>
  )
}

export default CancellationFeed