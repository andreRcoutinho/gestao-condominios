import { Request, Response } from 'express';
import { User } from '../models/user';
import { Role } from '../models/role';
import { UserPassword } from '../models/user_password';

export default {
    //TO DO
    async signUp(req: Request, res: Response){
        /*
         * 1º verificar se os dados vem todos corretos
         * 2º verificar se o email já está registado
         * 3º criar o objeto user_password
         * 4º procurar o objeto role correspondente
         * 5º criar o utilizador e associar os outros objetos
         * 6º adicionar as roles dele 
         */
    },
    //TO DO
    async signIn(req: Request, res: Response){
    },
    //TO DO
    async forgotPassowrd(req: Request, res: Response){
    },
    //TO DO
    async resetPassword(req: Request, res: Response){
    }
}