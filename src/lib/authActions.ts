import { IUserLogin, IUserRegister, IUsers } from "./models";

export class ApiService {
  baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://parching-app-backend.onrender.com/api/";
  }

  async createUser(userData: IUserRegister) {
    try {
      const res = await fetch(`${this.baseUrl}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      });
      console.log(userData);
      if (!res.ok) {
        const errorMessage = await res.text();
        console.error(
          `Error creating user: ${res.status}: ${res.statusText} - ${errorMessage}`
        );
        throw new Error(errorMessage);
      }

      const result = await res.json();
      console.log(result);

      return result;
    } catch (error) {
      console.error("API error:" + error);
      throw error;
    }
  }

  async loginUser(email: string, password: string): Promise<IUserLogin> {
    try {
      const res = await fetch(`${this.baseUrl}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        console.error(
          `Error logging in user: ${res.status}: ${res.statusText} - ${errorMessage}`
        );
        throw new Error(errorMessage);
      }

      const result = await res.json();
      console.log(result);

      return result;
    } catch (error) {
      console.error("API error:" + error);
      throw error;
    }
  }

  async getAllUsers(): Promise<IUsers[]> {
    try {
      const res = await fetch(`${this.baseUrl}user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Error getting users");
      }

      const users: IUsers[] = await res.json();
      return users;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  }

  async sendVerificationEmail(email: string, userId: string, verificationToken: string) {
    try {
      const res = await fetch(`${this.baseUrl}notifications/send-verification-email`, {
        method: "POST",
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, userId, verificationToken }),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        console.error(
          `Error sending verification email: ${res.status}: ${res.statusText} - ${errorMessage}`
        );
        throw new Error(errorMessage);
      }

      const result = await res.json();
      console.log(result);

      return result;
    } catch (error) {
      console.error("API error:" + error);
      throw error;
    }
  }

}
