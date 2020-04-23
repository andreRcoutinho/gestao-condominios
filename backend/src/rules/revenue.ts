import Validator, { Rules } from "validatorjs";

export function paymentRecordRules(body: any): boolean | void {
    let rules: Rules = {
        payment_map_id: "required",
        unit_id: "required",
        month: "required",
    }
    var validation = new Validator(body, rules);

    return !validation.fails();
}