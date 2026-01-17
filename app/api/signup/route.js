import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/model/user";

export async function POST(req) {
  try {
    const event = await req.json();

    // Only handle user creation
    if (event.type !== "user.created") {
      return NextResponse.json({ ignored: true });
    }

    const emailAddresses = event.data?.email_addresses;

    if (!emailAddresses || emailAddresses.length === 0) {
      return NextResponse.json({ error: "No email found" }, { status: 400 });
    }

    const email = emailAddresses[0].email_address;

    const userdata = {
      name: email.split("@")[0],
      email,
    };

    await connectDB();

    await User.findOneAndUpdate(
      userdata,
      { upsert: true, new: true }
    );

    console.log("User saved from webhook:", email);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Clerk webhook error:", err);
    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    );
  }
}
