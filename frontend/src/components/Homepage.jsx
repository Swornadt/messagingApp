import React, { useState, useEffect } from 'react';
import '../App.css';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';
import UserProfile from './UserProfile';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Homepage = () => {
    // State to track the currently visible component (sidebar, message, or profile) for small screens
    const [activeComponent, setActiveComponent] = useState('sidebar');
    const [selectedUser, setSelectedUser] = useState(false);
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const { authUser } = useSelector(store=>store.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authUser) {
          navigate("/login");
        }
      }, [authUser, navigate]);

      
    const showSidebar = () => {
        setActiveComponent('sidebar');
        setIsProfileVisible(false); 
    };

    const showMessageContainer = (user) => {
        setSelectedUser(user);
        setActiveComponent('message');
        setIsProfileVisible(false);
    };

    const showProfile = () => {
        setActiveComponent('profile');
        setIsProfileVisible(true);
    };

    // Toggle profile visibility for large screens
    const toggleProfileVisibility = () => {
        setIsProfileVisible(!isProfileVisible);
        setActiveComponent(isProfileVisible ? 'message' : 'profile');
    };

    if (!authUser) return null;

    return (
        <div className="flex h-screen w-full overflow-hidden rounded-md bg-gray-100">
            {/* Sidebar - only show on small screens when active */}
            <div className={`${activeComponent === 'sidebar' ? 'block' : 'hidden'} sm:block`}>
                <div
                    className={`${
                        isProfileVisible ? 'w-[20vw]' : 'sm:w-[30vw] w-[95vw]'
                    } mx-3 flex-none transition-all duration-300`}
        >
                    <Sidebar
                        toggleProfileVisibility={showProfile}
                        showMessageContainer={showMessageContainer}
                    />
                </div>
            </div>

            {/* Message Container - only show on small screens when active */}
            <div className={`${activeComponent === 'message' ? 'block' : 'hidden'} sm:flex flex-1 px-2`}>
                <div
                    className={`${
                        isProfileVisible ? 'w-[55vw]' : 'sm:w-[67vw] w-[95vw]'
                    } transition-all duration-300`}
                >
                    <div className="h-full">
                        <MessageContainer
                            selectedUser={selectedUser}
                            toggleProfileVisibility={toggleProfileVisibility}
                            showSidebar={showSidebar}
                        />
                    </div>
                </div>
            </div>

            {/* User Profile - only show on small screens when active */}
            <div className={`${activeComponent === 'profile' ? 'block' : 'hidden'} sm:hidden`}>
                <div className="w-screen">
                    <UserProfile toggleProfileVisibility={toggleProfileVisibility} />
                </div>
            </div>

            {/* For large screens, show UserProfile when toggled */}
            {isProfileVisible && (
                <div className="hidden sm:block w-[25vw] transition-all duration-300">
                    <UserProfile toggleProfileVisibility={toggleProfileVisibility} />
                </div>
            )}
        </div>
    );
};

export default Homepage;
