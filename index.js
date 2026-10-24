const express = require("express");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Velkommen til Express expedition!")
})
app.get("/about", (req, res) => {
    res.json({message: "about the roundabout stuff about cars"} )
})
app.get("/json", (req, res) => {
    if (req.method === "GET" && req.url === "/json") {
        const obj = {
            name: "hammer",
            model: "sledge"
        };
        res.json(obj);
    }
})
app.post("/submit", (req, res) => {
    const name = req.body?.name;

    if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            error: "Navn mangler"
        });
    }

    res.status(200).json({
        message: `Velkommen, ${name}!`
    });
});
app.post("/math", (req, res) => {
    const { a, b } = req.body;

    if (typeof a !== "number" || typeof b !== "number") {
        return res.status(400).json({
            error: "Ugyldige tal"
        });
    }

    res.status(200).json({
        result: a + b
    });
});
app.get("/hello/:name", (req, res) => {
    const name = req.params.name;

    if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            error: "Navn mangler"
        });
    }
    res.status(200).json({
        message: `Hej, ${name}!`
    })
});
app.get("/user/:id", async (req, res) => {
    const id = req.params.id;

   if (!/^\d+$/.test(id) || Number(id) <= 0) {
        return res.status(400).json({
            error: "Invalid user ID"
        });
    }
    res.json({ userId: req.params.id });
})
app.get("/error", (req, res) => {
    throw new Error("Noget gik galt!");
});
app.use((req, res) => {
    res.status(404).json({
        error: "Routen findes ikke"
    });
});
app.use((err, req, res, next) => {
    console.error(err.message);

    res.status(500).json({
        error: "Intern serverfejl"
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});