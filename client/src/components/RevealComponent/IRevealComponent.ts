export default interface IRevealComponent extends React.PropsWithChildren {
    timeoutInterval?: number;
    repeat?: boolean;
    displayInline?: boolean;
    noAnimation?: boolean;
    noReveal?: boolean;
}