import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";

// التعامل مع طلبات PATCH
export async function PATCH(req, { params }) {
  const { id } = params; // الحصول على ID المستخدم من params
  await connectDB();

  try {
    const body = await req.json(); // قراءة بيانات الطلب
    const user = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return new Response(JSON.stringify({ success: false }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, data: user }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 400,
      }
    );
  }
}
