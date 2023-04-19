import Goal from '../models/goal.js'
import Workout from '../models/workout.js';
import Meal from '../models/meal.js';


const aggregateBy = async (filters, aggregateFields) => {

    let aggregateQuery = {}
    let project = {}

    const aggregateFieldsList = aggregateFields['aggregateBy']
    if (aggregateFieldsList.includes("exercise")) {
        aggregateQuery['exercise'] = "$exercises"

    }
    if (aggregateFieldsList.includes("year")) {
        aggregateQuery['year'] = { "$year": "$date" }
        project = { $dateToString: { format: "%Y", date: "$date" } }
    }

    if (aggregateFieldsList.includes("month")) {
        aggregateQuery['month'] = { "$month": "$date" }
        aggregateQuery['year'] = { "$year": "$date" }
        project = { $dateToString: { format: "%m-%Y", date: "$date" } }
    }
    if (aggregateFieldsList.includes("day")) {
        aggregateQuery['date'] = "$date"
        project = { $dateToString: { format: "%d-%m-%Y", date: "$date" } }

        // aggregateQuery['year'] = { "$year": "$date" }
        // aggregateQuery['day'] = { "$dayOfMonth": "$date" }
        // project = { "$concat": [{ "$toString": "$_id.day" }, "/", { "$toString": "$_id.month" }, "/", { "$toString": "$_id.year" }] }
    }

    let projectFields = {}

    if (aggregateFieldsList.includes("day") || aggregateFieldsList.includes("month") || aggregateFieldsList.includes("year")) {
        projectFields = {
            "date": project,
            "calories": 1
        }
    }
    else {
        projectFields = {
            "calories": 1
        }
    }
    const query = [
        {
            "$unwind": "$exercises"
        },
        {
            "$lookup": {
                "from": "exercise",
                "localField": "exercises",
                "foreignField": "name",
                "as": "exerciseCalorie"
            }
        },
        {
            "$match": filters
        },
        {
            "$unwind": "$exerciseCalorie"
        },

        {
            "$group": {
                "_id": aggregateQuery,
                "calories": { "$sum": "$exerciseCalorie.caloriesBurned" },
                "date": { "$first": "$date" }
            }
        },
        {
            "$sort": aggregateFieldsList.includes("day") || aggregateFieldsList.includes("month") || aggregateFieldsList.includes("year") ? { "date": 1 } : { "_id.exercise": 1 }
        },
        {
            "$project": projectFields
        }
    ]

    console.log(query)
    const res = await Workout.aggregate(query).allowDiskUse(true).exec();

    return res
}

const aggregateByMeal = async (aggregateFieldsList, filters) => {

    let aggregateQuery = {}
    let project = {}


    if (aggregateFieldsList.includes("meal")) {
        aggregateQuery['_id'] = { "meal": "$name" }
    }

    else {
        aggregateQuery['_id'] = "1"
    }


    const query = [
        {
            "$unwind": "$foods"
        },
        {
            "$lookup": {
                "from": "foods",
                "localField": "foods",
                "foreignField": "name",
                "as": "foodCalorie"
            }
        },
        {
            "$match": filters
        },
        {
            "$unwind": "$foodCalorie"
        },

        {
            "$group": {
                ...aggregateQuery,
                "protein": { "$sum": "$foodCalorie.protein" },
                "carbs": { "$sum": "$foodCalorie.carbs" },
                "fat": { "$sum": "$foodCalorie.fat" },
                "totalCalories": { "$sum": "$foodCalorie.calories" }
            }
        }
    ]

    console.log(JSON.stringify(query))

    const res = await Meal.aggregate(query).allowDiskUse(true).exec();

    console.log(res)
    return res
}


export const caloriesPie = async (filters) => {

    const result = Workout.aggregate([
        {
            "$unwind": "$exercises"
        },
        {
            "$lookup": {
                "from": "exercise",
                "localField": "exercises",
                "foreignField": "name",
                "as": "exerciseCalorie"
            }
        },
        {
            "$match": filters
        },
        {
            "$unwind": "$exerciseCalorie"
        },

        {
            "$group": {
                "_id": "$exercises",
                "calories": { "$sum": "$exerciseCalorie.caloriesBurned" }
            }
        }
    ]).allowDiskUse(true).exec()

    return result;
};

