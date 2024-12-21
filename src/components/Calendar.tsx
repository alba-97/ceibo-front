import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import EventResponse from "@/interfaces/responses/Event";

interface ICalendarData {
  date: Date;
  events: EventResponse[];
}

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const calendarData: ICalendarData[] = [];

  const handleDatePress = (date: Date) => {
    setSelectedDate(date);
  };

  const renderCalendar = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const events: EventResponse[] = [];

      calendarData.push({ date, events });
    }

    return (
      <View style={styles.calendarContainer}>
        <Text style={styles.monthYearText}>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </Text>
        <View style={styles.daysContainer}>
          <Text style={styles.dayText}>Sun</Text>
          <Text style={styles.dayText}>Mon</Text>
          <Text style={styles.dayText}>Tue</Text>
          <Text style={styles.dayText}>Wed</Text>
          <Text style={styles.dayText}>Thu</Text>
          <Text style={styles.dayText}>Fri</Text>
          <Text style={styles.dayText}>Sat</Text>
        </View>
        <View style={styles.datesContainer}>
          {Array(firstDayIndex)
            .fill("")
            .map((_, index) => (
              <TouchableOpacity
                key={`empty-${index}`}
                style={styles.dateCell}
                disabled={true}
              >
                <Text style={styles.dateText}></Text>
              </TouchableOpacity>
            ))}
          {calendarData.map((calendarData: ICalendarData) => {
            const { events, date } = calendarData;
            const key = date.toISOString().split("T")[0];
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.dateCell,
                  events.length > 0 && styles.hasEventsDateCell,
                  date === selectedDate && styles.selectedDateCell,
                ]}
                onPress={() => handleDatePress(date)}
              >
                <Text style={styles.dateText}>{date.getDate()}</Text>
                {events.length > 0 && <View style={styles.eventIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderEventPreviews = () => {
    if (selectedDate) {
      const selectedEvents = calendarData.find(
        (item) => item.date === selectedDate
      )?.events;

      if (selectedEvents && selectedEvents.length > 0) {
        return (
          <View style={styles.eventPreviewsContainer}>
            <Text style={styles.selectedDateText}>
              {selectedDate.toISOString().split("T")[0]}
            </Text>
            {selectedEvents.map((event, index) => (
              <Text key={index} style={styles.eventPreviewText}>
                {event.title}
              </Text>
            ))}
          </View>
        );
      }
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {renderCalendar()}
      {renderEventPreviews()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,

    color: "white",
  },
  calendarContainer: {
    marginTop: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "white",
    height: 250,
  },
  monthYearText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
    color: "white",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  dayText: {
    color: "white",
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  datesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateCell: {
    width: "12.5%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "white",
    marginBottom: 4,
  },
  hasEventsDateCell: {
    backgroundColor: "red",
  },
  selectedDateCell: {
    backgroundColor: "#0007",
  },
  dateText: {
    color: "white",
    fontSize: 16,
  },
  eventIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "red",
    marginTop: 4,
  },
  eventPreviewsContainer: {
    marginTop: 16,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  eventPreviewText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default Calendar;
