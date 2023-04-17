import { request, response } from 'express';
import {
    save,
    get,
    remove,
    update,
    search, 
    searchByEmail,
    activitySearch
 } from "../services/workout-service.js"
 

const setSuccessfullResponse=(obj,response)=>{
    response.status(200);
    response.json(obj);
};

const setErrorResponse=(error,response)=>{
    response.status(500);
    response.json({error: error.message});
}


export const post = async (request, response) => {
    try {
      const newWorkout = request.body;
      const savedWorkout = await save(newWorkout);
      setSuccessfullResponse(savedWorkout, response);
    } catch (error) {
      setErrorResponse(error, response);
    }
};
  
export const index = async(request,response)=>{
    try {
      const params = {};
      const workouts = await search(params);
      setSuccessfullResponse(workouts, response);
    } catch (error) {
      setErrorResponse(error, response);
    }
};
  
export const findbyId = async(request,response)=>{
    try {
      const id = request.params.id;
      const workout = await get(id);
      setSuccessfullResponse(workout, response);
    } catch (error) {
      setErrorResponse(error, response);
    }
}

export const findbyEmail = async(request,response)=>{
  try {
    const email = request.params.email;
    const workout = await searchByEmail(email);
    setSuccessfullResponse(workout, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
}

export const findActivitybyEmail = async(request,response)=>{
  try {
    const email = request.params.email;
    const name=request.params.name;

    const workout = await activitySearch(email,name);
    setSuccessfullResponse(workout, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
}

  
export const put = async(request,response)=>{
    try {
      const id = request.params.id;
      const updateWorkout = request.body;
      const updatedWorkout = await update(id, updateWorkout);
      setSuccessfullResponse(updatedWorkout, response);
    } catch (error) {
      setErrorResponse(error, response);
    }
}
  
export const deletebyid = async(request,response)=>{
    try {
      const id = request.params.id;
      const deletedWorkout = await remove(id);
      setSuccessfullResponse(deletedWorkout, response);
    } catch (error) {
      setErrorResponse(error, response);
    }
}
  
  