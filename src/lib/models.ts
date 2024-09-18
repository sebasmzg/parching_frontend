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
