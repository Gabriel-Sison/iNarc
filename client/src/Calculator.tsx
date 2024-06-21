import React, { ChangeEvent, Component, MouseEvent } from 'react';
import { Food } from './Food';

type CalculatorProps = {
    onDeleteClick: (food: Food) => void,
    onAddClick: (food: Food) => void,
    onAddFoodPage: () => void,
    onDayChange: (day: number) => void,
    foods: Food[]
}

type CalculatorState = {
    moneyGoal: number,
    days: number
}

export class Calculator extends Component<CalculatorProps, CalculatorState> {
    constructor(props: CalculatorProps) {
        super(props);
        this.state = {moneyGoal: 0, days: 1}
    }
    
    render = (): JSX.Element => {
        return (
            <div>
                You're in the calculator
                <div>
                    Days: <input type="number" onChange={this.doDayChange} defaultValue={this.state.days}></input>
                </div>
                {this.renderFoods()}
            </div>
        )
    }

    renderFoods = (): JSX.Element => {
        // Getting total cost of food
        const currCosts: number[] = [];
        for (const currFood of this.props.foods) {
            currCosts.push(Math.round(currFood.bought * currFood.lbsBought * currFood.cost / this.state.days * 100)/ 100)
        }
        const totalCost: number = getTotalCost(currCosts, 0);

        const pounds: number[] = [];
        const foods: JSX.Element[] = [];
        for (const currFood of this.props.foods) {
            if (currFood.list === "Calculator") {

                // FIX LATER
                let input: number = currFood.bought

                foods.push(
                    <tr>
                        {/** Delete item */}
                        <td><a href="#" onClick={(evt) => this.doDeleteClick(evt, currFood)}>X</a></td>

                        {/** Change input */}
                        <input type="number" id={currFood.name + " Input"} defaultValue={currFood.bought} name="input" min="0" max="1000" onChange={() => this.doBoughtChange(currFood)}/>

                        {/** Name */}
                        <td>{currFood.name}</td> 

                        {/** Cost per lb */}
                        <td>{Math.round(1000 * currFood.cost) / 1000}</td>

                        {/** Weight*/}
                        <td>{currFood.lbsBought} {currFood.metric}</td>

                        {/** % Cost */}
                        <td>{Math.round(1000 * currFood.lbsBought * input * currFood.cost / this.state.days / totalCost) / 10}</td>
                    </tr>
                )
                
                pounds.push(currFood.lbsBought * currFood.bought);
            }
        }

        const totalLbs = getTotalLbs(pounds, 0);
        if (foods.length === 0) {
            return (<>
                <button type="button" onClick={this.doAddClick}>Add New Food</button>
            </>)
        } else {
            return (
                <div>
                    <table>
                        <tr>
                            <th></th>
                            <th>Bought-</th>
                            <th>Name-----------</th> 
                            <th>Cost/lb---</th>
                            <th>Weight----</th>
                            <th>% Cost----</th>
                        </tr>
                            {foods}
                    </table>
                    <button type="button" onClick={this.doAddClick}>Add New Food</button>
                    <button type="button" onClick={this.doCheckPropsClick}>Check Props</button>

                    <h2>Summary: </h2>
                    <p>Average Daily Cost : {Math.round(totalCost * 100) / 100}</p>
                    <p>Average LBS of Meat : {Math.round(totalLbs / this.state.days * 100) / 100} </p>
                </div>
            )
        }
        
    }

    doCheckPropsClick = (): void => {
        console.log(this.props.foods)
    }

    doAddClick = (): void => {
        this.props.onAddFoodPage();
    }

    doDayChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({days: Number(evt.target.value)})
        this.props.onDayChange(Number(evt.target.value))
    }

    doBoughtChange = (food: Food): void => {
        const newBought = (document.getElementById(food.name + " Input") as HTMLInputElement).value;
        this.props.onAddClick({...food, bought: Number(newBought)})
    }

    doDeleteClick = (evt: MouseEvent<HTMLAnchorElement>, currFood: Food): void => {
        evt.preventDefault();
        this.props.onDeleteClick(currFood);
    }
}

const getTotalCost = (costs: number[], idx: number): number => {
    const currCost = costs.at(idx)
    if (currCost === undefined) {
        return 0;
    } else {
        return currCost + getTotalCost(costs, idx + 1);
    }
}

const getTotalLbs = (pounds: number[], idx: number): number => {
    const currCost = pounds.at(idx)
    if (currCost === undefined) {
        return 0;
    } else {
        return currCost + getTotalCost(pounds, idx + 1);
    }
}