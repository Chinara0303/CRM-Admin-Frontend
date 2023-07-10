import React from 'react'
import Chart from 'chart.js/auto';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { LineChart, Line } from 'recharts';
function Dashboard() {
  const [educations, setEducations] = useState([])
  const baseUrl = "http://webfulleducation-001-site1.atempurl.com";
  
  const getAllAsync = async () => {
    try {
      await axios.get(`${baseUrl}/api/education/getall`)
        .then((res) => {
          if (res.data.length > 0) {
            console.log(res.data)
            setEducations(res.data)
          }
        });

    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Oops...',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  }


  useEffect(() => {
    getAllAsync()

    // const chart = new Chart(
    //   document.getElementById('acquisitions'),
    //   {
    //     type: 'bar',
    //     data: {
    //       labels: educations.map(education => education.name),
    //       datasets: [
    //         {
    //           label: 'Group count by education',
    //           data: educations.map(education => education.groupCount),
    //           borderWidth: 1,
    //         }
    //       ]
    //     }


    //   }
    // );
    const renderLineChart = (
      <LineChart width={400} height={400} data={educations}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    );
  

    // return () => {
    //   chart.destroy();
    // };

  }, [educations])


  return (
    <div className='area'>
      <div style={{ width: "800px" }}><canvas id='acquisitions'></canvas></div>
    </div>


  )
}

export default Dashboard