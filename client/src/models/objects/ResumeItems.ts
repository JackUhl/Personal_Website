import { MongoItem, MongoItemKeys } from "./MongoItem";

export enum ExperienceItemKeys {
    MainText = 'mainText',
    SubText = 'subText',
    Start = 'start',
    End = 'end',
    Position = 'position',
    Description = 'description'
}

export enum TechnicalSkillKeys {
    Icon = "icon",
    Name = "name"
}

export enum ResumeDocumentKeys {
    Data = "data"
}

export interface ExperienceItem extends MongoItem {
    [ExperienceItemKeys.MainText]: string;
    [ExperienceItemKeys.SubText]: string;
    [ExperienceItemKeys.Start]: string;
    [ExperienceItemKeys.End]?: string;
    [ExperienceItemKeys.Position]?: string;
    [ExperienceItemKeys.Description]: string[];
}

export const DefaultExperienceItem: ExperienceItem = {
    [MongoItemKeys._Id]: "",
    [ExperienceItemKeys.MainText]: "",
    [ExperienceItemKeys.SubText]: "",
    [ExperienceItemKeys.Start]: "",
    [ExperienceItemKeys.End]: "",
    [ExperienceItemKeys.Position]: "",
    [ExperienceItemKeys.Description]: [""]
}

export interface TechnicalSkillItem extends MongoItem {
    [TechnicalSkillKeys.Icon]: string;
    [TechnicalSkillKeys.Name]: string;
}

export const DefaultTechnicalSkillItem: TechnicalSkillItem = {
    [MongoItemKeys._Id]: "",
    [TechnicalSkillKeys.Icon]: "",
    [TechnicalSkillKeys.Name]: ""
}

export interface ResumeDocument extends MongoItem {
    [ResumeDocumentKeys.Data]: string;
}

export interface ResumeItems {
    workExperiences: ExperienceItem[];
    educationExperiences: ExperienceItem[];
    technicalSkills: TechnicalSkillItem[];
    resumeDocument: ResumeDocument;
}