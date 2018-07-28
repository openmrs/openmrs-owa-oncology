import axios from 'axios';


const contextPath = 'https://humci-azure.pih-emr.org/mirebalais'; 
const apiBaseUrl = `${contextPath}/ws/rest/v1`;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    accept: 'application/json',
  },
});

export default axiosInstance;
