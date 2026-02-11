import nodeCron from "node-cron";
import { artifactSchema } from "../models/artifact.js";

// Schedule a task to run every day at midnight
export const testingCron = () => {

    // 1st Star: Represent minutes (0-59)
    // 2nd Star: Represent hours (0-23)
    // 3rd Star: Represent day of the month (1-31)
    // 4th Star: Represent month (1-12)
    // 5th Star: Represent day of the week (0-6) (Sunday to Saturday)
    console.log("Testing Cron Job function scheduled");

    nodeCron.schedule("21 15 * * *", () => {

        console.log("Running Testing Cron Job function");
    });
};

// if draft till 30 days then move to archived

export const moveDraftToArchived = () => {

    nodeCron.schedule("0 0 * * *", async () => {
        console.log("Running moveDraftToArchived Cron Job function");
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        try {
            const result = await artifactSchema.updateMany(
                { status: "DRAFT", createdAt: { $lte: thirtyDaysAgo } },
                { status: "ARCHIVED" }
            );
            console.log(`Moved ${result.nModified} artifacts from DRAFT to ARCHIVED.`);
        } catch (error) {
            console.error("Error moving artifacts from DRAFT to ARCHIVED:", error);
        }

    });
};