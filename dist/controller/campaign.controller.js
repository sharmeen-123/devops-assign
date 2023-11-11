"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const campaign_model_1 = __importDefault(require("../models/campaign.model"));
const campaignController = {
    addCampaign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let campaignData = req.body;
            let campaign = new campaign_model_1.default(campaignData);
            const mapExists = yield campaign_model_1.default.findOne({
                name: campaign.name,
                startedBy: campaign.startedBy,
            });
            if (mapExists) {
                res.status(400).send("name exists");
            }
            else {
                campaign.save((error, map) => {
                    if (error) {
                        res.send(error.message);
                    }
                    else {
                        res.status(200).send({
                            mapDetails: map,
                        });
                    }
                });
            }
        });
    },
    getCampaigns(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.query;
            let data = yield campaign_model_1.default.find({
                startedBy: user.startedBy,
            });
            res.status(200).send({
                data: data,
            });
        });
    },
    deleteCampaign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let campaignData = req.body;
            yield campaign_model_1.default.deleteOne({
                name: campaignData.campaignName,
            }, (err, suc) => {
                if (err) {
                    res.status(404).send("campaign not found");
                }
                else {
                    if (suc.deletedCount == 1) {
                        res.send("deleted");
                    }
                    else
                        res.status(404).send("campaign not found");
                }
            });
        });
    },
};
exports.default = campaignController;
//# sourceMappingURL=campaign.controller.js.map