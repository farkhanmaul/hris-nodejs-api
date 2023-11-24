const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify_token.js");
const userController = require("../controllers/user_controller.js");
const userAttendanceController = require("../controllers/user_attendance_controller.js");
const userLeaveController = require("../controllers/user_leave_controller.js");
const userClaimController = require("../controllers/user_claim_controller.js");
const portalController = require("../controllers/portal_controller.js");
const roomController = require("../controllers/room_controller.js");

// STATUS
router.get("/", (req, res) => {
   // response(HTTP_STATUS.OK, "00", "API is running", {}, res, req);
   res.status(200).json({
      respCode: "00",
      respMsg: "API is running",
      data: {},
   });
});

// PORTAL
router.post("/portal/login-email", portalController.loginEmailPortal);
router.post("/portal/login-wa", portalController.loginWAPortal);
router.post("/portal/verify-otp", portalController.verifyOTPportal);

// AUTH
router.post("/user/login-email", userController.loginEmail);
router.post("/user/login-wa", userController.loginWA);
router.post("/user/verify-otp", userController.verifyOTP);
router.post("/user/verify-token", userController.verifyTokenHandler);
router.post("/user/logout", verifyToken, userController.logout);
router.post("/user/get-profile", verifyToken, userController.getProfile);
router.post("/user/get-version", verifyToken, userController.getVersion);

// ATTENDANCE
router.post("/user/attendance", verifyToken, userAttendanceController.attendance);
router.post("/user/get-attendance-today", verifyToken, userAttendanceController.getAttendanceToday);
router.post("/user/get-attendance-clock", verifyToken, userAttendanceController.getAttendanceClock);
router.post("/user/get-attendance-history", verifyToken, userAttendanceController.getAttendanceHistory);
router.post("/user/save-attendance-photo", verifyToken, userAttendanceController.saveAttendancePhotoMulter);
router.post("/user/get-attendance-status", verifyToken, userAttendanceController.getAttendanceRecent);

// ROOM
router.post("/room/booking", verifyToken, roomController.roomBooking);
router.post("/room/get-room", verifyToken, roomController.getRoom);
router.post("/room/get-booking-active", verifyToken, roomController.getActiveBooking);
router.post("/room/get-booking-history", verifyToken, roomController.getHistoryBooking);
router.post("/room/get-booking-by-room", verifyToken, roomController.getBookingByRoom);
router.post("/room/get-all-employee", verifyToken, roomController.getEmployee);

// GLOBAL VARIABLES
router.post("/user/insert-global-variable", verifyToken, userController.insertGlobalVariables);
router.post("/user/update-global-variable", verifyToken, userController.updateGlobalVariables);
router.post("/user/select-global-variable", verifyToken, userController.selectGlobalVariables);
router.post("/user/delete-global-variable", verifyToken, userController.deleteGlobalVariables);

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

module.exports = router;
