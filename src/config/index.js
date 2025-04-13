import dotenv from "dotenv";
dotenv.config();

const config = {
    //dB Connection
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.DB_URL || "mongodb://localhost:27017/Blogs",

    //JWT
    JWT_SECRET :process.env.JWT_SECRET || "yoursecretkey",
    JWT_EXPIRY :process.env.JWT_EXPIRY || "7d"
}

export default config;
