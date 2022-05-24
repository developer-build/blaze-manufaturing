import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth';
import auth from './../firebase.init';
import Loader from './Loader';

const RequireAdmin = ({children}) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
 
    if(loading){
        return <Loader/>
    }

    if(!user?.role==='admin'){
        return <Navigate to='/login' state={{from:location}} replace />
    }

    return children;
};
 
export default RequireAdmin;