import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, NavLink } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);

    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* <!-- Page content here --> */}
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-48 bg-neutral gap-2 text-white ">
                        {/* <!-- Sidebar content here --> */}
                        <li><NavLink to={''}>Dashboard</NavLink></li>
                        {admin === true && <li><NavLink to={'addTool'}>Add Tool</NavLink></li>}
                        {!admin&&<li><NavLink to={'addReview'}>Add Review</NavLink></li>}
                        {!admin&&<li><NavLink to={'myOrders'}>My Orders</NavLink></li>}
                        <li><NavLink to={'myProfile'}>My Profile</NavLink></li>

                        {admin === true && <li><NavLink to={'manageUsers'}>Manage Users</NavLink></li>}
                        {admin === true && <li><NavLink to={'manageTools'}>Manage Tools</NavLink></li>}
                        {admin === true && <li><NavLink to={'manageOrders'}>Manage All Orders</NavLink></li>}
                        {admin === true && <li><NavLink to={'makeAdmin'}>Make Admin</NavLink></li>}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;