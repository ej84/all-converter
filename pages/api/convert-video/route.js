// pages/api/convert-video.js

import multer from "multer";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs/promises";
import ffmpegPath from "ffmpeg-static";

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
      const tempFilePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        `temp-${Date.now()}`
      );
      const outputFilePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        `converted-${Date.now()}.mp4`
      );

      // Write uploaded file to temp path
      await fs.writeFile(tempFilePath, req.file.buffer);

      // Convert video to MP4 format
      ffmpeg.setFfmpegPath(ffmpegPath);
      ffmpeg(tempFilePath)
        .videoCodec("libx264")
        .output(outputFilePath)
        .on("end", async () => {
          // Remove temp file after conversion
          await fs.unlink(tempFilePath);

          res.status(200).json({
            message: "File converted successfully",
            filePath: `/uploads/${path.basename(outputFilePath)}`,
          });
        })
        .on("error", (error, stdout, stderr) => {
          console.error("FFmpeg error:", error.message);
          console.error("FFmpeg stderr:", stderr);
          res
            .status(500)
            .json({ error: `Conversion failed: ${error.message}` });
        })
        .run();
    } catch (error) {
      res
        .status(500)
        .json({ error: `File processing failed: ${error.message}` });
    }
  });
}
