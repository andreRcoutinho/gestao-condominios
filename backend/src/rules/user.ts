import Validator, { Rules } from "validatorjs";
import { filterBody } from "../middlewares/rules";

export function updatePasswordRules(body: any): boolean | void {
    let rules: Rules = {
        old_password: "required",
        new_password: "required",
        new_password_repeat: "required"
    };
    filterBody(body, rules);
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

export function updateRoleRules(body: any): boolean | void {
    let rules: Rules = {
        role_id: "required",
    };
    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function addContactRules(body: any): boolean | void {
    let rules: Rules = {
        phone_number: "required",
    };
    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function updateContactRules(body: any): boolean | void {
    let rules: Rules = {
        contact_id: "required",
        phone_number: "required",
    };
    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function deleteContactRules(body: any): boolean | void {
    let rules: Rules = {
        contact_id: "required"
    };
    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function addUnitRules(body: any): boolean | void {
    let rules: Rules = {
        unit_id: "required",
    };
    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function deleteUnitRules(body: any): boolean | void {
    let rules: Rules = {
        unit_id: "required",
    };
    var validation = new Validator(body, rules);

    return !validation.fails();
}


