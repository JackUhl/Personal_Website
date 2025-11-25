import { ChangeEvent, useState } from "react";
import { IEditResumeItemComponent } from "./IEditResumeItemComponent";
import { flexColumn, flexGrow, flexRow, fullWidth } from "../../../../styling/shared.module.css";
import TextInputComponent from "../../../../components/InputComponents/TextInputComponent/TextInputComponent";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import { descriptionContainer, label } from "./EditResumeItemComponent.module.css";
import TextAreaInputComponent from "../../../../components/InputComponents/TextAreaInputComponent/TextAreaInputComponent";
import DateInputComponent from "../../../../components/InputComponents/DateInputComponent/DateInputComponent";

export default function EditResumeItemComponent(props: IEditResumeItemComponent) {
    const [formData, setFormData] = useState(props.experienceItem);

    const handleMainTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            mainText: event.target.value
        });
    }

    const handleSubTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            subText: event.target.value
        });
    }

    const handlePositionTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            position: event.target.value
        });
    }

    const handleStartTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            start: event.target.value
        });
    }

    const handleEndTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            end: event.target.value
        });
    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const newDescription = [...formData.description];
        newDescription[index] = event.target.value;

        setFormData({
            ...formData,
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
                        value={formData.mainText}
                        onChange={handleMainTextChange}
                    />
                </div>
                <div className={flexGrow}>
                    <TextInputComponent
                        label="Location"
                        required={true}
                        value={formData.subText}
                        onChange={handleSubTextChange}
                    />
                </div>
            </div>
            <div className={classNameJoin([flexRow, flexGrow])}>
                <div className={flexGrow}>
                    <TextInputComponent
                        label="Position"
                        required={false}
                        value={formData.position}
                        onChange={handlePositionTextChange}
                    />
                </div>
                <div className={flexGrow}>
                    <DateInputComponent
                        label="Start Date"
                        required={true}
                        value={formData.start}
                        onChange={handleStartTextChange}
                    />
                </div>
                <div className={flexGrow}>
                    <DateInputComponent
                        label="End Date"
                        required={false}
                        value={formData.end}
                        onChange={handleEndTextChange}
                    />
                </div>
            </div>
            <p className={label}>Description</p>
            {formData.description.map((descriptionItem, index) => 
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