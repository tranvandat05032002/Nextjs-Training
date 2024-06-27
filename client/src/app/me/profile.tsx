'use client'
import React from "react";
import { useAppContext } from "../AppProvider";
import envConfig from "@/config";

const Profile = () => {
    const { sessionToken } = useAppContext()
    const [user, setUser] = React.useState({
        name: '',
        email: ''
    })
    React.useEffect(() => {
        const fetchProfile = async () => {
            const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}`
                }
            }).then(async (res) => {
                const payload = await res.json()
                const data = {
                    status: res.status,
                    payload
                }
                if (!res.ok) {
                    throw data
                }
                return data

            });
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