import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        width: "100%",
        paddingVertical: 8,
        paddingHorizontal: 20
      },
      productFooter: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: "#fff",
        width: "100%"
    }
})