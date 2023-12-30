import { Account, Client , ID} from "appwrite";
import conf from "../conf/conf";

export class AuthService{

     client = new Client();
     account;
 
    constructor (){
        this.client.setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.appwriteProjectId); 
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
           try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                // call another method
                this.login();
            }
            else{
                return userAccount;
            }
           } catch (error) {
            throw error;
           }
    }

    async login({email,password})
    {
        try {
          return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error
        }
    }

    async getCurrentuser()
    {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getcurrentuser :: error ",error)
        }
        return null
    }

    async logout(){
        try {
            await this.account.deleteSession('[SESSION_ID]');
        } catch (error) {
            console.log("Appwrite service :: logout :: error ",error)
            
        }
    }
    }

    const authService = new AuthService();
    export default authService;