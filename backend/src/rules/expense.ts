import Validator, { Rules } from "validatorjs";

export function createRules(body: any): boolean | void {
    let rules: Rules = {
        supplier_id: "required",
        description: "required",
        value: "required",
        payment_date: "required|date"
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