import ExperienceItemComponent from "./ExperienceItemComponent/ExperienceItemComponent";
import { IDisplayExperienceItemsComponent } from "./IDisplayExperienceItemsComponent";

export default function DisplayExperienceItemsComponent(props: IDisplayExperienceItemsComponent) {
    return (
        <>
            {props.experienceItems.map((experienceItem, index) => (
                <ExperienceItemComponent
                    key={index}
                    experienceItem={experienceItem}
                    isLastItem={index === props.experienceItems.length - 1}
                />
            ))}
        </>
    )
}