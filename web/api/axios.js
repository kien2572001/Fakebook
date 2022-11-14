import axios from "axios";

export default axios.create({
    baseURL: 'http://project.localhost:8000/api',
});