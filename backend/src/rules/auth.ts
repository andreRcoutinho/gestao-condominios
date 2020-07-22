import { Rules } from "validatorjs";
import Validator from "validatorjs";
import { filterBody } from "../middlewares/rules";

export function signUpRules(body: any): boolean | void {
    var rules: Rules = {
        first_name: "required",
        last_name: "required",
        email: "required|email",
        //password: "required",
        NIF: "required",
        IBAN: "required",
        role_id: "required",
        contacts: "required",
    };

    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function signInRules(body: any): boolean | void {
    let rules = {
        email: "required|email",
        password: "required",
    };

    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function forgotPasswordRules(body: any): boolean | void {
    let rules = {
        email: "required",
    };

    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function resetPasswordRules(body: any): boolean | void {
    let rules = {
        email: "required",
        token: "required",
        new_password: "required",
        new_password_repeat: "required"
    }

    var validation = new Validator(body, rules);

    return !validation.fails();
}
