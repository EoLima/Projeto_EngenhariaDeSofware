import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../components/Metrics"

import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  photoProfile: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(40),
    marginBottom: verticalScale(10),
    width: horizontalScale(140),
    height: verticalScale(140),
    borderRadius: moderateScale(75),
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  standardProfile: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc", // Cor de fundo para o espaço reservado
  },
  containerForm: {
    flexShrink: 0,
  },
  containerNameFull: {
    display: "flex",
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    flexShrink: 0,
  },
  formInput1: {
    paddingHorizontal: horizontalScale(10),
    width: horizontalScale(170),
    height: verticalScale(40),
    borderRadius: moderateScale(3),
    backgroundColor: "#DCDBDB",
  },
  formTitle: {
    color: "#000",
    fontSize: moderateScale(14),
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: verticalScale(17), // ou '121.429%'
    letterSpacing: -0.5,
    paddingHorizontal: horizontalScale(10),
  },
  formInput: {
    display: "flex",
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    alignItems: "center",
    flexShrink: 0,
    width: horizontalScale(355),
    height: verticalScale(40),
    borderRadius: moderateScale(3),
    backgroundColor: "#DCDBDB",
  },
  formInput2: {
    display: "flex",
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    alignItems: "center",
    flexShrink: 0,
    width: horizontalScale(170),
    height: verticalScale(40),
    borderRadius: moderateScale(3),
    backgroundColor: "#DCDBDB",
  },
  formCheckBox: {
    display: "flex",
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 0,
    textAlign: "center",
  },
  subCheckBox: {
    marginEnd: horizontalScale(5),
  },
  checkbox: {
    width: horizontalScale(15),
    height: verticalScale(15),
    borderRadius: moderateScale(8.168),
    backgroundColor: "#D9D9D9",
  },
  text: {
    color: "#000",
    fontSize: moderateScale(12),
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: verticalScale(17), // 212.5%
    letterSpacing: -0.5,
  },
  subForm: {
    display: "flex",
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
    justifyContent: "center",
    flexDirection: "row",
    flexShrink: 0,
  },
  subFormButton: {
    borderRadius: moderateScale(3),
    justifyContent: "center",
    width: horizontalScale(174),
    height: verticalScale(45.789),
    backgroundColor: "#73C74F",
  },
  subTextButton: {
    color: "#000",
    textAlign: "center",
    fontSize: moderateScale(16),
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: verticalScale(17),
    letterSpacing: -0.5,
  },
  subFormOtherAcess: {
    flexShrink: 0,
    marginTop: verticalScale(1),
  },
  subFormChoiceAcess: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: verticalScale(10),
  },
  line: {
    width: horizontalScale(87),
    height: verticalScale(2),
  },
  textSubFormAcess: {
    paddingHorizontal: horizontalScale(10),
    color: "#000",
    fontSize: moderateScale(14),
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: verticalScale(17),
    letterSpacing: -0.5,
  },
  containerLogo: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    marginHorizontal: horizontalScale(15),
  },
})
