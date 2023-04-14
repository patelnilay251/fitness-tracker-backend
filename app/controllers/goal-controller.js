import { request, response } from 'express';
import {
    save,
    get,
    remove,
    update,
    search 
 } from "../services/goal-service.js"
 

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
      const newGoal = request.body;
      const savedGoal = await save(newGoal);
      setSuccessfullResponse(savedGoal, response);
    } catch (error) {
      setErrorResponse(error, response);
    }
};
  
export const index = async(request,response)=>{
    try {
      const params = {};
      const goals = await search(params);
      setSuccessfullResponse(goals, response);
    } catch (error) {
      setErrorResponse(error, response);
    }
};
  
export const findbyId = async(request,response)=>{
    try {
      const id = request.params.id;
      const goal = await get(id);
      setSuccessfullResponse(goal, response);
    } catch (error) {
      setErrorResponse(error, response);
    }
}
  
export const put = async(request,response)=>{
    try {
      const id = request.params.id;
      const updateGoal = request.body;
      const updatedGoal = await update(id, updateGoal);
      setSuccessfullResponse(updatedGoal, response);
    } catch (error) {
      setErrorResponse(error, response);
    }
}
  
export const deletebyid = async(request,response)=>{
    try {
      const id = request.params.id;
      const deletedGoal = await remove(id);
      setSuccessfullResponse(deletedGoal, response);
    } catch (error) {
      setErrorResponse(error, response);
    }
}
