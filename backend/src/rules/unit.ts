import Validator, { Rules } from "validatorjs";

export function createRules(body: any): boolean | void {

    let rules: Rules = {
        typology_id: "required",
        unit: "required"
    }
    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function updateRules(body: any): boolean | void {

    let rules: Rules = {

    }
    var validation = new Validator(body, rules);

    return !validation.fails();
}
