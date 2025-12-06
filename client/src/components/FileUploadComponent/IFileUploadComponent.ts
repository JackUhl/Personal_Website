import { ChangeEvent } from "react";

export default interface IFileUploadComponent extends React.PropsWithChildren {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    fileExtension?: string;
}