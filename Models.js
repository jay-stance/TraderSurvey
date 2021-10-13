const mongoose = require("mongoose")
const Joi = require("joi")

const answerSchema = new mongoose.Schema({
    reply: [{
        question: { type: String, maxlength: 1024 },
        options: { type: String, maxlength: 1024 }
    }]
})


const Reply = mongoose.model("Reply", answerSchema)

function validate_reply(reply) {
    const schema = Joi.object({
        reply: Joi.array().required()
    })
    return schema.validate(reply);
}


exports.validate_reply = validate_reply;
exports.Reply = Reply;