import nodeCron from "node-cron";

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