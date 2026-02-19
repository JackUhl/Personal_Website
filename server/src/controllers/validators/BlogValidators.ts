import Joi from "joi";
import { ContentType, MutateBlogRequest } from "../../models/data/BlogModels";

export const MutateBlogRequestValidator = Joi.object<MutateBlogRequest>().keys({
    title: Joi.string().required(),
    primaryImage: Joi.string().required(),
    shortDescription: Joi.string().required(),
    createdDate: Joi.date().required(),
    tags: Joi.array().items(Joi.string()).required(),
    content: Joi.array().items(
        Joi.alternatives().try(
            Joi.object().keys({
                type: Joi.string().valid(ContentType.Text),
                content: Joi.string().required()
            }),
            Joi.object().keys({
                type: Joi.string().valid(ContentType.Media),
                media: Joi.string().required(),
                subText: Joi.string().optional()
            }),
            Joi.object().keys({
                type: Joi.string().valid(ContentType.Merv),
                text: Joi.string().required()
            }),
            Joi.object().keys({
                type: Joi.string().valid(ContentType.Resources),
                resources: Joi.array().items(
                    Joi.object().keys({
                        resource: Joi.string().required(),
                        link: Joi.string().required()
                    })
                ).required()
            })
        )
    ).required()
});