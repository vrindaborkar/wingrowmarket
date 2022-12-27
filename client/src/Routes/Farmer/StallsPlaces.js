import React, { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import FarmerService from '../../services/farmer.service'
import '../../styles/Farmer.css'
import Spinner from '../../components/Spinner'

const StallsPlaces = () => {
const [stalls, setStalls] = useState()
const set = new Set();
const places = [];
const navigate = useNavigate()


if(stalls)
  {
    for(let item of stalls){
    set.add(item.location)
  }
}

for(let key of set) places.push(key)

useEffect(() => {
    FarmerService.getMyStalls()
    .then(res => setStalls(res.data))
  }, [])

  const handleClick = (ev) => {
    const Id = ev.target.id
    navigate(`./stalls/${Id}`)
  }


  return (
    <>
    {stalls && <div className='places_market_container'>
        <h2 className='main_header_places'>Select Market From Below..</h2>
        <div className='places_wrapper'>
        {
            places && places.map((e,i)=>{
                return(
                    <div onClick={handleClick} key={e} id={e} className={`places_market_component${i%4}`}>
                        <img id={e} alt='logo' className='image_1' src="../images/4.webp"/>
                        <div id={e}>
                            <span id={e} className='places_headers'>Markets in <br/>{e}</span>
                        </div>
                    </div>
                )
            })
        }
        </div>
    </div>}
    {!stalls && <Spinner/>}
    </>
  )
}

export default StallsPlaces