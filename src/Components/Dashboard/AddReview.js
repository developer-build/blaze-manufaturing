import React from 'react';
import { toast } from 'react-toastify';
import auth from './../../firebase.init';
import {useAuthState} from 'react-firebase-hooks/auth';
import useAdmin from '../../hooks/useAdmin';
import { useNavigate } from 'react-router-dom';

const AddReview = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const navigate = useNavigate();

    if(admin){
        return navigate('/dashboard');
    }

    const handleAddReview = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const rating = e.target.rating.value;
        const description = e.target.description.value;
        const review = { name, rating, description };

        if((!name || !rating) || !description){
            return toast.error('Please enter valid info!')
        }

        fetch('https://blaze-manufacturing.herokuapp.com/reviews', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    toast.success('Successfully added your review!')
                }
                e.target.reset();
            })
    }

    return (
        <div className='w-full p-5 lg:p-0'>
            <form onSubmit={handleAddReview} className='py-8 lg:w-1/2 w-full flex flex-col gap-3 mx-auto'>
                <h1 className="text-3xl font-bold pt-3 text-primary">Add a review</h1>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="name">Your Name</label>
                    <input type="text" name="name" placeholder='Your name' className='p-2 rounded-lg border outline-purple-200' />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="rating">Your rating</label>
                    <input type="number" max={5} min={1} name='rating' placeholder='Your rating' className='p-2 rounded-lg border outline-purple-200' />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="description">Your review</label>
                    <textarea rows={3} name='description' placeholder='Your description' className='p-2 rounded-lg border outline-purple-200 resize-none' />
                </div>

                <input type="submit" className='btn btn-primary' value="Add Review" />
            </form>
        </div>
    );
};

export default AddReview;