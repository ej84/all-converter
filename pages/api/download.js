import path from "path";
import fs from "fs/promises";

export default async function handler(req, res) {
    const { file } = req.query;
    const filePath = path.join("/tmp", file);

    try {
        const fileBuffer = await fs.readFile(filePath);
        res.setHeader("Content-Disposition", `attachment; filename=${file}`);
        res.setHeader("Content-Type", "application/octet-stream");
        res.status(200).send(fileBuffer);
    } catch (error) {
        console.error("File download error:", error);
        res.status(404).json({ message: "File not found" });
    }
}
