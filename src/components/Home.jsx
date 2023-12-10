import React, { useEffect, useRef, useState } from 'react'
import Update from './update';
import axios from 'axios'
import { Icon } from '@iconify/react';
function Home() {
    const [task, settask] = useState([])
    const [complated, setComplated] = useState()
    const [show, setShow] = useState(false);
    const [selected, setSselected] = useState()

    const title = useRef()
    const description = useRef()

    const showupdate = (data) => {
        setShow(true)
        setSselected(data)
    }
    const onClose = () => {
        setShow(false)
        window.location.reload()
    }
    const handleDelete = (data) => {
        const userResponse = window.confirm('Are you sure you want to delete this item?');
        if (userResponse) {
            axios.delete(`http://localhost:5000/${data?.ID}`)
                .then(res => {
                    window.location.reload()
                })
                .catch(err => console.log(err))
        }
    }

    const handleAdd = () => {
        const data = {
            Title: title.current.value,
            Description: description.current.value
        }
        handlesubmit(data)
    }
    const handlesubmit = (data) => {
        axios.post('http://localhost:5000/Task', data)
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.log(err))

    }
    const complateTask = (data) => {
        const forrmData = {
            ischecked: !data.isCompleted
        }
        axios.put(`http://localhost:5000/item/${data?.ID}`, forrmData)
            .then(res => {
                window.location.reload()

            }).catch(err => console.log(err))
    }
    useEffect(() => {
        axios.get(`http://localhost:5000`)
            .then(res => {
                settask(res.data.tasks)
            })


        axios.get(`http://localhost:5000/complated`)
            .then(res => {
                setComplated(res.data.tasks)
            })

    }, [])
    return (
        <div className="fdiv">
            <Update show={show} onClose={onClose} task={selected} />
            <div className="sdiv">
                <div className="indiv">
                    <h3>Add new task</h3>
                    <input ref={title} required type="text" placeholder="Title" />
                    <textarea ref={description} placeholder="Description" required></textarea>
                    <button onClick={handleAdd}>ADD</button>
                </div>
                <div className="todiv">
                    <table>
                        <caption>Tasks in progress</caption>
                        <thead>
                            <tr className="thtr">
                                <th className="th">Title</th>
                                <th className="th">Description</th>
                                <th className="th">Update</th>
                                <th className="th">Delete</th>
                                <th className="th">complate</th>
                            </tr>
                        </thead>
                        <tbody id="toTbody">
                            {task?.map((tasklist) => (
                                <tr key={tasklist?.id} className="tbcontaint">
                                    <td className="th">{tasklist?.Title}</td>
                                    <td className="th">{tasklist?.Description}</td>
                                    <td className="th"><Icon icon="fe:edit" onClick={() => showupdate(tasklist)} className='icon' /></td>
                                    <td className="th"><Icon icon="fluent:delete-48-filled" onClick={() => handleDelete(tasklist)} className='icon' /></td>
                                    <td className="th"><Icon onClick={() => complateTask(tasklist)} icon="fluent:checkbox-unchecked-12-regular" className='icon' /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="codiv">
                <table>
                    <caption>Complated task</caption>
                    <thead>
                        <tr className="thtr">
                            <th className="th">Title</th>
                            <th className="th">Description</th>
                            <th className="th">Update</th>
                            <th className="th">Delete</th>
                            <th className="th">complated</th>
                        </tr>
                    </thead>
                    <tbody className="" id="coplateTbody">
                        {complated?.map((tasklist) => (
                            <tr key={tasklist?.id} className="tbcontaint">
                                <td className="th">{tasklist?.Title}</td>
                                <td className="th">{tasklist?.Description}</td>
                                <td className="th"><Icon icon="fe:edit" onClick={() => showupdate(tasklist)} className='icon' /></td>
                                <td className="th"><Icon icon="fluent:delete-48-filled" onClick={() => handleDelete(tasklist)} className='icon' /></td>
                                <td className="th"><Icon onClick={() => complateTask(tasklist)} icon="raphael:checked" className='icon' /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home