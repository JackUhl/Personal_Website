export interface ExperienceItem {
    mainText: string;
    subText: string;
    start: Date;
    end?: Date;
    position?: string;
    description: string;
}

export interface TechnicalSkillItem {
    icon: string;
    name: string;
}

export interface ResumeItems {
    workExperiences: ExperienceItem[];
    educationExperiences: ExperienceItem[];
    technicalSkills: TechnicalSkillItem[];
}