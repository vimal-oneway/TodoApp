import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { logoutUser } from "../state/action/user.action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state";

type Props = {};
function Navbar(props: Props) {
    const { error, user } = useSelector((state: RootState) => {
        return state?.userState;
    });
    const [isUser, setIsUser] = useState<boolean>(false);   


    const dispatch = useDispatch();
    const handleLogin = () => {
        window.open(`${import.meta.env.VITE_REACT_SER_URL}/api/v1/google`, "_self")
    };
    const handleLogout = () => {
        logoutUser(dispatch);
    };


    const LoginBtn = ()=> {
        return (
            user ? (
                <button className="btn" onClick={handleLogout}>
                    Logout
                </button>
            ) : (
                <button className="btn" onClick={handleLogin}>
                    Login
                </button>
            )
        )
    }

    useEffect(() => {
        user?._id ?
            setIsUser((prev) => (prev = true)) :
            setIsUser((prev) => (prev = false))
    },[user, isUser])


    return (
        <header className="w-[100%] py-2 px-10 flex items-center justify-between bg-[#6366f1]">
            <div className="logo">
                <Typography>TODO's</Typography>
            </div>
            <nav>
                <LoginBtn/>
            </nav>
        </header>
    );
}

export default Navbar;
