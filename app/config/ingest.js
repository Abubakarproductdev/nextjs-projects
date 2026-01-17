import { inngest } from "./client";
import { connectDB } from "../lib/mongodb";
import User from "../model/User";

export const handleSignup = inngest.createFunction(
  { id: "clerk-user-creation" },
  { event: "clerk.user.created" },
  async ({ event }) => {
    const { email_addresses } = event.data;

    if (!email_addresses || email_addresses.length === 0) return;

    const userdata = {
      name: email_addresses[0].email_address.split("@")[0],
      email: email_addresses[0].email_address,
    };

    // connect to MongoDB
    await connectDB();

    // create or update user
    await User.findOneAndUpdate(
      { email: userdata.email },
      userdata,
      { upsert: true, new: true }
    );

    console.log("User saved from webhook:", userdata.email);
  }
);
