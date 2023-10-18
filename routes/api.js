const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify_token.js");
const userController = require("../controllers/user_controller.js");
const acaportalController = require("../controllers/portal_controller.js");
const response = require("../middleware/response");

// STATUS
router.get("/", (req, res) => {
   response(200, "00", "API is running", {}, res, req);
});

// AUTH
router.post("/user/login-email-web", acaportalController.loginEmailWeb);
router.post("/user/verify-otp-web", acaportalController.verifyOTPweb);

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
router.post(
   "/user/get-leave-list-approve",
   verifyToken,
   userController.getLeaveListApprove
);
router.post(
   "/user/get-leave-list-not-approve",
   verifyToken,
   userController.getLeaveListNotApprove
);
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
