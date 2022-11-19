// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'


// const TempFriends = () => {
//     const user = useSelector(state => state.session.user)

//     const [body, setBody] = useState('')

//     const onSubRoute = async (e) => {
//         e.preventDefault();
        //-------------------POST ROUTE ROUTES ---------------------------
        // const response = await fetch('/api/routes/1/comments', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         user_id: user.id,
        //         body: body
        //     })
        // });
        // if (response.ok) {
        //     let data = await response.json()
        //     console.log(data)
        // }
        // console.log(response)
        //-------------------POST ROUTE WORKOUTS ---------------------------
        // const response = await fetch('/api/workouts/1/comments', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         user_id: user.id,
        //         body: body
        //     })
        // });
        // if (response.ok) {
        //     let data = await response.json()
        //     console.log(data)
        // }
        // console.log(response)
        //------------------PUT ROUTE--------------------------
        // const response = await fetch(`/api/comments/4`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         user_id: user.id,
        //         body: body
        //     })
        // });
        // if (response.ok) {
        //     let data = await response.json()
        //     console.log(data)
        // }
        // console.log(response)
        //--------------------DELETE ROUTE-----------------------------
        // const response = await fetch('/api/comments/4', {
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
//     };

//     const updateBody = (e) => {
//         setBody(e.target.value)
//     }


//     return (
//         <>
//             <div>
//                 <form onSubmit={onSubRoute}
//                     action='/api/workouts/'>
//                     <div>
//                         <label>Comment</label>
//                         <input
//                             name='body'
//                             type='text'
//                             value={body}
//                             onChange={updateBody}
//                         ></input>
//                     </div>
//                     <button type='submit'>Submit Comment</button>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default TempFriends;
