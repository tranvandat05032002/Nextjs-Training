'use client'
import React from "react";
import { useAppContext } from "../AppProvider";
import envConfig from "@/config";
import accountApiRequest from "@/apiRequest/account";

const Profile = () => {
    const { sessionToken } = useAppContext()
    const [user, setUser] = React.useState({
        name: '',
        email: ''
    })
    React.useEffect(() => {
        const fetchProfile = async () => {
            const result = await accountApiRequest.me(sessionToken)
            setUser(result?.payload?.data);
        }
        fetchProfile();
    }, [sessionToken])
    return (
        <div>
            Profile fetch next client:
            <div>Account: {user?.name}</div>
            <div>Email: {user?.email}</div>
        </div>
    );
};

export default Profile;