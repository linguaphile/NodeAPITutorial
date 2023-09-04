const fs = require("fs/promises")
const express = require("express")
const cors = require("cors")

/* const _: This defines a constant variable named _. The underscore (_) is a common convention for referring to the entire lodash library. */
const _ = require("lodash") 

/* This statement imports only the v4 function from the uuid library and renames it to uuid in the current scope. Here's the breakdown:
const {v4: uuid}: This is destructuring assignment syntax in JavaScript. It allows you to extract specific properties from an object and assign them to variables. In this case, it's extracting the v4 property and renaming it to uuid.
 */
const {v4: uuid} = require("uuid")

const app = express()
app.use(express.json()) // middleware to support json

app.get("/", (req, res) => {
    res.send("welcome to root")
})

app.get("/outfit", (req, res) => {
    const tops = ["Black", "White", "Orange", "Navy"]
    const jeans = ["Grey", "Dark Grey", "Black", "Navy"]
    const shoes = [ "White", "Grey", "Black"]
    // call the lodash sample functon to get a random array member
    res.json({
        top: _.sample(tops),
        jeans: _.sample(jeans),
        shoes: _.sample(shoes)
    })
})

app.post("/comments", async (req, res) => {
    const id = uuid();
    const content = req.body.content;

    if (!content){
        return res.sendStatus(400)

    }
   
    await fs.mkdir("data/comments", { recursive: true})
    await fs.writeFile(`data/comments/${id}.txt`, content)
    
    res.status(201).json({ id, content });
})

app.get("/comments/:id", async (req, res) => {
    const id = req.params.id
    let content

    try {
         content = await fs.readFile(`data/comments/${id}.txt`, "utf-8")
         console.log(content)
        } catch (err) {
            // TODO later on
        }
       
    res.json({
        content: content
    })
})


app.listen(3000, () => console.log("API Server is running on port 3000"))
