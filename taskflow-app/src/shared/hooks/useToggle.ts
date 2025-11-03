import {useState, useCallback} from "react";

export type UseToggle = {
    value: boolean;
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
    setValue: (value: boolean) => void;
}

export const useToggle = (initialValue: boolean = false): UseToggle => {
    const [value, setStateValue] = useState<boolean>(initialValue);
    const toggle = useCallback(() => {
        setStateValue((prev) => !prev);
    }, []);
    const setTrue = useCallback(() => setStateValue(true), []);
    const setFalse = useCallback(() => setStateValue(false), []);
    const setValue = useCallback((val: boolean) => setStateValue(val), []);

    return {
        value,
        toggle,
        setTrue,
        setFalse,
        setValue,
    };
}