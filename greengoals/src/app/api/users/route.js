import { connectDB } from "../../../lib/db";
import User from "../../../models/User";

// دالة للتعامل مع طلبات GET
export async function GET(req, res) {
  await connectDB();

  try {
    const users = await User.find({}).select("-password"); // جلب جميع المستخدمين مع استثناء كلمة المرور
    return new Response(JSON.stringify(users), { status: 200 }); // إرسال البيانات كـ JSON
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), { status: 400 });
  }
}
