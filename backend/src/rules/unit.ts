import Validator, { Rules } from "validatorjs";

export function updateRules(body: any): boolean | void {

    let rules: Rules = {

    }
    var validation = new Validator(body, rules);

    return !validation.fails();
}
