import axios from "axios";
const BASE_URL = "http://localhost:5000/api/";
const getAuth = () =>{
    return `Bearer ${localStorage.getItem('fundoo-token')}`;
};
export const createUser = async(payload) => {
    const res = await axios.post((BASE_URL) +'/users', payload);
    return res;
}

export const LoginApi = async(payload) => {
    const res = await axios.post(BASE_URL+"/users/login", payload);
    return res;   
};

export const ForgetPwdApi = async(payload) => {
    const res = await axios.post(BASE_URL+"/users/forget_pwd", payload);
    return res;
}

export const ResetPwdApi = async(payload) => {
    const res = await axios.post(BASE_URL+'/users/reset_pwd', payload);
    return res;
}


export const createNoteApi = async(payload) => {
    return await axios.post(BASE_URL+'/notes/', payload, {
        headers: {
            Authorization: getAuth()
        }
    });
};


export const getAllNotesApi = async() => {
    return await axios.get(BASE_URL+'/notes/allNotes', {
        headers: {
            Authorization: getAuth()
        }
    });
};


export const getNoteByIdApi = async(id) => {
    return await axios.get(`${BASE_URL}/notes/findNote/${id}`, {
        headers: {
            Authorization: getAuth()
        }
    });
};

export const updateNoteByIdApi = async(id, payload) => {
    return await axios.put(`${BASE_URL}/notes/updateNote/${id}`, payload, {
        headers: {
            Authorization: getAuth()
        }
    });
};


export const delNoteByIdApi = async(id) => {
    return await axios.delete(`${BASE_URL}/notes/delNote/${id}`, {
        headers: {
            Authorization: getAuth()
        }
    });
};

export const archiveNotesByIdApi = async(id) => {
    return await axios.put(`${BASE_URL}/notes/isArchive/${id}`, {}, {
        headers: {
            Authorization: getAuth()
        }   
    });
};


export const trashNotesApiById = async(id, payload) => {
    return await axios.put(`${BASE_URL}/notes/isTrash/${id}`, payload, {
        headers: {
            Authorization: getAuth()
        }
    });
};

// 101945761839
//41298228146