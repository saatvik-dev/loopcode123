import { users, type User, type InsertUser, type ContactSubmission, type InsertContact } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(data: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private userId: number;
  private contactId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.userId = 1;
    this.contactId = 1;
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
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(data: InsertContact): Promise<ContactSubmission> {
    const id = this.contactId++;
    const now = new Date();
    
    const submission: ContactSubmission = {
      id,
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      message: data.message,
      createdAt: now
    };
    
    this.contactSubmissions.set(id, submission);
    console.log(`New contact submission from ${data.name} (${data.email})`);
    
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
}

// Create and export a single instance of the storage
export const storage = new MemStorage();
