import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [modalId, setModalId] = useState('');
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    //fetching and setting users
    useEffect(() => {
        fetch('https://blaze-manufacturing.herokuapp.com/users', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        ).then(res => {
            if (res.status === 401 || res.status === 403) {
                navigate('/login');
            }
            return res.json();
        })
            .then(data => setUsers(data))
    }, [users, user, navigate]);

    //handling delete
    const handleDelete = id => {
        fetch(`https://blaze-manufacturing.herokuapp.com/users/${id}`, {
            method: 'DELETE',
            headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        })
            .then(res => res.json())
            .then(data => {
                if (data?.upsertedId) {
                    toast.success('Successfully cancelled order!')
                }
            })
    }

    const modal = <>
        <input type="checkbox" id="confirm-modal" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Delete user?</h3>
                <p className="py-4">Remember once deleted, you can't get it back</p>
                <div className="modal-action">
                    <label htmlFor="confirm-modal" onClick={() => handleDelete(modalId)} className='btn btn-error modal-button'>
                        Delete
                    </label>
                    <label htmlFor="confirm-modal" className="btn">Close</label>
                </div>
            </div>
        </div></>

    return (
        <div className='justify-center h-screen mt-auto flex overflow-auto items-center'>
            <div className="flex justify-center items-center">
                {modal}
                {users.length > 0 ?
                    <table className="table border my-auto">
                        {/* <!-- table head --> */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <!--table row --> */}
                            {
                                users?.length > 0 &&
                                users?.map((user, index) =>
                                    <tr key={user?._id}>
                                        <th className='lg:pl-2 pl-60'>{index + 1}</th>
                                        <td className=''>{user?.name ? user.name : 'Not set'}</td>
                                        <td>{user?.email}</td>
                                        <td>{user?.role ? user.role : 'user'}</td>
                                        <td>
                                            {
                                                (!user?.paid) &&
                                                // {/* <!-- The button to open modal --> */}
                                                <label htmlFor="confirm-modal" onClick={() => setModalId(user?._id)} className="btn modal-button btn-sm btn-primary"><i className="fa-solid fa-trash-can"></i></label>
                                            }
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table> : <p className='text-2xl'>No Users</p>
                }
            </div>
        </div >
    );
};

export default ManageUsers;