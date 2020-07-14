import Validator, { Rules } from "validatorjs";

export function createRules(body: any): boolean | void {
    let rules: Rules = {
        first_name: 'required',
        last_name: 'required',
        //email: 'required',
        //IBAN: 'required',
        //NIF: 'required',
        company_name: 'required',
        service_types: 'required',
        contacts: 'required'
    }
    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function addContactRules(body: any): boolean | void {
    let rules: Rules = {
        phone_number: "required"
    }
    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function updateContactRules(body: any): boolean | void {
    let rules: Rules = {
        contact_id: "required",
        phone_number: "required"
    }
    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function deleteContactRules(body: any): boolean | void {
    let rules: Rules = {
        contact_id: "required",
    }
    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function addServiceTypeRules(body: any): boolean | void {
    let rules: Rules = {
        service_types: "required",
    }
    var validation = new Validator(body, rules);

    return !validation.fails();
}

export function deleteServiceTypeRules(body: any): boolean | void {
    let rules: Rules = {
        service_type_id: "required",
    }
    var validation = new Validator(body, rules);

    return !validation.fails();
}