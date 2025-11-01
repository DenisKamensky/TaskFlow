import {useState, useCallback} from 'react';

export const useToggle = () => {
    const [flag, setFlag] = useState<boolean>(false);
    const setTrue = useCallback(() => {}, []);
};