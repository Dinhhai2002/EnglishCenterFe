import SuspenseLoader from "@/components/SuspenseLoader";
import About from "@/pages/About";
import Blog from "@/pages/Blog/Blog";
import BlogDetail from "@/pages/BlogDetail/BlogDetail";
import Contact from "@/pages/Contact";
import CourseDetail from "@/pages/CourseDetail/CourseDetail";
import CourseOnline from "@/pages/CourseOnline/CourseOnline";
import DoExamOnline from "@/pages/DoExamOnline/DoExamOnline";
import Exam from "@/pages/Exam/Exam";
import ExamDetail from "@/pages/ExamDetail/ExamDetail";
import ForgotPassword from "@/pages/ForgotPassword/ForgotPassword";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import MyAccount from "@/pages/MyAccount/MyAccount";
import MyCourse from "@/pages/MyCourse/MyCourse";
import OTP from "@/pages/OTP/Otp";
import Payment from "@/pages/Payment/Payment";
import PaymentSuccess from "@/pages/PaymentSuccess/PaymentSuccess";
import Profile from "@/pages/Profile/Profile";
import Register from "@/pages/Register/Register";
import ResetPassword from "@/pages/ResetPassword/ResetPassword";
import { ResultExamDetail } from "@/pages/ResultExamDetail/ResultExamDetail";
import StudyPlan from "@/pages/StudyPlan/StudyPlan";
import VideoCourse from "@/pages/VideoCourse/VideoCourse";
import { Suspense } from "react";

export const routes = {
  Home: "/",
  MyCourse: "/my-course",
  StudyPlan: "/study-plan",
  Exam: "/exam",
  CourseOnline: "/course",
  CourseOnlineDetail: "/course/:id",
  VideoCourse: "/course/:courseId/learning/:lessonsId",
  Payment: "/payment/course/:id",
  PaymentSuccess: "/payment-success",
  MyAccount: "/my-account",
  ExamDetail: "/tests/:id/:name",
  DoExamOnline: "/tests/:id/:name/start",
  ResultExamDetail: "/tests/:id/:name/results/:resultId",
  Contact: "/contact",
  About: "/about",
  Login: "/authentication/login",
  Register: "/authentication/register",
  ForgotPassword: "/authentication/forgot-password",
  OTP: "/authentication/otp",
  ResetPassword: "/authentication/reset-password",
  Profile: "/profile",
  Blog: "/blog",
  BlogDetail: "/blog/:id",
};

export const publicRoutes = [
  { path: routes.Home, component: Home },
  { path: routes.MyCourse, component: MyCourse },
  { path: routes.StudyPlan, component: StudyPlan },
  { path: routes.Exam, component: Exam },
  { path: routes.CourseOnline, component: CourseOnline },
  { path: routes.CourseOnlineDetail, component: CourseDetail },
  { path: routes.VideoCourse, component: VideoCourse },
  { path: routes.Payment, component: Payment },
  { path: routes.PaymentSuccess, component: PaymentSuccess },
  { path: routes.MyAccount, component: MyAccount },
  { path: routes.ExamDetail, component: ExamDetail },
  { path: routes.DoExamOnline, component: DoExamOnline },
  { path: routes.ResultExamDetail, component: ResultExamDetail },
  { path: routes.Contact, component: Contact },
  { path: routes.About, component: About },
  { path: routes.Login, component: Login },
  { path: routes.Register, component: Register },
  { path: routes.ForgotPassword, component: ForgotPassword },
  { path: routes.OTP, component: OTP },
  { path: routes.ResetPassword, component: ResetPassword },
  { path: routes.Profile, component: Profile },
  { path: routes.Blog, component: Blog },
  { path: routes.BlogDetail, component: BlogDetail },
];

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// const Home = Loader(lazy(() => import("@/pages/Home/Home")));

// const MyCourse = Loader(lazy(() => import("@/pages/MyAccount/MyAccount")));

