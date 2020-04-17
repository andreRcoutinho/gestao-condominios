import Validator, { Rules } from "validatorjs";

export function createRules(body: any): boolean | void {
    let rules: Rules = {
        first_name: 'required',
        last_name: 'required',
        //email: 'required',
        //IBAN: 'required',
        //NIF: 'required',
        company_name: 'required',
        //service_types: 'required',
        contacts: 'required'
    }
    var validation = new Validator(body, rules);

    return !validation.fails();
}