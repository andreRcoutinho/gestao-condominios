import Validator, { Rules } from "validatorjs";

export function indexRules(body: any): boolean | void { }

export function showRules(body: any): boolean | void { }

export function createRules(body: any): boolean | void {
    let rules: Rules = {
        typology: 'required',
    };
    var validation = new Validator(body, rules);
    return !validation.fails();
}

export function updateRules(body: any): boolean | void {
    let rules: Rules = {
        typology: 'required',
    };
    var validation = new Validator(body, rules);
    return !validation.fails();
}

export function removeRules(body: any): boolean | void { }