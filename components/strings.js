import { Text } from "react-native";
import { useSelector } from "react-redux";
import { selectTranslations } from "../redux/i18n";

function StringsComponent(){
    const strings = useSelector(selectTranslations);
    return <Text>{strings.login}</Text>
}

export default StringsComponent;
