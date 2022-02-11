import nc from "next-connect";
import Product from "../../models/Products";
import db from "../../utils/db";
import data from "../../utils/data";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  res.send({ message: "db seeded" });
});

export default handler;
