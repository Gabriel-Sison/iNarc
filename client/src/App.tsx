/**
 * HOW TO SEND TO GITHUB
 * 
 * Go to my branch
 * git add .
 * git commit -m "message"
 * git push origin myBranch
 * 
 * Go to main branch
 * git pull origin main
 * git merge myBranch
 * git push origin main
 */

import React, { Component } from "react";
import { Food } from "./Food";
import { Calculator } from "./Calculator";
import { deleteFood, listFoods, saveFood, getDay, updateDay, updateBudget, getBudget} from "./server";
import { NewFood } from "./NewFood";

type Page = "Inventory" | "Calculator" | "New Food"
type AppState = {
    page: Page, foodList: Array<Food>, day: number, budget: number
}

export class App extends Component<{}, AppState> {
    // BASIC EDIT 2.0
    constructor(props: {}) {
        super(props);
        this.state = {
            page: "Calculator", foodList: [], day: 0, budget: 0
        };
    }

    componentDidMount(): void {
        listFoods(this.doListResp)
        getDay(this.doGetDayResp)
        getBudget(this.doGetBudgetResp)
    }

    render = (): JSX.Element => {
        if (this.state.page === "Calculator") {
            return <Calculator  onDeleteClick={this.doDeleteClick} 
                                onAddClick={this.doAddClick} 
                                foods={this.state.foodList}
                                day={this.state.day}
                                onDayChange={this.doDayChange}
                                budget={this.state.budget}
                                onBudgetChange={this.doBudgetChange}
                                onAddFoodPage={this.doAddFoodPageChange}/>
        } else if (this.state.page === "Inventory") {
            return <div>Trying to go to inventory</div>
        } else {
            return <NewFood onAddClick={this.doAddClick}></NewFood>
        }
    };

    doAddFoodPageChange = (): void => {
        this.setState({page: "New Food"});
    }

    doListResp = (foods: Food[]): void => {
        this.setState({foodList: foods})
    }

    doAddClick = (food: Food): void => {
        saveFood(food)
        listFoods(this.doListResp)
        this.setState({page: "Calculator"})
    }

    doDeleteClick = (food: Food): void => {
        deleteFood(food)
        listFoods(this.doListResp)
    }

    doDayChange = (day: number): void => {
        updateDay(day)
        this.setState({day: day})
    }

    doGetDayResp = (serverDay: number): void => {
        this.setState({day: serverDay})
    }

    doBudgetChange = (budget: number): void => {
        updateBudget(budget)
        this.setState({budget: budget})
    }

    doGetBudgetResp = (serverBudget: number): void => {
        this.setState({budget: serverBudget})
    }
}