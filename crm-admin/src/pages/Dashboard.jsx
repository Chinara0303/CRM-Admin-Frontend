import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { BarChart, Bar, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [educations, setEducations] = useState([])
  const [groups, setGroups] = useState([])
  const baseUrl = "http://webfulleducation-001-site1.atempurl.com";

  const getEducationsAsync = async () => {
    try {
      await axios.get(`${baseUrl}/api/education/getall`)
        .then((res) => {
          if (res.data.length > 0) {
            setEducations(res.data)
          }
        });

    } catch (error) {
      Swal.fire({
        title: 'Oops...',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  }

  const getGroupsAsync = async () => {
    try {
      await axios.get(`${baseUrl}/api/group/getall?skip=0&take=0`)
        .then((res) => {
          if (res.data.datas.length > 0) {
            setGroups(res.data.datas)
          }
        });

    } catch (error) {
      Swal.fire({
        title: 'Oops...',
        text: 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  }

  useEffect(() => {
    getEducationsAsync()
    getGroupsAsync()
  }, [])


  return (
    <div className='area'>
        <LineChart width={600} height={400} data={educations}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="groupCount" stroke="#8884d8" />
        </LineChart>
        <AreaChart
          width={500}
          height={400}
          data={groups}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="studentsCount" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
    </div >
  )
}

export default Dashboard