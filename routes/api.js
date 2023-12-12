const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify_token.js");
const userController = require("../controllers/user_controller.js");
const userAttendanceController = require("../controllers/user_attendance_controller.js");
const userLeaveController = require("../controllers/user_leave_controller.js");
const userClaimController = require("../controllers/user_claim_controller.js");
const holidayController = require("../controllers/holiday_controller.js");
const portalController = require("../controllers/portal_controller.js");
const roomController = require("../controllers/room_controller.js");
const notificationController = require("../controllers/notification_controller.js");
const globalController = require("../controllers/global_controller.js");

// STATUS
router.get("/", (req, res) => {
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
router.post("/user/attendance/today", verifyToken, userAttendanceController.getAttendanceToday);
router.post("/user/attendance/clock", verifyToken, userAttendanceController.getAttendanceClock);
router.post("/user/attendance/history", verifyToken, userAttendanceController.getAttendanceHistory);
router.post("/user/attendance/photo", verifyToken, userAttendanceController.saveAttendancePhotoMulter);
router.post("/user/attendance/status", verifyToken, userAttendanceController.getAttendanceRecent);

// CLAIM
router.post("/user/claim/completed", verifyToken, userClaimController.getClaimCompleted);
router.post("/user/claim/detail", verifyToken, userClaimController.getClaimDetail);
router.post("/user/claim/rejected", verifyToken, userClaimController.getClaimRejected);
router.post("/user/claim/progress", verifyToken, userClaimController.getClaimOnProgress);

// LEAVE
router.post("/user/leave/approved", verifyToken, userLeaveController.getLeaveListApproved);
router.post("/user/leave/not-approved", verifyToken, userLeaveController.getLeaveListNotApproved);
router.post("/user/leave/detail", verifyToken, userLeaveController.getLeaveDetails);
router.post("/user/leave/plafonds", verifyToken, userLeaveController.getLeavePlafonds);

// ROOM
router.post("/room", verifyToken, roomController.getRoom);
router.post("/room/booking", verifyToken, roomController.roomBooking);
router.post("/room/booking/active", verifyToken, roomController.getActiveBookingHandler);
router.post("/room/booking/history", verifyToken, roomController.getHistoryBooking);
router.post("/room/booking/detail", verifyToken, roomController.getDetailBookingHandler);
router.post("/room/booking/by-room", verifyToken, roomController.getBookingByRoom);
router.post("/room/employee", verifyToken, roomController.getEmployee);

// NOTIFICATION
router.post("/notification", verifyToken, notificationController.sendPushNotificationHandler);
router.post("/notification/inbox", verifyToken, notificationController.getNotificationInbox);
router.post("/notification/inbox/unread", verifyToken, notificationController.getUnreadNotificationCountHandler);
router.post("/notification/inbox/detail", verifyToken, notificationController.getSpecifyNotificationInbox);
router.post("/notification/mark-as-read", verifyToken, notificationController.markNotificationAsRead);

// GLOBAL VARIABLES
router.post("/global/variable/insert", verifyToken, globalController.insertGlobalVariables);
router.post("/global/variable/update", verifyToken, globalController.updateGlobalVariables);
router.post("/global/variable/select", verifyToken, globalController.selectGlobalVariables);
router.post("/global/variable/delete", verifyToken, globalController.deleteGlobalVariables);

// HOLIDAY
router.post("/holiday", verifyToken, holidayController.getHolidayCalendar);

// DUMMY
router.post("/user/medical/plafonds", verifyToken, userClaimController.getMedicalPlafonds);

module.exports = router;
