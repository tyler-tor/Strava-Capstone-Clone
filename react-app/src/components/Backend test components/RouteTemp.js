import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


const TempRoute = () => {
    const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [startingPoint, setStartingPoint] = useState('')
    const [endingPoint, setEndingPoint] = useState('')
    const [distance, setDistance] = useState('')

    const onSubRoute = (e) => {
        e.preventDefault();
    };

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }
    const updateDescription = (e) => {
        setDescription(e.target.value)
    }
    const updateImageUrl = (e) => {
        setImageUrl(e.target.value)
    }
    const updateStartingPoint = (e) => {
        setStartingPoint(e.target.value)
    }
    const updateEndingPoint = (e) => {
        setEndingPoint(e.target.value)
    }
    const updateDistance = (e) => {
        setDistance(e.target.value)
    }

    return (
        <>
            <div>
                
            </div>
        </>
    )
}
