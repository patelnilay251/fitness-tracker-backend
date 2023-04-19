import { request, response } from 'express';
import {
    caloriesPie,
    aggregateData,
    badgeData,
    caloriesConsumed
} from "../services/goalAnalytics-service.js"


const setSuccessfullResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
};

const setErrorResponse = (error, response) => {
    response.status(500);
    response.json({ error: error.message });
}


export const getCaloriesBurnedData = async (request, response) => {
    try {
        const filters = request.body;
        const result = await caloriesPie(filters);
        console.log(result)
        setSuccessfullResponse(result, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
};

export const getAggregateData = async (request, response) => {
    try {
        const filters = request.body;
        const result = await aggregateData(filters);
        console.log(result)
        setSuccessfullResponse(result, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
};


export const getBadgeData = async (request, response) => {
    try {
        const filters = request.body;
        const result = await badgeData(filters[""]);
        console.log(result)
        setSuccessfullResponse(result, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
};

export const getCalorieConsumed = async (request, response) => {
    try {
        const filters = request.body;
        const result = await caloriesConsumed(filters);
        console.log(result)
        setSuccessfullResponse(result, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
};


export const sample = async (request, response) => {
    try {
        const filters = request.body;
        const result = { "name": "Hello" };
        setSuccessfullResponse(result, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
};