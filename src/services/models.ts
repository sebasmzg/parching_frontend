/* User models */

export interface IUsers {
    createdAt:             Date;
    updatedAt:             Date;
    id:                    string;
    name:                  string;
    email:                 string;
    password:              string;
    profilePicture:        string;
    roleId:                string;
    emailNotifications:    boolean;
    platformNotifications: boolean;
    client:                Client | null;
    role:                  Role;
}

export interface IUserRegister {
    name:                string;
    email:               string;
    password:            string;
    address:             string;
    birthDate:           string;
    gender:              string;
    locationDescription: string;
}

export interface IUserLogin {
    email:    string;
    password: string;
}

export interface Client {
    createdAt:           Date;
    updatedAt:           Date;
    id:                  string;
    birthDate:           Date;
    gender:              string;
    address:             string;
    locationDescription: string;
    score:               number;
}

export interface Role {
    createdAt: Date;
    updatedAt: Date;
    id:        string;
    name:      string;
}


/* Event models */

export interface IEvent {
    createdAt:       Date;
    updatedAt:       Date;
    id:              string;
    startDate:       Date;
    endDate:         Date;
    capacity:        number;
    location:        string;
    information:     Information;
    score:           number;
    state:           string;
    hostId:          string;
    eventCategories: EventCategory[];
    images:          EventCategory[];
}
    
export interface EventCategory {
    createdAt:   Date;
    updatedAt:   Date;
    id:          string;
    eventId:     string;
    categoryId?: string;
    image?:      string;
}

export interface Information {
    name:     string;
    email:    string;
    location: string;
}

export interface IEventCreation {
    startDate:   Date;
    endDate:     Date;
    capacity:    number;
    location:    string;
    information: Information;
    categories:  string[];
    isAdmin:     boolean;
    host:        string;
    images:      string[];
}

export interface IEventUpdate {
    id?: string;
    startDate: Date;
    endDate:   Date;
    state:     string;
    capacity:  number;
    location:  string;
}



/* category */

export interface ICategory {
    createdAt:     Date;
    updatedAt:     Date;
    id:            string;
    name:          string;
    formTemplates: any[];
}