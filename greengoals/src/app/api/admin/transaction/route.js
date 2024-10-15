import { connectDB } from "../../../../lib/db";
import Transaction from "../../../../models/Transaction";
import User from "../../../../models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month");
    let query = {};

    if (month && month !== "all") {
      const monthNumber = parseInt(month);
      if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
        return NextResponse.json(
          { error: "Invalid month parameter" },
          { status: 400 }
        );
      }
      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear, monthNumber - 1, 1);
      const endDate = new Date(currentYear, monthNumber, 0, 23, 59, 59);

      query.createdAt = { $gte: startDate, $lte: endDate };
    }

    const transactions = await Transaction.find(query)
      .populate("user", "name")
      .sort({ createdAt: -1 });

    const totalRevenue = transactions.reduce(
      (sum, transaction) => sum + (transaction.amount || 0),
      0
    );

    return NextResponse.json({ transactions, totalRevenue });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء جلب المعاملات" },
      { status: 500 }
    );
  }
}
