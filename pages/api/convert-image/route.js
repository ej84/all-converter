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

  const { format } = req.query; // 프론트엔드에서 보내는 'format' 매개변수
  const validFormats = ["jpeg", "png", "webp", "gif", "svg"];

  if (!validFormats.includes(format)) {
    return res.status(400).json({ error: "Invalid format" });
  }

  upload.single("file")(req, {}, async (err) => {
    if (err) {
      return res.status(500).json({ error: "File upload failed" });
    }

    try {
      const { width, height } = req.body;
      const intWidth = parseInt(width);
      const intHeight = parseInt(height);

      let transformer = sharp(req.file.buffer).resize({
        width: intWidth || null,
        height: intHeight || null,
        fit: "inside", // 이미지 비율을 유지하면서 크기 조정
      });

      switch (format) {
        case "jpeg":
          transformer = transformer.jpeg({ quality: 90, progressive: true });
          break;
        case "png":
          transformer = transformer.png({ compressionLevel: 9 });
          break;
        case "webp":
          transformer = transformer.webp({ quality: 90, lossless: true });
          break;
        default:
          break;
      }

      const buffer = await transformer.toBuffer();
      const fileName = `converted-${Date.now()}.${format}`;
      const outputPath = path.join("/tmp", fileName); // Vercel의 임시 저장소 경로

      await fs.writeFile(outputPath, buffer); // 임시 디렉토리에 파일 저장

      // API 엔드포인트를 통해 다운로드 URL 생성
      const downloadUrl = `${req.headers.origin}/api/download?file=${fileName}`;

      res.status(200).json({
        message: "File converted successfully",
        filePath: outputPath,
        downloadUrl: downloadUrl,
      });
    } catch (error) {
      console.error("Conversion error:", error);
      res.status(500).json({ error: "Image conversion failed" });
    }
  });
}
