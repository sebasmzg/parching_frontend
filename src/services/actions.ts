import {
  IEvent,
  IEventID,
  IEventCreation,
  IEventUpdate,
  IUserRegister,
  IUsers,
} from "./models";
import { jwtDecode } from "jwt-decode";

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

  async loginUser(email: string, password: string) {
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
      console.log("res: ", res);

      const result = await res.json();
      console.log("JWT: ", result);

      const token = result.accessToken;
      console.log("token: ", token);

      if (!token || typeof token !== "string") {
        throw new Error("Token inválido o no proporcionado");
      }

      // Decodificar el token
      const decodedToken = jwtDecode<{ userId: string }>(token);
      console.log("decodedToken: ", decodedToken);

      // Obtener el userId del token decodificado
      const userId = decodedToken.userId;
      console.log("userId: ", userId);

      return userId;
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
        const errorMessage = await res.text();
        console.error(
          `Error fetching users: ${res.status}: ${res.statusText} - ${errorMessage}`
        );
        throw new Error(errorMessage);
      }

      const users: IUsers[] = await res.json();
      return users;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<IUsers> {
    try {
      const res = await fetch(`${this.baseUrl}user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        console.error(
          `Error getting user: ${res.status}: ${res.statusText} - ${errorMessage}`
        );
        throw new Error(errorMessage);
      }

      const user: IUsers = await res.json();
      return user;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  }

  async updateUser(id: string, userData: IUsers) {
    try {
      const res = await fetch(`${this.baseUrl}user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        console.error(
          `Error updating user: ${res.status}: ${res.statusText} - ${errorMessage}`
        );
        throw new Error(errorMessage);
      }

      const user: IUsers = await res.json();
      return user;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  }
}

export class ApiServiceEvent {
  baseUrl: string;

  constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://parching-app-backend.onrender.com/api/";
  }

  async getAllEvents(state: string = "active", userId?: string, categoryId?: string, role?: string): Promise<IEvent[]> {
    try {
      const res = await fetch(`${this.baseUrl}events?eventsState=${state}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        console.error(
          `Error fetching events: ${res.status}: ${res.statusText} - ${errorMessage}`
        );
        throw new Error(errorMessage);
      }
      const events = await res.json();
      return events;
    } catch (error) {
      console.error("API error Events:", error);
      throw error;
    }
  }
  
  async getEventsByCategory(categoryId: string): Promise<IEvent[]> {
    try {
      const res = await fetch(`${this.baseUrl}events?categoryId=${categoryId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        console.error(
          `Error fetching events by category: ${res.status}: ${res.statusText} - ${errorMessage}`
        );
        throw new Error(errorMessage);
      }
      const events = await res.json();
      return events;
    } catch (error) {
      console.error("API error Events:", error);
      throw error;
    }
  }

  async getEventsByUser(userId: string, role: string): Promise<IEvent[]> {
    try {
      const res = await fetch(`${this.baseUrl}events?userType=${role}&userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        console.error(
          `Error fetching events by user: ${res.status}: ${res.statusText} - ${errorMessage}`
        );
        throw new Error(errorMessage);
      }
      const events = await res.json();
      return events;
    } catch (error) {
      console.error("API error Events:", error);
      throw error;
    }
  }

  async getEventById(id: string): Promise<IEventID> {
    try {
      const res = await fetch(`${this.baseUrl}events/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        console.error(
          `Error fetching event: ${res.status}: ${res.statusText} - ${errorMessage}`
        );
        throw new Error(errorMessage);
      }
      const event = await res.json();
      return event;
    } catch (error) {
      console.error("API error Event:", error);
      throw error;
    }
  }

  async createEvent(eventData: IEventCreation) {
    try {
      const res = await fetch(`${this.baseUrl}events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(eventData),
      });
      const responseText = await res.text();
      if (!res.ok) {
        const errorMessage = await res.text();
        console.error(
          `Error creating event: ${res.status}: ${res.statusText} - ${errorMessage}`
        );
        throw new Error(errorMessage);
      }
      if (responseText.startsWith("{")) {
        const event = JSON.parse(responseText);
        return event;
      } else {
        console.log("Successful creation:", responseText);
      }
    } catch (error) {
      console.error("API error Event:", error);
      throw error;
    }
  }

  async updateEvent(id: string, eventData: IEventUpdate) {
    try {
      const res = await fetch(`${this.baseUrl}events/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(eventData),
      });

      const responseText = await res.text();

      if (!res.ok) {
        console.error(
          `Error updating event: ${res.status}: ${res.statusText} - ${responseText}`
        );
        throw new Error(responseText);
      }

      console.log("Response Text:", responseText);

      // Verifica si es JSON o texto
      if (responseText.startsWith("{")) {
        const event = JSON.parse(responseText);
        return event;
      } else {
        console.log("Successful update:", responseText);
        return { message: responseText };
      }
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  }

  async suscribeEvent(eventId: string, userId: string) {
    try {
      const res = await fetch(
        `${this.baseUrl}events/subscribe?userId=${userId}&eventId=${eventId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
          body: JSON.stringify({ userId, eventId }),
        }
      );
  
      // Obtener la respuesta como texto
      const responseText = await res.text();
  
      if (!res.ok) {
        console.error(
          `Error subscribing to event: ${res.status}: ${res.statusText} - ${responseText}`
        );
        throw new Error(responseText);
      }
  
      // Verifica si es JSON o texto
      try {
        const responseJson = JSON.parse(responseText); // Intentar parsear como JSON
        return responseJson;
      } catch (e) {
        // Si falla el parseo, devolver el texto como está
        console.log("Respuesta en texto:", responseText);
        return { message: responseText };
      }
    } catch (error) {
      console.error("API error Event:", error);
      throw error;
    }
  }
  
}

export class ApiServiceCategory {
  baseUrl: string;
  constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "https://parching-app-backend.onrender.com/api/";
  }
  async getAllCategories() {
    try {
      const res = await fetch(`${this.baseUrl}categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        console.error(
          `Error fetching categories: ${res.status}: ${res.statusText} - ${errorMessage}`
        );
        throw new Error(errorMessage);
      }
      const categories = await res.json();
      return categories;
    } catch (error) {
      console.error("API error Categories:", error);
      throw error;
    }
  }

  async getCategoryById(id: string): Promise<{ id: string; name: string }> {
    try {
      const res = await fetch(`${this.baseUrl}categories/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        console.error(
          `Error fetching category: ${res.status}: ${res.statusText} - ${errorMessage}`
        );
        throw new Error(errorMessage);
      }
      const category = await res.json();
      return category; // Asegúrate de que el objeto tenga las propiedades que necesitas
    } catch (error) {
      console.error("API error Category:", error);
      throw error;
    }
  }
}
