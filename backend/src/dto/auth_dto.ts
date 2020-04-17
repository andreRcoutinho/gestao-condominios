import {DTO} from './dto';

export class DTOInputSignUp extends DTO{
    public email : String;
    public password : String;
    public role_id : Number;
    public first_name: String;
    public last_name: String;
    public NIB: String;
    public NIF: String;
    public contacts: [];

    constructor(email: String, password: String, role_id: Number, first_name: String, last_name: String, NIB: String, NIF: String, contacts: []){
        super();
    }
} 

export class DTOInputSignIn extends DTO{
    public email : String;
    public password : String;
}

export class DTOOutputSignIn extends DTO{

}