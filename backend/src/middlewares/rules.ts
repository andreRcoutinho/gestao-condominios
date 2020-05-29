import { Rules } from "validatorjs";

export function filterBody(body: any, rules: any) {
    for (const body_key in body) {
        for (const key in rules) {
            if (!rules.hasOwnProperty(body_key)) {
                delete body[body_key];
            }
        }
    }
}