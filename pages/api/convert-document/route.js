import { NextResponse } from "next/server";
import mammoth from "mammoth";
import pdf from "html-pdf-node";
import multer from "multer";
import { promisify } from "util";

// Next.js의 파일 업로드 처리기 설정
export const config = {
  api: {
    bodyParser: false,
  },
};

// Multer 설정
const storage = multer.memoryStorage(); // 메모리 저장소를 사용하여 파일을 메모리에 저장
const upload = multer({ storage });
const uploadMiddleware = promisify(upload.single("file"));

// 파일 변환 API
export default async function handler(req, res) {
  try {
    // 파일 업로드 처리
    await uploadMiddleware(req, res);

    const file = req.file;
    if (!file) {
      console.error("No file uploaded"); // 업로드된 파일이 없는 경우
      return res.status(400).send("No file uploaded");
    }

    console.log("File uploaded successfully:", file.originalname); // 파일이 성공적으로 업로드되었음을 확인

    // DOCX 파일을 HTML로 변환
    const { value: htmlContent } = await mammoth.convertToHtml({
      buffer: file.buffer,
    });
    console.log("Converted DOCX to HTML successfully"); // DOCX를 HTML로 성공적으로 변환했음을 확인

    // 변환된 HTML을 PDF로 변환
    const pdfBuffer = await pdf.generatePdf(
      { content: htmlContent },
      { format: "A4" }
    );
    console.log("Converted HTML to PDF successfully"); // HTML을 PDF로 성공적으로 변환했음을 확인

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="converted.pdf"'
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error during file conversion:", error); // 변환 중 발생한 모든 오류를 출력
    res.status(500).send("Error converting file");
  }
}
