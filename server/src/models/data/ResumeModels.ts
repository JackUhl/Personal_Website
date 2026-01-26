export interface ExperienceItemDataInterface {
    mainText: string,
    subText: string,
    position?: string,
    start: Date,
    end?: Date,
    description: string[]
}

export interface TechnicalSkillDataInterface {
    name: string,
    icon: string
}

export interface ResumeDocumentDataInterface {
    data: string
}