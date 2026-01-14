import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { addSubscriber } from "~/server/google-sheets";

export const emailRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(z.object({ email: z.string().email().min(1, "Email is required"), name: z.string().min(1, "Name is required") }))
    .mutation(async ({ input }) => {
      try {
        await addSubscriber(input.name, input.email);
        return { success: true, message: "Thank you for your interest!" };
      } catch (error) {
        console.error("Error saving subscriber:", error);
        throw new Error("Failed to save email. Please try again.");
      }
    }),
});
