import React from 'react'
import {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import FarmerService from '../../services/farmer.service';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const options = {
  indexAxis: 'x',
  elements: {
    bar: {
      borderWidth: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'center',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

const  labels=['Sun','Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Saturday']
const data = {
 labels,
 datasets:[
  {
    label:"Dataset 1",
    data:[1,2,3,4,5],
    borderWidth:0,
    backgroundColor: '#3AA54B'
  },
  {
    label: 'Dataset 2',
    data:[1,2,3,4,5],
    borderWidth:0,
    backgroundColor: '#AACE48',
  }
 ]
}
export default function BarGraph() {

  useEffect(()=>{
    const fetchData = async()=>{
FarmerService.getInward().then((res)=>{
  const data1 = res
  return res
})
      const fardata = FarmerService.getInward()
      await fetch(fardata).then((data)=>{
        console.log("farmers    " + data)
        const res = data.json()
        // console.log(res)
        return res
      }).catch(e =>{
        console.log("err   " + e)
      })
    }
    fetchData()
  },[])

  return (
    <div className='bar-graph'>
      <Bar data={data} options={options} />
    </div>
  )
}
