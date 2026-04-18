import ITextInputComponent from "../InputComponents/TextInputComponent/ITextInputComponent";

export default interface IFileUploadComponent extends ITextInputComponent {
    onUpload: (url: string) => void;
    fileExtension?: string;
}