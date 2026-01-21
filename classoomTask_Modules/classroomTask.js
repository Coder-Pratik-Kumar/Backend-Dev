const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.post("/complain", (req, res) => {
    const { name, issue, priority } = req.body;

    const ticketId = "TKT-" + Math.floor(Math.random() * 1000000);
    const complaintData = `
Ticket ID: ${ticketId}
Name: ${name}
Issue: ${issue}
Priority: ${priority}
-------------------------
`;

    
    const fileName =
        priority === "high" ? "URGENT.txt" : "normal_complaints.txt";

    fs.appendFileSync(fileName, complaintData);
    res.json({
        ticketId: ticketId,
        message: "We will solve your issue soon."
    });
});

app.listen(3000, () => {  
    console.log("Server running on port 3000");
});
