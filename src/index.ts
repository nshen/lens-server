import express, { Request, Response } from "express";
import cache from "memory-cache";
import { getPublicationFields } from "./api";

const app = express();
const port = process.env.PORT || 3333;

app.get("/", async (req: Request, res: Response) => {
  const publicationId = req.query.id;
  if (!publicationId || typeof publicationId !== "string")
    return res.status(404).json({ error: 404, message: "Missing id" });
  if (!cache.get(publicationId)) {
    let result;
    try {
      result = await getPublicationFields(publicationId);
    } catch (error) {
      return res
        .status(404)
        .send({ error: 404, message: `Can not find ${publicationId}` });
    }
    // remove in 30 minutes
    cache.put(publicationId, result, 30 * 60 * 1000);
  }
  res.json(cache.get(publicationId));
});

app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});
