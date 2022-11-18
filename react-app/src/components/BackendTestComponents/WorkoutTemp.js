import React, { useState } from 'react'
// import { useSelector } from 'react-redux'


const TempWorkout = () => {
    // const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [type, setType] = useState('')
    const [totalTime, setTotalTime] = useState('')
    const [distance, setDistance] = useState('')

    const onSubRoute = async (e) => {
        e.preventDefault();
        //-------------------POST ROUTE---------------------------
        // const response = await fetch('/api/workouts/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         user_id: user.id,
        //         title: title,
        //         description: description,
        //         image_url: imageUrl,
        //         type: type,
        //         total_time: totalTime,
        //         distance: distance
        //     })
        // });
        // if (response.ok) {
        //     let data = await response.json()
        //     console.log(data)
        // }
        // console.log(response)
        //------------------PUT ROUTE--------------------------
        // const response = await fetch(`/api/workouts/4`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         user_id: user.id,
        //         title: title,
        //         description: description,
        //         image_url: imageUrl,
        //         type: type,
        //         total_time: totalTime,
        //         distance: distance
        //     })
        // });
        // if (response.ok) {
        //     let data = await response.json()
        //     console.log(data)
        // }
        // console.log(response)
        //--------------------DELETE ROUTE-----------------------------
        // const response = await fetch('/api/workouts/4', {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // if (response.ok) {
        //     let data = await response.json()
        //     console.log(data)
        // }
        // console.log(response)
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
    const updateType = (e) => {
        setType(e.target.value)
    }
    const updateTotalTime = (e) => {
        setTotalTime(e.target.value)
    }
    const updateDistance = (e) => {
        setDistance(e.target.value)
    }

    return (
        <>
            <div>
                <form onSubmit={onSubRoute}
                    action='/api/workouts/'>
                    <div>
                        <label>Title</label>
                        <input
                            name='title'
                            type='text'
                            value={title}
                            onChange={updateTitle}
                        ></input>
                        <label>Description</label>
                        <input
                            name='description'
                            type='text'
                            value={description}
                            onChange={updateDescription}
                        ></input>
                        <label>Image</label>
                        <input
                            name='imageUrl'
                            type='text'
                            value={imageUrl}
                            onChange={updateImageUrl}
                        ></input>
                        <label>Type</label>
                        <input
                            name='type'
                            type='text'
                            value={type}
                            onChange={updateType}
                        ></input>
                        <label>Total Time</label>
                        <input
                            name='totalTime'
                            type='text'
                            value={totalTime}
                            onChange={updateTotalTime}
                        ></input>
                        <label>Distance</label>
                        <input
                            name='distance'
                            type='text'
                            value={distance}
                            onChange={updateDistance}
                        ></input>
                    </div>
                    <button type='submit'>Submit Workout</button>
                </form>
            </div>
        </>
    )
}

export default TempWorkout;
