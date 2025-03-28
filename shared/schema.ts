import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const userRegistration = pgTable("user_registrations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserRegistrationSchema = createInsertSchema(userRegistration).pick({
  name: true,
  email: true,
});

export const companyRegistration = pgTable("company_registrations", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  description: text("description").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCompanyRegistrationSchema = createInsertSchema(companyRegistration).pick({
  companyName: true,
  description: true,
  contactName: true,
  contactEmail: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertUserRegistration = z.infer<typeof insertUserRegistrationSchema>;
export type UserRegistration = typeof userRegistration.$inferSelect;

export type InsertCompanyRegistration = z.infer<typeof insertCompanyRegistrationSchema>;
export type CompanyRegistration = typeof companyRegistration.$inferSelect;
