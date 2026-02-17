import Joi from 'joi';
import { ExperienceItemDataInterface, ResumeDocumentDataInterface, ResumeRequest, TechnicalSkillDataInterface } from '../../models/data/ResumeModels';

export const ExperienceItemValidator = Joi.object<ExperienceItemDataInterface>({
    mainText: Joi.string().required(),
    subText: Joi.string().required(),
    position: Joi.string().optional().allow(""),
    start: Joi.date().required(),
    end: Joi.date().optional(),
    description: Joi.array().items(Joi.string()).required()
});

export const TechnicalSkillValidator = Joi.object<TechnicalSkillDataInterface>({
    name: Joi.string().required(),
    icon: Joi.string().required()
});

export const ResumeDocumentValidator = Joi.object<ResumeDocumentDataInterface>({
    data: Joi.string().required()
});

export const ResumeRequestValidator = Joi.object<ResumeRequest>({
    workExperiences: Joi.array().items(ExperienceItemValidator).required(),
    educationExperiences: Joi.array().items(ExperienceItemValidator).required(),
    technicalSkills: Joi.array().items(TechnicalSkillValidator).required(),
    resumeDocument: ResumeDocumentValidator.required()
});