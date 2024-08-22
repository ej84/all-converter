// pages/api/convert-image
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, so multer can handle the file upload
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // 'format'이 클라이언트 사이드에서 전달되는 파일 형식을 받아옵니다.
  const { format } = req.query; // 프론트엔드에서 보내는 'format' 매개변수

  // 지원하는 파일 형식들을 정의합니다.
  const validFormats = ["jpeg", "png", "webp"];

  // format 값이 유효한지 확인합니다.
  if (!validFormats.includes(format)) {
    return res.status(400).json({ error: "Invalid format" });
  }

  upload.single("file")(req, {}, async (err) => {
    if (err) {
      return res.status(500).json({ error: "File upload failed" });
    }

    try {
      // sharp에서 format을 동적으로 적용합니다.
      const buffer = await sharp(req.file.buffer).toFormat(format).toBuffer();

      const fileName = `converted-${Date.now()}.${format}`;
      const outputPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        fileName
      );

      await fs.writeFile(outputPath, buffer);

      // 파일 경로를 사용하여 다운로드 링크를 생성합니다.
      const downloadUrl = `${req.headers.origin}/uploads/${fileName}`;

      res.status(200).json({
        message: "File converted successfully",
        filePath: `/uploads/${fileName}`,
        downloadUrl: downloadUrl,
      });
    } catch (error) {
      res.status(500).json({ error: "Image conversion failed" });
    }
  });
}
