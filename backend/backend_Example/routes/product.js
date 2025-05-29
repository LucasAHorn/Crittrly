const express = require("express");
const router = express.Router();

console.log("product.js active");

router.get("/", async (req, res) => {
    try {
        const db = req.app.locals.db;
        const query = "SELECT * FROM product_info";
        const [result] = await db.query(query); //execute the query and wait
        console.log("Success in Reading MySQL");
        //gets us our image from the blob format
        const resultWithImages = result.map(row =>{
          if (row.image != null) {
            const base64Image = Buffer.from(row.image).toString("base64");
            return {
              ...row,
              image: `data:image/jpeg;base64,${base64Image}`,
            };
          }
          return row;
        });

        res.status(200).send(resultWithImages);
        //  res.status(200).send(result);
    } catch (err) {
        // if an error is caught then send a appropriate error response
        console.error("Error in Reading MySQL :", err);
        res.status(500).send({ error: 'An error occured while fetching items. '});
    }
});

module.exports = router