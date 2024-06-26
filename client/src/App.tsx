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

/**
 * TO UPDATE ONLNINE:
 * npm run build
 * scp -r ~/Desktop/iNarc/client/iNarc gabsison@attu.cs.washington.edu:/cse/web/homes/gabsison/
 * DELETE "/" before main.blahblah
 */

import React, { Component } from "react";
import { Food } from "./Food";
import { Calculator } from "./Calculator";
import { deleteFood, listFoods, saveFood, getDay, updateDay, updateBudget, getBudget} from "./server";
import { NewMeat } from "./NewMeat";

type Page = "Calculator" | "New Meat"
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
                                onAddMeatPage={this.doAddFoodPageChange}/>
        } else {
            return <NewMeat onAddClick={this.doAddClick}
                            onBackClick={this.doCalculatorPageChange}/>
        }
    };

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

    doCalculatorPageChange = (): void => {
        this.setState({page: "Calculator"})
    }

    doAddFoodPageChange = (): void => {
        this.setState({page: "New Meat"});
    }
}