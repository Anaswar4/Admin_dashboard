import axios from "axios"

const API = axios.create({baseURL:"http://localhost:5000"});
const getToken = ()=>localStorage.getItem('token');

API.interceptors.request.use(
    (config)=>{
        const token = getToken();
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error)=>Promise.reject(error)
);

API.interceptors.request.use(
    (response)=>response,
    (error)=>{
        if(error.response && error.response.status==401){
            localStorage.removeItem('token');
            window.location.href='/login'
        }
        return Promise.reject(error);
    }
)

export const login = async (identifier, password) => {
  try {
    const { data } = await API.post("/login", { identifier, password });
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else {
      throw new Error("Server not reachable");
    }
  }
};

export const getDashboard = async () => {
  try {
    const { data } = await API.get("/dashboard");
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};


export const isAuthenticated = () => {
  return !!getToken();
};

export default API;