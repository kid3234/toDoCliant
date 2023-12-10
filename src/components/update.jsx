import  axios  from 'axios';
import React, { useRef, useState } from 'react'

function Update({ show, onClose,task }) {
    const [data,setData] = useState()
    const title = useRef()
    const description = useRef()

    const handleChange =()=>{
        setData({Title: title.current.value, Description: description.current.value})
    }

    const handleUpdate =()=>{
          axios.put(`http://localhost:5000/${task?.ID}`,data)
          .then(res =>{
            window.location.reload()
          }).catch(err=> console.log(err))
          
    }
    return (
        <>
            {show && (<div className='updiv'>
                <div className='nextdiv'>
                    <h1>Update Task</h1>
                    <div  className='updateform'>
                        <div className='upindiv'>
                            <label>Title</label>
                            <input onChange={handleChange} ref={title} className='tin' type="text" defaultValue={task?.Title} />
                        </div>
                        <div className='upindiv'>
                            <label>Description</label>
                            <textarea onChange={handleChange} ref={description} className='tarea' defaultValue={task?.Description} ></textarea>
                        </div>
                        <div className='upbtn'>
                            <button className='cbtn' onClick={onClose}>cancel</button>
                            <button className='sbtn' onClick={()=>handleUpdate()}>Save</button>
                        </div>
                    </div>
                </div>

            </div>)}
        </>
    )
}

export default Update