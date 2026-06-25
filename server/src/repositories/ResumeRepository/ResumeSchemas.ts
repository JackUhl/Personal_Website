import { Schema } from "mongoose";
import { ExperienceItemDataInterface, ResumeDocumentDataInterface, TechnicalSkillDataInterface } from "../../models/data/ResumeModels";

export const ExperienceItemSchema = new Schema<ExperienceItemDataInterface>({
    mainText: {
        type: String,
        required: true
    },
    subText: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: false
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: false
    },
    description: {
        type: [String],
        required: true
    }
}, { versionKey: false });

export const TechnicalSkillSchema = new Schema<TechnicalSkillDataInterface>({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
}, { versionKey: false });

export const ResumeDocumentSchema = new Schema<ResumeDocumentDataInterface>({
    data: {
        type: String,
        required: true
    }
}, { versionKey: false });