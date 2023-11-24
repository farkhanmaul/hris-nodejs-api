const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify_token.js");
const userController = require("../controllers/user_controller.js");
const userAttendanceController = require("../controllers/user_attendance_controller.js");
const userLeaveController = require("../controllers/user_leave_controller.js");
const userClaimController = require("../controllers/user_claim_controller.js");
const portalController = require("../controllers/portal_controller.js");
const roomController = require("../controllers/room_controller.js");
const globalController = require("../controllers/global_controller.js");

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

// USER
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
router.post("/room/get-booking-active", verifyToken, roomController.getActiveBookingHandler);
router.post("/room/get-booking-history", verifyToken, roomController.getHistoryBooking);
router.post("/room/get-booking-by-room", verifyToken, roomController.getBookingByRoom);
router.post("/room/get-all-employee", verifyToken, roomController.getEmployee);

// GLOBAL VARIABLES
router.post("/global/insert-global-variable", verifyToken, globalController.insertGlobalVariables);
router.post("/global/update-global-variable", verifyToken, globalController.updateGlobalVariables);
router.post("/global/select-global-variable", verifyToken, globalController.selectGlobalVariables);
router.post("/global/delete-global-variable", verifyToken, globalController.deleteGlobalVariables);

// CLAIM
router.post("/user/get-claim-completed", verifyToken, userClaimController.getClaimCompleted);
router.post("/user/get-claim-detail", verifyToken, userClaimController.getClaimDetail);
router.post("/user/get-claim-rejected", verifyToken, userClaimController.getClaimRejected);
router.post("/user/get-claim-progress", verifyToken, userClaimController.getClaimOnProgress);

// LEAVE
router.post("/user/get-leave-list-approved", verifyToken, userLeaveController.getLeaveListApproved);
router.post("/user/get-leave-list-not-approved", verifyToken, userLeaveController.getLeaveListNotApproved);
router.post("/user/get-leave-detail", verifyToken, userLeaveController.getLeaveDetails);
router.post("/user/get-leave-plafonds", verifyToken, userLeaveController.getLeavePlafonds);

router.post("/user/get-medical-plafonds", verifyToken, userClaimController.getMedicalPlafonds);

module.exports = router;
