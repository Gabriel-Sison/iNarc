import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response; 

type Food = {
  readonly name: string,
  readonly metric: string,
  readonly cost: number,
  readonly servings: number,
  readonly lbsBought: number,
  readonly fats: number,
  readonly carbs: number,
  readonly proteins: number,
  readonly bought: number,
  readonly list: string
}

const map: Map<string, Food> = new Map();
map.set("Beef Chuck", {
  name: "Beef Chuck",
  metric: "LB",
  cost: 4.99,
  lbsBought: 14,
  fats: 30.9,
  carbs: 0,
  proteins: 149.3,
  list: "Calculator",
  bought: 0,
  servings: 1
})
map.set("Beef Skirt", {
  name: "Beef Skirt",
  metric: "LB",
  cost: 4.49,
  lbsBought: 2,
  fats: 64,
  carbs: 0,
  proteins: 112,
  list: "Calculator",
  bought: 0,
  servings: 1
})
map.set("Beef Short Ribs", {
  name: "Beef Short Ribs",
  metric: "LB",
  cost: 8.99,
  lbsBought: 4,
  fats: 101.3,
  carbs: 0,
  proteins: 117.3,
  list: "Calculator",
  bought: 0,
  servings: 1
})
map.set("Lamb Shoulder", {
  name: "Lamb Shoulder",
  metric: "LB",
  cost: 3.69,
  lbsBought: 8,
  fats: 24,
  carbs: 0,
  proteins: 91.2,
  list: "Calculator",
  bought: 0,
  servings: 1
})
map.set("80/20 Ground Beef", {
  name: "80/20 Ground Beef",
  metric: "LB",
  cost: 3.19,
  lbsBought: 10,
  fats: 88,
  carbs: 0,
  proteins: 19 * 4,
  list: "Calculator",
  bought: 0,
  servings: 1
})
map.set("Beef Ribeye", {
  name: "Beef Ribeye",
  metric: "LB",
  cost: 10.99,
  lbsBought: 12,
  fats: 85.3,
  carbs: 0,
  proteins: 112,
  list: "Calculator",
  bought: 0,
  servings: 1
})

// GENERAL CHANGE METHOD
export const deleteFood = (req: SafeRequest, res: SafeResponse): void => { 
  const name = req.body.name;
  if (name == undefined || typeof name !== "string") {
    res.status(400).send("food not in our map");
    return;
  }

  map.delete(name)
  res.send({saved: true})
}

// GENERAL CHANGE METHOD
export const addFood = (req: SafeRequest, res: SafeResponse): void => {
  const name = req.body.name;
  if (name === undefined || typeof name !== "string") {
    res.status(400).send('required argument "name" was missing');
    return;
  }

  const metric = req.body.metric;
  if (metric === undefined || typeof metric !== "string") {
    res.status(400).send('required argument "metric" was missing');
    return;
  }

  const cost = req.body.cost;
  if (cost === undefined || typeof cost !== "number") {
    res.status(400).send('required argument "cost" was missing');
    return;
  }

  const servings = req.body.servings;
  if (servings === undefined || typeof servings !== "number") {
    res.status(400).send('required argument "servings" was missing');
    return;
  }

  const lbsBought = req.body.lbsBought;
  if (lbsBought === undefined || typeof lbsBought !== "number") {
    res.status(400).send('required argument "lbsBought" was missing');
    return;
  }

  const fats = req.body.fats;
  if (fats === undefined || typeof fats !== "number") {
    res.status(400).send('required argument "fats" was missing');
    return;
  }

  const carbs = req.body.carbs;
  if (carbs === undefined || typeof carbs !== "number") {
    res.status(400).send('required argument "carbs" was missing');
    return;
  }

  const proteins = req.body.proteins;
  if (proteins === undefined || typeof proteins !== "number") {
    res.status(400).send('required argument "proteins" was missing');
    return;
  }

  const bought = req.body.bought;
  if (bought === undefined || typeof bought !== "number") {
    res.status(400).send('required argument "bought" was missing');
    return;
  }

  const list = req.body.list;
  if (list === undefined || typeof list !== "string") {
    res.status(400).send('required argument "list" was missing');
    return;
  }

  const currFood: Food = {
    name: name,
    metric: metric,
    cost: cost,
    servings: servings,
    lbsBought: lbsBought,
    fats: fats,
    carbs: carbs,
    proteins: proteins,
    bought: bought,
    list: list
  }

  map.set(name, currFood)
  res.send({saved: true})
}

export const listFoods = (_req: SafeRequest, res: SafeResponse): void => {
    const names: string[] = Array.from(map.keys());
    let i = 0;
    const foods: unknown[] = [];
    while (i < names.length) {
      foods.push(map.get(names[i]))
      i = i + 1;
    }
    res.send({foodsArr: foods});
}

let currDays: number = 0;
export const updateDay = (req: SafeRequest, res: SafeResponse): void => {
  const day = req.body.day
  if (typeof day !== "number") {
    res.status(400).send("Day is not a number")
    return;
  }
  currDays = Number(day)
  res.send({saved: true})
}

export const getDay = (_req: SafeRequest, res: SafeResponse): void => {
  res.send({day: currDays});
}

let currBudget: number = 0;
export const updateBudget = (req: SafeRequest, res: SafeResponse): void => {
  const budget = req.body.budget
  if (typeof budget !== "number") {
    res.status(400).send("budget is not a number")
    return;
  }
  currBudget = Number(budget)
  res.send({saved: true})
}

export const getBudget = (_req: SafeRequest, res: SafeResponse): void => {
  res.send({budget: currBudget});
}

// Helper to return the (first) value of the parameter if any was given.
const first = (param: unknown): string|undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};
