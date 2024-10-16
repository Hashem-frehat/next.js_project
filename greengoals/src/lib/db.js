// // src/lib/db.js
// import mongoose from "mongoose";

// export async function connectDB() {
//   try {
//     await mongoose.connect(
//       process.env.MONGODB_URI,
//       {
//         // useNewUrlParser: true,
//         // useUnifiedTopology: true,
//       }
//     );
//     console.log("MongoDB connected successfully");
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   }
// }

// // src/lib/db.js
import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
