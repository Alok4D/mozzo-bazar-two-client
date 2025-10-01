import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://mozzo-bazar-two-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;