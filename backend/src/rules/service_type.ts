import Validator, { Rules } from "validatorjs";

export function createRules(body: any): boolean | void {
    let rules: Rules = {
        service_type: "required"
    }
    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function updateRules(body: any): boolean | void {
    let rules: Rules = {
        service_type: "required"
    }
    var validation = new Validator(body, rules);

    return !validation.fails();
}