export const aggregateData = async (filters) => {
    const queryFilter = await generateFilter(filters)

    console.log(queryFilter)

    let keys = []
    let values = []
    let aggregateResult = {}

    const agg = filters['aggregateBy']
    if (agg.includes("day") || agg.includes("month") || agg.includes("year")) {
        aggregateResult = await aggregateBy(queryFilter, filters)
        for (var i = 0; i < aggregateResult.length; i++) {
            // console.log(aggregateResult[i])
            if (!(aggregateResult[i] == undefined)) {
                keys.push(aggregateResult[i]["date"])
                values.push(aggregateResult[i]["calories"])
            }
        }
    }
    else {
        aggregateResult = await aggregateBy(queryFilter, filters)
        for (var i = 0; i < aggregateResult.length; i++) {
            if (!(aggregateResult[i] == undefined)) {
                keys.push(aggregateResult[i]["_id"]["exercise"])
                values.push(aggregateResult[i]["calories"])
            }
        }
    }

    let res = {}

    res["keys"] = keys
    res["values"] = values

    return res;

}

export const badgeData = async (username) => {
    var today = new Date();
    var priorDate = new Date(new Date().setDate(today.getDate() - 30));

    const filter = {
        "date": { "$gte": priorDate },
        "name": username["name"]
    }

    const query = [
        {
            "$unwind": "$exercises"
        },
        {
            "$lookup": {
                "from": "exercise",
                "localField": "exercises",
                "foreignField": "name",
                "as": "exerciseCalorie"
            }
        },
        {
            "$match": filter
        },
        {
            "$unwind": "$exerciseCalorie"
        },
        {
            "$group": {
                "_id": 1,
                "calories": { "$sum": "$exerciseCalorie.caloriesBurned" }
            }
        }
    ]


    const res = await Workout.aggregate(query).allowDiskUse(true).exec();
    let badgeJson = { "last30Days": false }

    try {
        if (res[0]["calories"] > 1000) {
            badgeJson["last30Days"] = true
        }
    }
    catch {
        return badgeJson
    }
    return badgeJson
}


export const caloriesConsumed = async (requestBody) => {
    // const queryFilter = await generateFilter(filters)


    let keys = []
    let values = []
    let aggregateResult = {}

    const filters = requestBody['filters']
    const agg = requestBody['aggregateBy']

    aggregateResult = await aggregateByMeal(agg, filters)

    console.log(aggregateResult)

    let res = {}

    let proteinSeries = []
    let carbSeries = []
    let fatSeries = []
    let calories = []
    let mealNames = []

    for (let i = 0; i < aggregateResult.length; i++) {
        proteinSeries.push(aggregateResult[i]['protein'])
        carbSeries.push(aggregateResult[i]['carbs'])
        fatSeries.push(aggregateResult[i]['fat'])
        calories.push(aggregateResult[i]['totalCalories'])
        if (aggregateResult[i]['_id'].hasOwnProperty('meal')) {
            mealNames.push(aggregateResult[i]['_id']['meal'])
        }
    }

    let data = []

    // res["keys"] = mealNames
    res["proteinSeries"] = proteinSeries
    res["carbSeries"] = carbSeries
    res["fatSeries"] = fatSeries
    res["calories"] = calories

    const _keys = Object.keys(res);

    for (let i = 0; i < _keys.length; i++) {
        const a = {}
        a["name"] = _keys[i]
        a["data"] = res[_keys[i]]
        data.push(a)
    }


    let response = {}
    response["data"] = data
    response["keys"] = mealNames
    return response;
}

export const generateFilter = async (requestBody) => {
    let newFilter = {};

    const filters = requestBody['filters'];
    for (const property in filters) {

        const pro = filters[property]
        // console.log(pro)
        if (pro.hasOwnProperty("cond")) {
            let date = new Date(pro["value"])
            if (pro['cond'] == "gt") {
                newFilter[property] = { "$gte": date }
            }
            else if (pro['cond'] == "lt") {
                newFilter[property] = { "$lte": date }
            }
            else if (pro['cond'] == "eq") {
                newFilter[property] = { "$eq": date }
            }
            else {
                newFilter[property] = pro["value"]
            }

        }
        else {
            newFilter[property] = filters[property]
        }
    }
    return newFilter
}