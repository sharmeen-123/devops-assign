"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const campaign_controller_1 = __importDefault(require("../controller/campaign.controller"));
const campaignRouter = express_1.default.Router();
campaignRouter.post("/addCampaign", campaign_controller_1.default.addCampaign);
campaignRouter.get("/getCampaigns", campaign_controller_1.default.getCampaigns);
campaignRouter.delete("/deleteCampaign", campaign_controller_1.default.deleteCampaign);
exports.default = campaignRouter;
//# sourceMappingURL=campaign.route.js.map