const fs = require("fs");

const path = require("path")

const { Transform } = require("stream");

const inputFilePath = path.join(__dirname, "input.txt");

const transformOutputFilePath=path.join(__dirname,"transformOutput.txt")

const readStream = fs.createReadStream(inputFilePath, { encoding: "utf-8" });

const writeStream = fs.createWriteStream(transformOutputFilePath);

const UpperCaseTransForm = new Transform({
    transform(chunk, encoding, callback) {
        const tranformData = chunk.toString().toUpperCase()
        this.push(tranformData)
        callback()
    }
})

readStream.pipe(UpperCaseTransForm).pipe(writeStream);