// pages/api/convert.js

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

  upload.single("file")(req, {}, async (err) => {
    if (err) {
      return res.status(500).json({ error: "File upload failed" });
    }

    try {
      const buffer = await sharp(req.file.buffer).jpeg().toBuffer();

      const fileName = `converted-${Date.now()}.jpg`;
      const outputPath = path.join(
        process.cwd(),
        "public",
        "uploads",
        fileName
      );

      await fs.writeFile(outputPath, buffer);

      res
        .status(200)
        .json({
          message: "File converted successfully",
          filePath: `/uploads/${fileName}`,
        });
    } catch (error) {
      res.status(500).json({ error: "Image conversion failed" });
    }
  });
}
