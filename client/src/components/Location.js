import React from 'react';
import '../styles/Home.css'

function Location() {
    const locations = [
    {
        name:"Wanwadi",
        day:"Saturday",
        address:"https://maps.app.goo.gl/54qsT1zcGPEv6gMx7",
        time:"3pm-9pm"
    },
    {
        name:"Karvenagar",
        day:"Thursday",
        address:"https://goo.gl/maps/y1LnJPhQwMaqrPTF8",
        time:"3pm-9pm"
    },
    {
        name:"Amanora City",
        day:"Sunday",
        address:"https://goo.gl/maps/jUtyP67Q1oWdDMvA9",
        time:"3pm-9pm"
    },
    {
        name:"Magarpatta",
        day:"Sunday",
        address:"https://goo.gl/maps/jUtyP67Q1oWdDMvA9",
        time:"7am-1pm"
    },
    {
        name:"Sadesataranali",
        day:"Wednesday",
        address:"https://goo.gl/maps/ybC6tbJP4pg7jQja8",
        time:"3pm-9pm"
    },
    {
        name:"Bramhasun City",
        day:"Friday",
        address:"https://goo.gl/maps/w3xSJVLDc9cgdmxU9",
        time:"3pm-9pm"
    },
    {
        name:"Kharadi IT Park",
        day:"Thursday",
        address:"https://goo.gl/maps/LXo5eBEUNRn5SzBS7",
        time:"3pm-9pm"
    },
]
  return <>
      {
          locations.map((e,i)=>{
            return(
                <div key={i} className="location_container">
                        <div className="location_component_main">
                            
                            <img alt="team" className="location_image_main" src="./images/slidestall2.webp"/>
                            
                            <div className="places_main_wrapper">
                                <a href={e.address}>
                                    <h2 className="location_markets">{e.name}</h2>
                                </a>
                                <p className="location_date">{e.day} at {e.time}</p>
                            </div>
                        </div>
                    </div>
            )
          })
      }

  </>;
}

export default Location;