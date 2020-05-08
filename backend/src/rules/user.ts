import Validator, { Rules } from "validatorjs";
import { filterBody } from "../middlewares/rules";

export function updatePasswordRules(body: any): boolean | void {
    let rules: Rules = {
        email: "required|email",
        new_password: "required",
    };
    console.log(body);
    filterBody(body, rules);
    console.log(body);
    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function updateRules(body: any): boolean | void {
    let rules: Rules = {
        email: "email",
    };
    var validation = new Validator(body, rules);

    return !validation.fails();
}

