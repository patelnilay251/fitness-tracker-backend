import { request, response } from 'express';
import {
    save,
    get,
    remove,
    update,
    search
} from "../services/user-service.js"


const setSuccessfullResponse = (obj, response) => {
    if (obj.length == 0) {
        response.status(404);
    }
    else {
        response.status(200)
    }
    response.json(obj);
};

const setErrorResponse = (error, response) => {
    response.status(500);
    response.json({ error: error.message });
}


export const post = async (request, response) => {
    try {
        const newUser = request.body;
        const savedUser = await save(newUser);
        setSuccessfullResponse(savedUser, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
};

export const index = async (request, response) => {
    try {
        const params = request.query;
        console.log(params)
        const users = await search(params);
        setSuccessfullResponse(users, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
};

export const findbyId = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await get(id);
        setSuccessfullResponse(user, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}

export const put = async (request, response) => {
    try {
        const id = request.params.id;
        const updateUser = request.body;
        const updatedUser = await update(id, updateUser);
        setSuccessfullResponse(updatedUser, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}

export const deletebyid = async (request, response) => {
    try {
        const id = request.params.id;
        const deletedUser = await remove(id);
        setSuccessfullResponse(deletedUser, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}