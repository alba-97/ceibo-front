import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import selectedEventReducer from "./selectedEvent";
import eventsReducer from "./events";
import contactsReducer from "./contacts";
import selectedContactReducer from "./selectedContact";
import historyReducer from "./history";
import commonReducer from "./common";

export interface RootState {
  user: ReturnType<typeof userReducer>;
  selectedEvent: ReturnType<typeof selectedEventReducer>;
  events: ReturnType<typeof eventsReducer>;
  contacts: ReturnType<typeof contactsReducer>;
  selectedContact: ReturnType<typeof selectedContactReducer>;
  history: ReturnType<typeof historyReducer>;
  common: ReturnType<typeof commonReducer>;
}

const reducers = combineReducers({
  user: userReducer,
  events: eventsReducer,
  selectedEvent: selectedEventReducer,
  contacts: contactsReducer,
  selectedContact: selectedContactReducer,
  history: historyReducer,
  common: commonReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
