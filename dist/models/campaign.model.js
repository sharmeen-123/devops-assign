"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const campaignSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    character: {
        type: String,
        required: true,
    },
    map: {
        type: String,
        required: true,
    },
    startedBy: {
        type: String,
        required: true,
    },
    progress: {
        type: Number,
        required: true,
    },
});
exports.default = mongoose.model("campaign", campaignSchema, "campaigns");
//# sourceMappingURL=campaign.model.js.map