import { ChangeEvent } from "react";
import { IEditExperienceItemComponent } from "./IEditExperienceItemComponent";
import { alignItemsCenter, flexColumn, flexGrow, flexRow, fullWidth, justifyContentCenter } from "../../../../styling/shared.module.css";
import TextInputComponent from "../../../../components/InputComponents/TextInputComponent/TextInputComponent";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import { closeIcon, container, descriptionSpacing, label, plusIcon } from "./EditExperienceItemComponent.module.css";
import TextAreaInputComponent from "../../../../components/InputComponents/TextAreaInputComponent/TextAreaInputComponent";
import DateInputComponent from "../../../../components/InputComponents/DateInputComponent/DateInputComponent";
import closeSvg from "../../../../assets/svg/close.svg";
import plusSvg from "../../../../assets/svg/plus.svg";
import OnClickButtonComponent from "../../../../components/OnClickButtonComponent/OnButtonButtonComponent";

export default function EditExperienceItemComponent(props: IEditExperienceItemComponent) {
    const handleMainTextChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newExperienceItems = [...props.experienceItems];
        newExperienceItems[index].mainText = event.target.value
        
        props.updateExperienceItem(newExperienceItems);
    }

    const handleSubTextChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newExperienceItems = [...props.experienceItems];
        newExperienceItems[index].subText = event.target.value
        
        props.updateExperienceItem(newExperienceItems);
    }

    const handlePositionTextChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newExperienceItems = [...props.experienceItems];
        newExperienceItems[index].position = event.target.value
        
        props.updateExperienceItem(newExperienceItems);
    }

    const handleStartTextChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newExperienceItems = [...props.experienceItems];
        newExperienceItems[index].start = event.target.value
        
        props.updateExperienceItem(newExperienceItems);
    }

    const handleEndTextChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newExperienceItems = [...props.experienceItems];
        newExperienceItems[index].end = event.target.value
        
        props.updateExperienceItem(newExperienceItems);
    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>, experienceIndex: number, descriptionIndex: number) => {
        const newExperienceItems = [...props.experienceItems];
        newExperienceItems[experienceIndex].description[descriptionIndex] = event.target.value
        
        props.updateExperienceItem(newExperienceItems);
    }

    const handleDescriptionAdd = (index: number) => {
        const newExperienceItems = [...props.experienceItems];
        newExperienceItems[index].description.push("")
        
        props.updateExperienceItem(newExperienceItems);
    }

    const handleDescriptionRemove = (experienceIndex: number, descriptionIndex: number) => {
        const newExperienceItems = [...props.experienceItems];
        newExperienceItems[experienceIndex].description.splice(descriptionIndex, 1);

        props.updateExperienceItem(newExperienceItems);
    }

    return (
        <>
            {props.experienceItems.map((experienceItem, experienceItemIndex) => (
                <div key={experienceItemIndex} className={classNameJoin([flexColumn, fullWidth])}>
                    <div className={classNameJoin([flexRow, flexGrow, container])}>
                        <div className={flexGrow}>
                            <TextInputComponent
                                label="Main Text"
                                required={true}
                                value={experienceItem.mainText}
                                onChange={(event) => handleMainTextChange(event, experienceItemIndex)}
                            />
                        </div>
                        <div className={flexGrow}>
                            <TextInputComponent
                                label="Location"
                                required={true}
                                value={experienceItem.subText}
                                onChange={(event) => handleSubTextChange(event, experienceItemIndex)}
                            />
                        </div>
                    </div>
                    <div className={classNameJoin([flexRow, flexGrow, container])}>
                        <div className={flexGrow}>
                            <TextInputComponent
                                label="Position"
                                required={false}
                                value={experienceItem.position}
                                onChange={(event) => handlePositionTextChange(event, experienceItemIndex)}
                            />
                        </div>
                        <div className={flexGrow}>
                            <DateInputComponent
                                label="Start Date"
                                required={true}
                                value={experienceItem.start}
                                onChange={(event) => handleStartTextChange(event, experienceItemIndex)}
                            />
                        </div>
                        <div className={flexGrow}>
                            <DateInputComponent
                                label="End Date"
                                required={false}
                                value={experienceItem.end}
                                onChange={(event) => handleEndTextChange(event, experienceItemIndex)}
                            />
                        </div>
                    </div>
                    <p className={label}>Description</p>
                    {experienceItem.description.map((descriptionItem, descriptionItemIndex) =>
                        <div key={descriptionItemIndex} className={classNameJoin([flexRow, alignItemsCenter, descriptionSpacing, container])}>
                            <TextAreaInputComponent
                                required={false}
                                value={descriptionItem}
                                onChange={(event) => handleDescriptionChange(event, experienceItemIndex, descriptionItemIndex)}
                            />
                            <OnClickButtonComponent
                                buttonElement={
                                    <div className={classNameJoin([flexRow])}>
                                        <img src={closeSvg} className={closeIcon} />
                                    </div>
                                }
                                onClick={() => handleDescriptionRemove(experienceItemIndex, descriptionItemIndex)}
                            />
                        </div>
                    )}
                    <div className={classNameJoin([flexRow, justifyContentCenter, container])}>
                        <OnClickButtonComponent
                            buttonElement={
                                <div className={classNameJoin([flexRow])}>
                                    <img src={plusSvg} className={plusIcon} />
                                </div>
                            }
                            onClick={() => handleDescriptionAdd(experienceItemIndex)}
                        />
                    </div>
                </div>
            ))}
        </>
    )
}