import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

// get dashboard data
export async function GET() {
  try {
    await connectDB();

    const totalUsers = await User.countDocuments();

    const totalAdmins = await User.countDocuments({
      role: "admin",
    });

    const totalNormalUsers = await User.countDocuments({
      role: "user",
    });

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("-password");

    return NextResponse.json({
      success: true,
      totalUsers,
      totalAdmins,
      totalNormalUsers,
      recentUsers,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}