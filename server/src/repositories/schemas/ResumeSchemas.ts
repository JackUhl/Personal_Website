import { Schema } from "mongoose";
import { ExperienceItemDataInterface, ResumeDocumentDataInterface, TechnicalSkillDataInterface } from "../../models/data/ResumeModels";

export const ExperienceItemSchema = new Schema<ExperienceItemDataInterface>();

export const TechnicalSkillSchema = new Schema<TechnicalSkillDataInterface>();

export const ResumeDocumentSchema = new Schema<ResumeDocumentDataInterface>();