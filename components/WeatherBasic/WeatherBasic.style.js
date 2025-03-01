import { StyleSheet } from "react-native";

const s = StyleSheet.create({
    clock: {
        alignItems: "flex-end",
    },
    interpretation: {
        alignSelf: "flex-end",
        transform: [{ rotate: "-90deg" }],
    },
    interpretation_txt: {
        fontSize: 20,
    },
    city: {
        textAlign: "left"
    },
    image: {
        height: 90,
        width: 90,

    },
    temperature_box: {
        alignItems: "baseline",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    temperature: {
        fontSize: 120,
    },

});

export { s };