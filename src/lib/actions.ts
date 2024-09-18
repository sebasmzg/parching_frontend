import { auth } from "@/app/firebase/config";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth"
import { IUsers } from "./models";

export class ApiService {
    baseUrl: string;

    constructor(){
        this.baseUrl= process.env.NEXT_PUBLIC_API_URL || "https://parching-app-backend.onrender.com/api/"
    }

    async createUser(userData: {email:string,password:string}){
        try {
            const res= await fetch(`${this.baseUrl}/auth/register`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })

            if(!res.ok){
                throw new Error("Error creating user");
            }

            const result = await res.json();
            return result;
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    }

    async getAllUsers(): Promise<IUsers[]>{
        try {
            const res = await fetch(`${this.baseUrl}user`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if(!res.ok){
                throw new Error("Error getting users");
            }   

            const users: IUsers[] = await res.json();
            return users;
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    }
    /* async registerUser(email: string, password: string){
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw new Error("Error registering user:" + error);
        }
    }

    async loginUser(email:string, password: string){
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw new Error("Error logging in: " + error);
        }
    }

    async loginWithGoogle(){
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            return userCredential;
        } catch (error) {
            throw new Error("Error logging with google: " + error);
        }
    } */
}