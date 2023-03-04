import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import CodeTwoToneIcon from "@mui/icons-material/CodeTwoTone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
import QuestionAnswerTwoToneIcon from "@mui/icons-material/QuestionAnswerTwoTone";
import QuizTwoToneIcon from "@mui/icons-material/QuizTwoTone";
import ReportProblemTwoToneIcon from "@mui/icons-material/ReportProblemTwoTone";
import RoomServiceTwoToneIcon from "@mui/icons-material/RoomServiceTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { E_Roles } from "../interfaces";

export const Icon_Developer = CodeTwoToneIcon;
export const Icon_Concierge = RoomServiceTwoToneIcon;
export const Icon_Management = ManageAccountsTwoToneIcon;
export const Icon_Listing = HomeTwoToneIcon;
export const Icon_Question = QuizTwoToneIcon;
export const Icon_Notice = NotificationsNoneTwoToneIcon;
export const Icon_Info = InfoTwoToneIcon;
export const Icon_Enhancement = AutoAwesomeTwoToneIcon;
export const Icon_Issue = ReportProblemTwoToneIcon;
export const Icon_View = VisibilityTwoToneIcon;
export const Icon_Like = FavoriteIcon;
export const Icon_Comment = QuestionAnswerTwoToneIcon;

export const AdminIcons = {
    [E_Roles.concierge]: Icon_Concierge,
    [E_Roles.development]: Icon_Developer,
    [E_Roles.management]: Icon_Management,
};
