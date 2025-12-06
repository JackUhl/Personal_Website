import { ChangeEvent } from "react";
import { IEditExperienceItemComponent } from "./IEditExperienceItemComponent";
import { flexColumn, flexGrow, flexRow, fullWidth } from "../../../../styling/shared.module.css";
import TextInputComponent from "../../../../components/InputComponents/TextInputComponent/TextInputComponent";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import { descriptionContainer, label } from "./EditExperienceItemComponent.module.css";
import TextAreaInputComponent from "../../../../components/InputComponents/TextAreaInputComponent/TextAreaInputComponent";
import DateInputComponent from "../../../../components/InputComponents/DateInputComponent/DateInputComponent";

export default function EditExperienceItemComponent(props: IEditExperienceItemComponent) {
    const handleMainTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setResumeItems({
            ...props.experienceItem,
            mainText: event.target.value
        })
    }

    const handleSubTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setResumeItems({
            ...props.experienceItem,
            subText: event.target.value
        });
    }

    const handlePositionTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setResumeItems({
            ...props.experienceItem,
            position: event.target.value
        });
    }

    const handleStartTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setResumeItems({
            ...props.experienceItem,
            start: event.target.value
        });
    }

    const handleEndTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setResumeItems({
            ...props.experienceItem,
            end: event.target.value
        });
    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const newDescription = [...props.experienceItem.description];
        newDescription[index] = event.target.value;

        props.setResumeItems({
            ...props.experienceItem,
            description: newDescription
        });
    }

    return (
        <div className={classNameJoin([flexColumn, fullWidth])}>
            <div className={classNameJoin([flexRow, flexGrow])}>
                <div className={flexGrow}>
                    <TextInputComponent
                        label="Main Text"
                        required={true}
                        value={props.experienceItem.mainText}
                        onChange={handleMainTextChange}
                    />
                </div>
                <div className={flexGrow}>
                    <TextInputComponent
                        label="Location"
                        required={true}
                        value={props.experienceItem.subText}
                        onChange={handleSubTextChange}
                    />
                </div>
            </div>
            <div className={classNameJoin([flexRow, flexGrow])}>
                <div className={flexGrow}>
                    <TextInputComponent
                        label="Position"
                        required={false}
                        value={props.experienceItem.position}
                        onChange={handlePositionTextChange}
                    />
                </div>
                <div className={flexGrow}>
                    <DateInputComponent
                        label="Start Date"
                        required={true}
                        value={props.experienceItem.start}
                        onChange={handleStartTextChange}
                    />
                </div>
                <div className={flexGrow}>
                    <DateInputComponent
                        label="End Date"
                        required={false}
                        value={props.experienceItem.end}
                        onChange={handleEndTextChange}
                    />
                </div>
            </div>
            <p className={label}>Description</p>
            {props.experienceItem.description.map((descriptionItem, index) => 
                <div key={index} className={descriptionContainer}>
                    <TextAreaInputComponent
                        key={index}
                        required={false}
                        value={descriptionItem}
                        onChange={(event) => {
                            handleDescriptionChange(event, index) 
                        }}
                    />
                </div>
            )}
        </div>
    )
}