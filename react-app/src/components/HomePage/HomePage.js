import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

function HomePage() {
    const user = useSelector(state => state.session.user)
    console.log('user=================', user.friends)
  return (
    <div>

    </div>
  )
}

export default HomePage
