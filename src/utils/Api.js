import axios from "axios";
const BASE_URL_USER = "http://localhost:5000/api/users";
const BASE_URL_NOTES = "http://localhost:5000/api/notes/";
const getAuth = () =>{
    return `Bearer ${localStorage.getItem('fundoo-token')}`;
};

export const createUser = async(payload) => {
    const res = await axios.post(`${BASE_URL_USER}/`, payload);
    return res;
}

export const LoginApi = async(endpoint, payload) => {
    const res = await axios.post(`${BASE_URL_USER}/${endpoint}`, payload);
    return res;   
};

export const ForgetPwdApi = async(endpoint, payload) => {
    const res = await axios.post(`${BASE_URL_USER}/${endpoint}`, payload);
    return res;
}

export const ResetPwdApi = async(payload) => {
    const res = await axios.post(`${BASE_URL_USER}/`, payload);
    return res;
}


export const createNoteApi = async(payload) => {
    return await axios.post(`${BASE_URL_NOTES}/`, payload, {
        headers: {
            Authorization: getAuth()
        }
    });
};


export const getAllNotesApi = async(endpoint) => {
    return await axios.get(`${BASE_URL_NOTES}/${endpoint}`, {
        headers: {
            Authorization: getAuth()
        }
    });
};


export const getNoteByIdApi = async(endpoint) => {
    return await axios.get(`${BASE_URL_NOTES}/${endpoint}`, {
        headers: {
            Authorization: getAuth()
        }
    });
};

export const updateNoteByIdApi = async(endpoint, payload) => {
    return await axios.put(`${BASE_URL_NOTES}/${endpoint}`, payload, {
        headers: {
            Authorization: getAuth()
        }
    });
};


export const delNoteByIdApi = async(endpoint) => {
    return await axios.delete(`${BASE_URL_NOTES}/${endpoint}`, {
        headers: {
            Authorization: getAuth()
        }
    });
};

export const archiveNotesByIdApi = async(endpoint) => {
    return await axios.put(`${BASE_URL_NOTES}/${endpoint}`, {}, {
        headers: {
            Authorization: getAuth()
        }   
    });
};


export const trashNotesApiById = async(endpoint) => {
    return await axios.put(`${BASE_URL_NOTES}/${endpoint}`, {}, {
        headers: {
            Authorization: getAuth()
        }
    });
};

// 101945761839
//41298228146