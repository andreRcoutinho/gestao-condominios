import Validator, { Rules } from "validatorjs";
import { filterBody } from "../middlewares/rules";

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
    filterBody(body, rules);
    var validation = new Validator(body, rules);

    return !validation.fails();
}