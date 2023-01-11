export default interface RegistrationProps {
    isOpen: boolean;
    onClickToggle: (
        e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
    ) => void;
}
