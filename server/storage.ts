import {
  users, type User, type InsertUser,
  userRegistration, type UserRegistration, type InsertUserRegistration,
  companyRegistration, type CompanyRegistration, type InsertCompanyRegistration
} from "@shared/schema";

// modify the interface with any CRUD methods you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createUserRegistration(registration: InsertUserRegistration): Promise<UserRegistration>;
  getUserRegistrations(): Promise<UserRegistration[]>;
  
  createCompanyRegistration(registration: InsertCompanyRegistration): Promise<CompanyRegistration>;
  getCompanyRegistrations(): Promise<CompanyRegistration[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private userRegistrations: Map<number, UserRegistration>;
  private companyRegistrations: Map<number, CompanyRegistration>;
  private currentUserId: number;
  private currentUserRegistrationId: number;
  private currentCompanyRegistrationId: number;

  constructor() {
    this.users = new Map();
    this.userRegistrations = new Map();
    this.companyRegistrations = new Map();
    this.currentUserId = 1;
    this.currentUserRegistrationId = 1;
    this.currentCompanyRegistrationId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createUserRegistration(registration: InsertUserRegistration): Promise<UserRegistration> {
    const id = this.currentUserRegistrationId++;
    const newRegistration: UserRegistration = { 
      ...registration, 
      id, 
      createdAt: new Date() 
    };
    this.userRegistrations.set(id, newRegistration);
    return newRegistration;
  }

  async getUserRegistrations(): Promise<UserRegistration[]> {
    return Array.from(this.userRegistrations.values());
  }

  async createCompanyRegistration(registration: InsertCompanyRegistration): Promise<CompanyRegistration> {
    const id = this.currentCompanyRegistrationId++;
    const newRegistration: CompanyRegistration = { 
      ...registration, 
      id, 
      createdAt: new Date() 
    };
    this.companyRegistrations.set(id, newRegistration);
    return newRegistration;
  }

  async getCompanyRegistrations(): Promise<CompanyRegistration[]> {
    return Array.from(this.companyRegistrations.values());
  }
}

export const storage = new MemStorage();
