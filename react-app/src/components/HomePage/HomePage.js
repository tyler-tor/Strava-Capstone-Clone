import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

function HomePage() {
    const user = useSelector(state => state.session.user)
    
  return (
    <div>

    </div>
  )
}

export default HomePage
