// eslint-disable-next-line no-unused-vars
import React from 'react'
import {Navigate} from 'react-router-dom'
import { useAuth } from '../../store/auth'

const BookStore = () => {
  const {isLoggedIn, isLoading} = useAuth();

  if(isLoading){
    return <h1>Loading ...</h1>
  }

  if(!isLoggedIn){
    return <Navigate to="/" />
  }

  return (
    <div>Dashboard</div>
  )
}

export default BookStore