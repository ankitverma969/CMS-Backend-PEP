import express from "express";

const router = express.Router();

router.post("/webhook", (req, res) => {
    console.log( "GitHub webhook received.. ");
    console.log( "Body: ", req.body);

    res.status(200).json({
        received : true
    });

    res.json({
        received: true
    });
});

export default router;