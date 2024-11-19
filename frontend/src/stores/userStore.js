import {create} from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
    user: null,
    userLoading: false,
    likeLoading: false,
    userError: null,
    likeError: null,
    userSuccess: false,
    userMessage: null,
    updatedMessage: null,

    register: async (data) => {
        set({userLoading: true, userError: null});
        try{
            const response = await axios.post('http://localhost:3000/api/user/register', data, {
                method: 'post',
                withCredentials: true,
            });
            set(() => ({user: response.data, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.message, userLoading: false});
        }
    },

    login: async (data) => {
        set({userLoading: true, userError: null});
        try{
            const response = await axios.post('http://localhost:3000/api/user/login', data, {
                method: 'post',
                withCredentials: true,
            });
            set(() => ({user: response.data, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.message, userLoading: false});
        }
    },

    getUserById: async (id) => {
        set({userLoading: true, userError: null});
        try{
            const response = await axios.get(`http://localhost:3000/api/user/profile/${id}`);
            set(() => ({user: response.data.user, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.message, userLoading: false});
        }
    },

    toggleMessageLike: async (id) => {
        set(() => ({likeLoading: true, likeError: null}));
        try{
            const response = await axios.patch(`http://localhost:3000/api/message/like/${id}`,null, {
                method: "patch",
                withCredentials: true,
            });
            set(() => ({updatedMessage: response.data, likeLoading: false, success: true}));
        }catch(error){
            set({likeError: error.message, likeLoading: false});
        }
    },

    userLogout: async () => {
        set({userLoading: true, userError: null});
        try{
            const response = await axios.post('http://localhost:3000/api/user/logout', null, {
                method: 'post',
                withCredentials: true,
            });
            set(() => ({user: response.data, userLoading: false, userSuccess: true}));
        }catch(error){
            set({userError: error.message, userLoading: false});
        }
    }
}));