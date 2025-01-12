import { logger } from "../util/logger";
import { PrismaClient } from "@prisma/client"; // Use ES module import

const prisma = new PrismaClient();

export async function addUser(phoneNumber: string) {
    try {
        logger.info("Reached service: addUser");

        const user = await prisma.user.create({
            data: {
                phone_number: phoneNumber,
            },
        });

        logger.info("User created successfully", { user });
        return user;
    } catch (error: any) {
        logger.error("Error creating user: ", error.message);
        throw new Error(error.message);
    } finally {
        await prisma.$disconnect();
    }
}

export async function findUser(phoneNumber: string) {
    try {
        logger.info("Reached service: findUser");

        const user = await prisma.user.findUnique({
            where: {
                phone_number: phoneNumber,
            },
        });

        if (user) {
            logger.info("User found successfully", { user });
        } else {
            logger.warn("User not found", { phoneNumber });
        }

        return user;
    } catch (error: any) {
        logger.error("Error finding user: ", error.message);
        throw new Error(error.message);
    } finally {
        await prisma.$disconnect();
    }
}
