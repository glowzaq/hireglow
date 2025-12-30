import React from 'react'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const {user} = useAuth()
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard