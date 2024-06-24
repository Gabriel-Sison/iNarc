import React, { ChangeEvent, Component, MouseEvent } from 'react'
import { Food } from './Food';

type NewMeatProps = {
    onAddClick: (food: Food) => void,
}

type NewMeatState = {
    name: string,
    unitCost: string,
    unitWeight: string,
    fats: number,
    carbs: number,
    proteins: number,
    error: string
}

export class NewMeat extends Component<NewMeatProps, NewMeatState> {
    constructor(props: NewMeatProps) {
        super(props);
        this.state = {
            name: "", unitCost: "", unitWeight: "", fats: 0, 
            carbs: 0, proteins: 0,  error: ""
        }
    }

    render =(): JSX.Element => {
        return (
            <div>
                <div>
                    <h2>New Meat Form</h2>

                    <div>
                        <label htmlFor='Name'>Name: </label>
                        <input type="text" id="Name" onChange={this.doNameChange}></input>
                    </div> 

                    {/* <div>
                        <label htmlFor='Metric'>Metric: </label>
                        <select id="Metric" onChange={this.doMetricChange}>
                            <option value="lbs">lbs</option>
                            <option value="grams">grams</option>
                        </select>
                    </div>  */}

                    <div>
                        <label htmlFor='Units Weight'>Weight in 1 Pack: </label>
                        <input type="text" id="Units Weight" onChange={this.doUnitsBoughtChange}></input>
                    </div> 

                    <div>
                        <label htmlFor='Unit Cost'>Cost per LB: $</label>
                        <input type="text" id="Unit Cost" onChange={this.doCostChange}></input>
                    </div> 

                    {/* <div>
                        <label htmlFor='Fats'>Fats: </label>
                        <input type="number" id="Fats" onChange={this.doFatsChange}></input>
                    </div> 

                    <div>
                        <label htmlFor='Carbs'>Carbs: </label>
                        <input type="number" id="Carbs" onChange={this.doCarbsChange}></input>
                    </div> 

                    <div>
                        <label htmlFor='Proteins'>Proteins: </label>
                        <input type="number" id="Proteins" onChange={this.doProteinsChange}></input>
                    </div> */}

                    <div>
                        <button onClick={this.doAddClick} type="button">ADD</button>
                    </div>
                </div>
                {this.state.error}
            </div>
        )
    }

    doAddClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
        if (this.state.name === "" || this.state.unitCost === "" || this.state.unitWeight === "") {
            this.setState({error: "Missing input"})
            return;
        } else if (!isValidNumber(this.state.unitCost) && !isValidNumber(this.state.unitWeight)) {
            this.setState({error: "Unit cost and weight invalid"})
            return;
        } if (!isValidNumber(this.state.unitCost)) {
            this.setState({error: "Unit cost invalid"})
            return;
        } if (!isValidNumber(this.state.unitWeight)) {
            this.setState({error: "Unit weight invalid"})
            return;
        } else {
            this.setState({error: ""})
            this.props.onAddClick({
                name: this.state.name, cost: Number(this.state.unitCost),lbsBought: Number(this.state.unitWeight), 
                fats: this.state.fats, carbs: this.state.carbs, proteins: this.state.proteins, 
                servings: 1,  metric: "lbs", list: "Calculator", bought: 0
            })
        }
    }

    doUnitsBoughtChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({unitWeight: evt.target.value})
    }

    doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({name: evt.target.value})
    }

    doCostChange = (evt: ChangeEvent<HTMLInputElement>): void => {       
        this.setState({unitCost: evt.target.value})

    }

    doProteinsChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({proteins: Number(evt.target.value)})
    }

    doCarbsChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({carbs: Number(evt.target.value)})
    }

    doFatsChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({fats: Number(evt.target.value)})
    }
}

const isValidNumber = (number: string): boolean => {
    const num: number = Number(number);
    if (isNaN(num) || num < 0) {
        return false;
    } else {
        return true;
    }
}