import axios from "axios";

const Axios = axios.create({
    baseURL: "http://localhost:5000/api",  // axios connect garcha yesley
});

export default Axios;