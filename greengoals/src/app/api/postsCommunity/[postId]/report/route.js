import { connectDB } from "../../../../../lib/db";
import Comunity from "../../../../../models/postcomunity";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { postId } = params;
  const { reason, userId } = await req.json();

  console.log("Post ID:", postId);
  console.log("Reason:", reason);
  console.log("User ID:", userId);

  await connectDB();

  try {
    const post = await Comunity.findById(postId);

    if (!post) {
      console.error("Post not found");
      return NextResponse.json(
        { success: false, message: "المنشور غير موجود" },
        { status: 404 }
      );
    }

    if (!post.reportFlag) {
      post.reportFlag = {
        isReported: false,
        reports: [],
      };
    }

    const alreadyReported = post.reportFlag.reports.some(
      (report) => report.user.toString() === userId
    );

    if (alreadyReported) {
      console.error("User has already reported this post");
      return NextResponse.json(
        {
          success: false,
          message: "لقد قمت بالإبلاغ عن هذا المنشور بالفعل",
        },
        { status: 400 }
      );
    }

    // إضافة التقرير الجديد
    post.reportFlag.reports.push({ reason, user: userId });
    post.reportFlag.isReported = true;

    console.log(
      "Reports array after adding new report:",
      post.reportFlag.reports
    );

    // حفظ المنشور واسترجاع النسخة المحدثة مباشرة
    const updatedPost = await post.save({ returnDocument: "after" });

    console.log("Updated post from DB:", updatedPost.reportFlag);

    return NextResponse.json(
      { success: true, message: "تم الإبلاغ عن المنشور بنجاح", updatedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during request:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
