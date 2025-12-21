export enum ExperienceItemKeys {
    MainText = 'mainText',
    SubText = 'subText',
    Start = 'start',
    End = 'end',
    Position = 'position',
    Description = 'description'
}

export interface ExperienceItem {
    [ExperienceItemKeys.MainText]: string;
    [ExperienceItemKeys.SubText]: string;
    [ExperienceItemKeys.Start]: string;
    [ExperienceItemKeys.End]?: string;
    [ExperienceItemKeys.Position]?: string;
    [ExperienceItemKeys.Description]: string[];
}

export interface TechnicalSkillItem {
    icon: string;
    name: string;
}

export interface ResumeDocument {
    data: string;
}

export interface ResumeItems {
    workExperiences: ExperienceItem[];
    educationExperiences: ExperienceItem[];
    technicalSkills: TechnicalSkillItem[];
    resumeDocument: ResumeDocument;
}