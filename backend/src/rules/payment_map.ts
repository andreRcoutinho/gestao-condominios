import Validator, { Rules } from "validatorjs";

export function createRules(body: any): boolean | void {
    let rules: Rules = {
        name: "required",
        description: "required",
        value: "required",
        unit_ids: "required",
        is_yearly: "required",
        year: "required"
    }
    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function updateRules(body: any): boolean | void {
    let rules: Rules = {
        value: "required|numeric",
        month: "required|numeric|between:2,12"
    }
}