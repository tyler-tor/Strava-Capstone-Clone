import React, { useState } from 'react'
// import { useSelector } from 'react-redux'


const TempRoute = () => {
    // const user = useSelector(state => state.session.user)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [startingPoint, setStartingPoint] = useState('')
    const [endingPoint, setEndingPoint] = useState('')
    const [distance, setDistance] = useState('')

    const onSubRoute = async (e) => {
        e.preventDefault();
        //-------------------POST ROUTE---------------------------
        // const response = await fetch('/api/routes/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         user_id: user.id,
        //         title: title,
        //         description: description,
        //         image_url: imageUrl,
        //         starting_point: startingPoint,
        //         ending_point: endingPoint,
        //         distance: distance
        //     })
        // });
        // if (response.ok) {
        //     let data = await response.json()
        //     console.log(data)
        // }
        // console.log(response)
        //------------------PUT ROUTE--------------------------
        // const response = await fetch(`/api/routes/1`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         title: title,
        //         description: description,
        //         image_url: imageUrl,
        //         starting_point: startingPoint,
        //         ending_point: endingPoint,
        //         distance: distance
        //     })
        // });
        // if (response.ok) {
        //     let data = await response.json()
        //     console.log(data)
        // }
        // console.log(response)
        //--------------------DELETE ROUTE-----------------------------
        const response = await fetch('/api/routes/5', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            let data = await response.json()
        }
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
                <form onSubmit={onSubRoute}
                    action='/api/routes/'>
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
                        <label>Starting Point</label>
                        <input
                            name='startingPoint'
                            type='text'
                            value={startingPoint}
                            onChange={updateStartingPoint}
                        ></input>
                        <label>Ending Point</label>
                        <input
                            name='endingPoint'
                            type='text'
                            value={endingPoint}
                            onChange={updateEndingPoint}
                        ></input>
                        <label>Distance</label>
                        <input
                            name='distance'
                            type='text'
                            value={distance}
                            onChange={updateDistance}
                        ></input>
                    </div>
                    <button type='submit'>Submit Route</button>
                </form>
            </div>
        </>
    )
}

export default TempRoute;
