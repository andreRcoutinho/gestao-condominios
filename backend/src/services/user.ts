import { User } from '../models/user';
import { UserPassword } from '../models/user_password';
import { UserNotExists } from '../api/api_error';


async function findUser(email: Number) : Promise<User> {
    let user : User = await User.findOne({ where : { email }});
    if(user)
        return user;
    return;
}

export default {
    async updatePassword(body: any){

        try{
            let user = await findUser(body.email);

            if(!user){
                console.log('aqui');
                throw new UserNotExists();
            }
    
            var user_password: UserPassword = user.getUser_password();
            user_password.update_password(body.new_password);
            await user_password.save();

            return {};
        }catch(e){
            console.log(e);
            return;
        }
    }
}