export interface ExperienceItem {
    mainText: string;
    subText: string;
    start: string;
    end?: string;
    position?: string;
    description: string[];
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