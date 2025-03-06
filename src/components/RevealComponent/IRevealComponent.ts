export default interface IRevealComponent extends React.PropsWithChildren {
    timeoutInterval: number;
    introDelay: boolean;
    delay?: number;
}