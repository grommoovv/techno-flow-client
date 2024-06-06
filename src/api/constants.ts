export const __API__ = (import.meta.env.BASE_API_URL || 'http://localhost:8080/api/v1') as string

export enum QUERY_KEYS {
  // USER KEYS
  GET_USERS = 'getUsers',
  GET_USER_BY_ID = 'getUserById',

  GET_CURRENT_USER = 'getCurrentUser',

  // EQUIPMENT KEYS
  GET_EQUIPMENT = 'getEquipment',
  GET_AVAILABLE_EQUIPMENT = 'getAvailableEquipment',
  GET_EQUIPMENT_BY_ID = 'getEquipmentById',
  GET_EQUIPMENT_BY_EVENT_ID = 'getEquipmentByEventId',
  GET_EQUIPMENT_USAGE_HISTORY_BY_ID = 'getEquipmentUsageHistoryById',

  // EVENT KEYS
  GET_EVENTS = 'getEvents',
  GET_EVENT_BY_ID = 'getEventById',
  GET_EVENTS_BY_USER_ID = 'getEventsByUserId',

  // REPORTS KEYS
  GET_REPORTS = 'getReports',
  GET_REPORTS_BY_USER_ID = 'getReportsByUserId',

  // MAINTENANCE
  GET_MAINTENANCE = 'getMaintenance',
}
