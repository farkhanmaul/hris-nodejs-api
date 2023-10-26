const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify_token.js");
const userController = require("../controllers/user_controller.js");
const userAttendanceController = require("../controllers/user_attendance_controller.js");
const userLeaveController = require("../controllers/user_leave_controller.js");
const userClaimController = require("../controllers/user_claim_controller.js");
const portalController = require("../controllers/portal_controller.js");
const response = require("../middleware/response");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");

// STATUS
router.get("/", (req, res) => {
   response(HTTP_STATUS.OK, "00", "API is running", {}, res, req);
});

// AUTH
router.post("/user/login-email", userController.loginEmail);
router.post("/user/login-wa", userController.loginWA);
router.post("/user/logout", verifyToken, userController.logout);
router.post("/user/verify-otp", userController.verifyOTP);
router.post("/user/verify-token", userController.verifyTokenHandler);
router.post("/user/get-profile", verifyToken, userController.getProfile);

// ATTENDANCE
router.post("/user/attendance", verifyToken, userAttendanceController.attendance);
router.post("/user/get-attendance-today", verifyToken, userAttendanceController.getAttendanceToday);
router.post("/user/get-attendance-clock", verifyToken, userAttendanceController.getAttendanceClock);
router.post("/user/get-attendance-recent", verifyToken, userAttendanceController.getAttendanceRecent);
router.post("/user/get-attendance-history", verifyToken, userAttendanceController.getAttendanceHistory);

router.post("/user/save-attendance-photo", userAttendanceController.saveAttendancePhotoMulter);
// router.post("/user/get-attendance-photo", verifyToken, userAttendanceController.getAttendancePhoto);

// CLAIM
router.post("/user/get-claim-completed", verifyToken, userClaimController.getRequestCompleted);
router.post("/user/get-claim-detail", verifyToken, userClaimController.getRequestDetail);
router.post("/user/get-claim-rejected", verifyToken, userClaimController.getRequestRejected);
router.post("/user/get-claim-progress", verifyToken, userClaimController.getRequestProgress);

// LEAVE
router.post("/user/get-leave-list-approved", verifyToken, userLeaveController.getLeaveListApprove);
router.post("/user/get-leave-list-not-approved", verifyToken, userLeaveController.getLeaveListNotApprove);
router.post("/user/get-leave-detail", verifyToken, userLeaveController.getLeaveDetail);
router.post("/user/get-leave-plafonds", verifyToken, userLeaveController.getLeavePlafonds);

router.post("/user/get-medical-plafonds", verifyToken, userClaimController.getMedicalPlafonds);

// PORTAL
router.post("/portal/login-email", portalController.loginEmailPortal);
router.post("/portal/login-wa", portalController.loginWAPortal);
router.post("/portal/verify-otp", portalController.verifyOTPportal);

module.exports = router;
