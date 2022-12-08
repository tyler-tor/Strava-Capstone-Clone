import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function EditMapForm({routeId}) {
    const route = useSelector(state => state.routes[routeId])
    const dispatch = useDispatch()
    //------------------------
    const [origin, setOrigin] = useState({ ...route.startingPoint })
    const [destination, setDestination] = useState({ ...route.endingPoint })
    const [response, setResponse] = useState(null)
    //------------------------
    const [start, setStart] = useState({...route.startingPoint})
    const [end, setEnd] = useState({...route.endingPoint})
    const [title, setTitle] = useState(route.title)
    const [description, setDescription] = useState(route.description)
    const [imageUrl, setImageUrl] = useState(route.imageUrl)
    const [travelingMode, setTravelingMode] = useState(route.travelingMode)

    return (
        <div>

        </div>
    )
}

export default EditMapForm
