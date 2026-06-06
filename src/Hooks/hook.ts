import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import '@ant-design/v5-patch-for-react-19';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';


export const AdminComponent = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAppSelector(state => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector);