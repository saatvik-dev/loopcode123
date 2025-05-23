import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = contactFormSchema.parse(req.body);
      
      // Store the contact submission
      const submission = await storage.createContactSubmission({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || "",
        message: validatedData.message,
      });
      
      res.status(201).json({
        message: "Contact form submitted successfully",
        data: submission
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      } else {
        console.error("Error processing contact form:", error);
        res.status(500).json({ 
          message: "An error occurred while processing your request" 
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
