import Validator, { Rules } from "validatorjs";

export function updatePasswordRules(body: any): boolean | void {
  let rules: Rules = {
    email: "required|email",
    new_password: "required",
  };
  var validation = new Validator(body, rules);

  return !validation.fails();
}
