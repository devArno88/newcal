import { E_Roles } from "@/src/interfaces";
import AddCommentTwoToneIcon from "@mui/icons-material/AddCommentTwoTone";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import CodeTwoToneIcon from "@mui/icons-material/CodeTwoTone";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EventAvailableTwoToneIcon from "@mui/icons-material/EventAvailableTwoTone";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import MarkunreadMailboxTwoToneIcon from "@mui/icons-material/MarkunreadMailboxTwoTone";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
import QuestionAnswerTwoToneIcon from "@mui/icons-material/QuestionAnswerTwoTone";
import QuizTwoToneIcon from "@mui/icons-material/QuizTwoTone";
import ReportProblemTwoToneIcon from "@mui/icons-material/ReportProblemTwoTone";
import ReportTwoToneIcon from "@mui/icons-material/ReportTwoTone";
import RoomServiceTwoToneIcon from "@mui/icons-material/RoomServiceTwoTone";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import ThreePTwoToneIcon from "@mui/icons-material/ThreePTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone";
import WhatshotTwoToneIcon from "@mui/icons-material/WhatshotTwoTone";

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
export const Icon_Booking = EventAvailableTwoToneIcon;
export const Icon_Mailboard = MarkunreadMailboxTwoToneIcon;
export const Icon_Menu = MenuIcon;
export const Icon_Chat = ThreePTwoToneIcon;
export const Icon_Tickets = WarningTwoToneIcon;
export const Icon_Posts = WhatshotTwoToneIcon;
export const Icon_Dashboard = DashboardTwoToneIcon;
export const Icon_Logout = ExitToAppTwoToneIcon;
export const Icon_LikeActive = FavoriteTwoToneIcon;
export const Icon_LikeInactive = FavoriteBorderTwoToneIcon;
export const Icon_AddComment = AddCommentTwoToneIcon;
export const Icon_Delete = DeleteTwoToneIcon;
export const Icon_Send = SendTwoToneIcon;
export const Icon_Warning = ReportTwoToneIcon;
export const Icon_Login = LoginTwoToneIcon;

export const AdminIcons = {
    [E_Roles.management]: Icon_Management,
    [E_Roles.concierge]: Icon_Concierge,
    [E_Roles.development]: Icon_Developer,
};
