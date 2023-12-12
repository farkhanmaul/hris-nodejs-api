const db1 = require("../config/database1");

async function getHolidayCalendar() {
   try {
      const currentYear = new Date().getFullYear();
      const formattedCurrentYear = currentYear.toString();

      const query = `
         SELECT TOP (1000)
            [HolidayCalendarTitle]
            ,[EventStart]
         FROM [LiteErp].[dbo].[HrReferenceHolidayCalendar]
         WHERE YEAR([EventStart]) = '${formattedCurrentYear}'
         ORDER BY [EventStart] DESC;
      `;

      const data = await db1(query); // Assuming the result is an object with the `data` property

      if (!Array.isArray(data.recordset)) {
         throw new Error("Invalid result format");
      }

      const currentDate = new Date();
      const options = { day: "numeric", month: "long", year: "numeric" };

      const previous = [];
      const next = [];

      data.recordset.forEach((holiday) => {
         const eventStart = new Date(holiday.EventStart);
         const formattedDate = eventStart.toLocaleDateString("en-US", options); // Format date as "17 August 2023"
         const dayName = eventStart.toLocaleDateString("en-US", { weekday: "long" }); // Get the day name

         const holidayData = {
            HolidayCalendarTitle: holiday.HolidayCalendarTitle,
            EventStart: formattedDate,
            DayName: dayName,
         };

         if (eventStart <= currentDate) {
            previous.push(holidayData);
         } else {
            next.push(holidayData);
         }
      });

      const groupByMonth = (holidays) => {
         const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
         ];

         const groupedHolidays = [];
         holidays.forEach((holiday) => {
            const eventStart = new Date(holiday.EventStart);
            const monthKey = `${months[eventStart.getMonth()]} ${eventStart.getFullYear()}`;
            const monthIndex = groupedHolidays.findIndex((group) => group.month === monthKey);
            if (monthIndex === -1) {
               groupedHolidays.push({
                  month: monthKey,
                  holidays: [holiday],
               });
            } else {
               groupedHolidays[monthIndex].holidays.push(holiday);
            }
         });
         return groupedHolidays;
      };

      const previousGrouped = groupByMonth(previous);
      const nextGrouped = groupByMonth(next);

      return {
         next: nextGrouped,
         previous: previousGrouped,
      };
   } catch (error) {
      throw error;
   }
}

module.exports = {
   getHolidayCalendar,
};
