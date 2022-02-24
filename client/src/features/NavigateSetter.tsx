import { useNavigate } from 'react-router-dom';
import History from "../app/helpers/History";
export const NavigateSetter = () => {
    // @ts-ignore
    History.navigate = useNavigate();

    return null;
};