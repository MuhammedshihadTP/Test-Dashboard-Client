
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_URL; 
const token =  localStorage.getItem('token');

const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    "token":token
  },
});




export const login = async (endpoint:string, data:any) => {
  try {
    console.log(endpoint + data,"created");
    const response = await apiService.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const fetchRoles = async (endpoint:string) => {
  try {
    const response = await apiService.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Example function to make a POST request
export const createUser = async (endpoint:string, data:any) => {
  try {
    console.log(endpoint + data,"created");
    const response = await apiService.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};


export const ListUsers = async (endpoint:string) => {
  try {
    console.log(endpoint  );
    const response = await apiService.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const updateUser = async (endpoint:string, data:any) => {
  try {
    console.log(endpoint + data,"created");
    const response = await apiService.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};


export const createRole = async (endpoint:string, data:any) => {
  try {
    console.log(endpoint + data,"created");
    const response = await apiService.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
// You can add more functions for different HTTP methods as needed
