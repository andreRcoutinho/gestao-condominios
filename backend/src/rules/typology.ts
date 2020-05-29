import Validator, { Rules } from "validatorjs";
import { filterBody } from "../middlewares/rules";

export function indexRules(body: any): boolean | void { }

export function showRules(body: any): boolean | void { }

export function createRules(body: any): boolean | void {
    let rules: Rules = {
        typology: 'required',
        permilage: 'required'
    };
    var validation = new Validator(body, rules);
    return !validation.fails();
}

export function updateRules(body: any): boolean | void {
    let rules: Rules = {
        typology: 'required',
    };
    filterBody(body, rules);
    var validation = new Validator(body, rules);
    return !validation.fails();
}

export function removeRules(body: any): boolean | void { }