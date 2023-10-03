const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify_token.js");
const userController = require("../controllers/user_controller.js");

router.get("/", (req, res) => {
   res.send("API is running");
});

router.post("/user/login-email-web", userController.loginEmailWeb);
router.post("/user/verify-otp-web", userController.verifyOTPweb);

router.post("/user/login-email", userController.loginEmail);
router.post("/user/login-wa", userController.loginWA);
router.post("/user/logout", verifyToken, userController.logout);
router.post("/user/verify-otp", userController.verifyOTP);
router.post("/user/verify-token", userController.verifyTokenHandler);
router.post("/user/get-profile", verifyToken, userController.getProfile);
router.post(
   "/user/get-medical-plafonds",
   verifyToken,
   userController.getMedicalPlafonds
);

// REQUEST CLAIM
router.post(
   "/user/get-request-completed",
   verifyToken,
   userController.getRequestCompleted
);
router.post(
   "/user/get-request-detail",
   verifyToken,
   userController.getRequestDetail
);
router.post(
   "/user/get-request-rejected",
   verifyToken,
   userController.getRequestRejected
);
router.post(
   "/user/get-request-progress",
   verifyToken,
   userController.getRequestProgress
);

// LEAVE
router.post("/user/get-leave-list", verifyToken, userController.getLeaveList);
router.post(
   "/user/get-leave-detail",
   verifyToken,
   userController.getLeaveDetail
);
router.post(
   "/user/get-leave-plafonds",
   verifyToken,
   userController.getLeavePlafonds
);

// ATTENDANCE
router.post("/user/attendance", verifyToken, userController.attendance);
router.post(
   "/user/get-attendance-today",
   verifyToken,
   userController.getAttendanceToday
);
router.post(
   "/user/get-attendance-clock",
   verifyToken,
   userController.getAttendanceClock
);
router.post(
   "/user/get-attendance-recent",
   verifyToken,
   userController.getAttendanceRecent
);
router.post(
   "/user/get-attendance-history",
   verifyToken,
   userController.getAttendanceHistory
);

module.exports = router;
