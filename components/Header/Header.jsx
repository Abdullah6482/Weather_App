import { TouchableOpacity, View } from "react-native";
import { s } from "./Header.style";
import { Txt } from "../Txt/Txt";
import { useNavigation } from "@react-navigation/native";

export function Header({ city }) {
  const nav = useNavigation();
  return (
    <View>
      <View style={s.container}>
        <TouchableOpacity style={s.back_btn} onPress={() => nav.goBack()}>
          <Txt>{"<"}</Txt>
        </TouchableOpacity>
        <View style={s.header_txts}>
          <Txt>{city.toUpperCase()}</Txt>
          <Txt style={s.subtitle}>7 days forecasts</Txt>
        </View>
      </View>
    </View>
  );
}