// const StudyPlan = Loader(lazy(() => import("@/pages/StudyPlan/StudyPlan")));

// const Exam = Loader(lazy(() => import("@/pages/Exam/Exam")));

// const CourseOnline = Loader(
//   lazy(() => import("@/pages/CourseOnline/CourseOnline"))
// );

// const CourseOnlineDetail = Loader(
//   lazy(() => import("@/pages/CourseDetail/CourseDetail"))
// );

// const VideoCourse = Loader(
//   lazy(() => import("@/pages/VideoCourse/VideoCourse"))
// );

// const Payment = Loader(lazy(() => import("@/pages/Payment/Payment")));

// const PaymentSuccess = Loader(
//   lazy(() => import("@/pages/PaymentSuccess/PaymentSuccess"))
// );

// const MyAccount = Loader(lazy(() => import("@/pages/MyAccount/MyAccount")));

// const ExamDetail = Loader(lazy(() => import("@/pages/ExamDetail/ExamDetail")));

// const DoExamOnline = Loader(
//   lazy(() => import("@/pages/DoExamOnline/DoExamOnline"))
// );

// const ResultExamDetail = Loader(
//   lazy(() => import("@/pages/ResultExamDetail/ResultExamDetail"))
// );
// const Contact = Loader(lazy(() => import("@/pages/Contact")));
// const About = Loader(lazy(() => import("@/pages/About")));
// const Login = Loader(lazy(() => import("@/pages/Login/Login")));
// const Register = Loader(lazy(() => import("@/pages/Register/Register")));

// const ForgotPassword = Loader(
//   lazy(() => import("@/pages/ForgotPassword/ForgotPassword"))
// );

// const OTP = Loader(lazy(() => import("@/pages/OTP/Otp")));

// const ResetPassword = Loader(
//   lazy(() => import("@/pages/ResetPassword/ResetPassword"))
// );

// const Profile = Loader(lazy(() => import("@/pages/Profile/Profile")));

// export const routers: RouteObject[] = [
//   {
//     path: "",
//     // element: <Header />,
//     children: [
//       {
//         path: "",
//         element: <Home />,
//       },
//       {
//         path: "my-course",
//         element: <MyCourse />,
//       },
//       {
//         path: "study-plan",
//         element: <StudyPlan />,
//       },
//       {
//         path: "exam",
//         element: <Exam />,
//       },

//       {
//         path: "payment/course/:id",
//         element: <Payment />,
//       },
//       {
//         path: "payment-success",
//         element: <PaymentSuccess />,
//       },
//       {
//         path: "my-account",
//         element: <MyAccount />,
//       },
//       {
//         path: "tests/:id/:name",
//         element: <ExamDetail />,
//       },
//       {
//         path: "tests/:id/:name/start",
//         element: <DoExamOnline />,
//       },
//       {
//         path: "tests/:id/:name/results/:resultId",
//         element: <ResultExamDetail />,
//       },
//       {
//         path: "contact",
//         element: <Contact />,
//       },
//       {
//         path: "about",
//         element: <About />,
//       },
//       {
//         path: "profile",
//         element: <Profile />,
//       },
//     ],
//   },
//   {
//     path: "",
//     children: [
//       {
//         path: "*",
//         element: <Page404 />,
//       },
//     ],
//   },
//   {
//     path: "course",
//     // element: <Header />,
//     children: [
//       {
//         path: "",
//         element: <CourseOnline />,
//       },
//       {
//         path: ":id",
//         element: <CourseOnlineDetail />,
//       },
//       // {
//       //   path: ":id/learning/:videoId",
//       //   element: <VideoCourse />,
//       // },
//     ],
//   },
//   {
//     path: "authentication",
//     children: [
//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "register",
//         element: <Register />,
//       },
//       {
//         path: "register",
//         element: <ForgotPassword />,
//       },
//       {
//         path: "otp",
//         element: <OTP />,
//       },
//       {
//         path: "reset-password",
//         element: <ResetPassword />,
//       },
//     ],
//   },
// ];
