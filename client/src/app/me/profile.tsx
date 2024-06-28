'use client'
import React from "react";
import accountApiRequest from "@/apiRequest/account";
import { clientSessionToken } from "@/lib/http";

const Profile = () => {
    const [user, setUser] = React.useState({
        name: '',
        email: ''
    })
    React.useEffect(() => {
        const fetchProfile = async () => {
            const result = await accountApiRequest.meClient()
            setUser(result?.payload?.data);
        }
        fetchProfile();
    }, [])
    return (
        <div>
            Profile fetch next client:
            <div>Account: {user?.name}</div>
            <div>Email: {user?.email}</div>
        </div>
    );
};

export default Profile;