import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import MainPanel from '../components/MainPanel';
import Sidebar from '../components/Sidebar';
import '../styles/Home.css';


function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    return (
        <div className="home-layout">
            <Sidebar />
            <MainPanel loggedInUser={loggedInUser} />
            <ToastContainer />
        </div>
    );
}

export default Home;
