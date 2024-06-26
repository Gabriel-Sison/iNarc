import { Food } from './Food';

// -------------------------- FOODS -------------------------- //
const map: Map<string, Food> = new Map();
map.set("Beef Chuck", {
  name: "Beef Chuck",
  metric: "LB",
  cost: 4.99,
  lbsBought: 14,
  fats: 0,
  carbs: 0,
  proteins: 0,
  list: "Calculator",
  bought: 0,
  servings: 1
})
map.set("Beef Skirt", {
  name: "Beef Skirt",
  metric: "LB",
  cost: 4.49,
  lbsBought: 2,
  fats: 0,
  carbs: 0,
  proteins: 0,
  list: "Calculator",
  bought: 0,
  servings: 1
})
map.set("Beef Short Ribs", {
  name: "Beef Short Ribs",
  metric: "LB",
  cost: 8.99,
  lbsBought: 4,
  fats: 0,
  carbs: 0,
  proteins: 0,
  list: "Calculator",
  bought: 0,
  servings: 1
})
map.set("Lamb Shoulder", {
  name: "Lamb Shoulder",
  metric: "LB",
  cost: 3.69,
  lbsBought: 8,
  fats: 0,
  carbs: 0,
  proteins: 0,
  list: "Calculator",
  bought: 0,
  servings: 1
})
map.set("80/20 Ground Beef", {
  name: "80/20 Ground Beef",
  metric: "LB",
  cost: 3.19,
  lbsBought: 10,
  fats: 0,
  carbs: 0,
  proteins: 0,
  list: "Calculator",
  bought: 0,
  servings: 1
})
map.set("Beef Ribeye", {
  name: "Beef Ribeye",
  metric: "LB",
  cost: 10.99,
  lbsBought: 12,
  fats: 0,
  carbs: 0,
  proteins: 0,
  list: "Calculator",
  bought: 0,
  servings: 1
})
export type ListCallback = (foods: Food[]) => void;
export const listFoods = (cb: ListCallback): void => {
  const names: string[] = Array.from(map.keys());
    let i = 0;
    const foods: Food[] = [];
    while (i < names.length) {
      const currFood: Food | undefined = map.get(names[i]);
      if (currFood !== undefined){
        foods.push(currFood)
      }
      i = i + 1;
    }
    cb(foods)
};

// -------------------------- SAVING FOOD: GC -------------------------- //
export const saveFood = (food: Food): void => {
  map.set(food.name, food)
}

// -------------------------- DELETING FOOD: GC -------------------------- //
export const deleteFood = (food: Food): void => {
  map.delete(food.name)
}


// -------------------------- DAY -------------------------- //
let currDay: number = 0;
export type GetDayCallback = (day: number) => void;
export const getDay = (cb: GetDayCallback): void => {
  cb(currDay)
};

export const updateDay = (day: number): void => {
  currDay = day
}

// -------------------------- BUDGET -------------------------- //
let currBudget: number = 0
export type GetBudgetCallback = (budget: number) => void;
export const getBudget = (cb: GetBudgetCallback): void => {
  cb(currBudget)
};

export const updateBudget = (budget: number): void => {
  currBudget = budget
}