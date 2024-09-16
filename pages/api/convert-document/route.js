import { NextResponse } from "next/server";
import mammoth from "mammoth";
import pdf from "html-pdf-node";
import formidable from "formidable";
import fs from "fs/promises";

// Next.js의 파일 업로드 처리기 설정
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  // Formidable을 사용하여 파일을 파싱
  const form = formidable({ multiples: false });

  const parseForm = () =>
    new Promise((resolve, reject) => {
      form.parse(request, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

  try {
    const { files } = await parseForm();
    const docxFile = files.file;

    // DOCX 파일을 HTML로 변환
    const docxBuffer = await fs.readFile(docxFile.filepath);
    const { value: htmlContent } = await mammoth.convertToHtml({
      buffer: docxBuffer,
    });

    // 변환된 HTML을 PDF로 변환
    const pdfBuffer = await pdf.generatePdf(
      { content: htmlContent },
      { format: "A4" }
    );

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="converted.pdf"',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error converting file", { status: 500 });
  }
}
