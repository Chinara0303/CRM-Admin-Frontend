import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Bar,BarChart,XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const getPath = (x, y, width, height) => (
  `M${x},${y + height}
   C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
   C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
   Z`
);
const TriangleBar = (props) => {
  const {
    fill, x, y, width, height,
  } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};
function SiteDashboard() {
  const [groups, setGroups] = useState([])
  const baseUrl = "http://webfulleducation-001-site1.atempurl.com";

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
    getGroupsAsync()
  }, [])


  return (
    <div>
      <BarChart width={600} height={400} data={groups}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="studentsCount" barSize={50} fill="#8884d8" shape={<TriangleBar />} />
      </BarChart>
    </div>
  )
}

export default SiteDashboard