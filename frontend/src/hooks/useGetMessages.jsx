import { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import { MSG_API_ENDPOINT } from '../../utils/constant';
const UseGetMessages = () => {
    const {selectedUser} = useSelector(store=>store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${MSG_API_ENDPOINT}/${selectedUser?._id}`);
                //console.log(res);
                dispatch(setMessages(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
    },[selectedUser])
}

export default UseGetMessages;
