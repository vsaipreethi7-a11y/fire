import {
  text,
  timestamp,
  boolean,
  decimal,
  integer,
  time,
  index,
  primaryKey,
  pgTable,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Better Auth tables (required) - with snake_case columns
export const user = pgTable(
  'user',
  {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    email_verified: boolean('email_verified').notNull().default(false),
    name: text('name'),
    image: text('image'),
    role: text('role').default('building_manager'),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    roleIdx: index('idx_user_role').on(table.role),
  })
)

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  user_id: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  expires_at: timestamp('expires_at', { withTimezone: true }).notNull(),
  token: text('token').notNull().unique(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  user_id: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  account_id: text('account_id').notNull(),
  provider_id: text('provider_id').notNull(),
  access_token: text('access_token'),
  refresh_token: text('refresh_token'),
  id_token: text('id_token'),
  access_token_expires_at: timestamp('access_token_expires_at', { withTimezone: true }),
  refresh_token_expires_at: timestamp('refresh_token_expires_at', { withTimezone: true }),
  scope: text('scope'),
  password: text('password'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expires_at: timestamp('expires_at', { withTimezone: true }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

// WB-FDVA Application tables with snake_case
export const building = pgTable(
  'building',
  {
    id: text('id').primaryKey(),
    user_id: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    address: text('address').notNull(),
    city: text('city').notNull(),
    state: text('state').notNull(),
    zip_code: text('zip_code').notNull(),
    type: text('type').notNull(),
    total_floors: integer('total_floors').notNull().default(1),
    total_occupancy: integer('total_occupancy').notNull().default(100),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    userIdIdx: index('idx_building_user_id').on(table.user_id),
  })
)

export const floor = pgTable(
  'floor',
  {
    id: text('id').primaryKey(),
    user_id: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    building_id: text('building_id').notNull().references(() => building.id, { onDelete: 'cascade' }),
    floor_number: integer('floor_number').notNull(),
    name: text('name').notNull(),
    area: decimal('area', { precision: 10, scale: 2 }),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    buildingIdIdx: index('idx_floor_building_id').on(table.building_id),
  })
)

export const zone = pgTable(
  'zone',
  {
    id: text('id').primaryKey(),
    user_id: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    floor_id: text('floor_id').notNull().references(() => floor.id, { onDelete: 'cascade' }),
    building_id: text('building_id').notNull().references(() => building.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    description: text('description'),
    x: integer('x').notNull().default(0),
    y: integer('y').notNull().default(0),
    width: integer('width').notNull().default(100),
    height: integer('height').notNull().default(100),
    occupancy: integer('occupancy').notNull().default(10),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    buildingIdIdx: index('idx_zone_building_id').on(table.building_id),
    floorIdIdx: index('idx_zone_floor_id').on(table.floor_id),
  })
)

export const sensor = pgTable(
  'sensor',
  {
    id: text('id').primaryKey(),
    user_id: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    building_id: text('building_id').notNull().references(() => building.id, { onDelete: 'cascade' }),
    zone_id: text('zone_id').notNull().references(() => zone.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    name: text('name').notNull(),
    location: text('location'),
    status: text('status').notNull().default('active'),
    last_triggered: timestamp('last_triggered', { withTimezone: true }),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    buildingIdIdx: index('idx_sensor_building_id').on(table.building_id),
    zoneIdIdx: index('idx_sensor_zone_id').on(table.zone_id),
  })
)

export const person = pgTable('person', {
  id: text('id').primaryKey(),
  user_id: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  building_id: text('building_id').notNull().references(() => building.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  role: text('role').notNull(),
  department: text('department'),
  phone: text('phone'),
  email: text('email'),
  is_disabled: boolean('is_disabled').default(false),
  mobility_level: text('mobility_level').default('normal'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const occupancy_schedule = pgTable('occupancy_schedule', {
  id: text('id').primaryKey(),
  user_id: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  building_id: text('building_id').notNull().references(() => building.id, { onDelete: 'cascade' }),
  zone_id: text('zone_id').notNull().references(() => zone.id, { onDelete: 'cascade' }),
  day_of_week: integer('day_of_week'),
  start_time: time('start_time'),
  end_time: time('end_time'),
  expected_occupancy: integer('expected_occupancy'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const incident = pgTable(
  'incident',
  {
    id: text('id').primaryKey(),
    user_id: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    building_id: text('building_id').notNull().references(() => building.id, { onDelete: 'cascade' }),
    type: text('type').notNull().default('fire_alarm'),
    status: text('status').notNull().default('active'),
    severity: text('severity'),
    description: text('description'),
    total_impact_magnitude: decimal('total_impact_magnitude', { precision: 10, scale: 2 }).default('0.0'),
    recommended_action: text('recommended_action'),
    responder_notes: text('responder_notes'),
    evacuation_start_time: timestamp('evacuation_start_time', { withTimezone: true }),
    evacuation_end_time: timestamp('evacuation_end_time', { withTimezone: true }),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    buildingIdIdx: index('idx_incident_building_id').on(table.building_id),
    statusIdx: index('idx_incident_status').on(table.status),
  })
)

export const incident_zone = pgTable(
  'incident_zone',
  {
    id: text('id').primaryKey(),
    user_id: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    incident_id: text('incident_id').notNull().references(() => incident.id, { onDelete: 'cascade' }),
    zone_id: text('zone_id').notNull().references(() => zone.id, { onDelete: 'cascade' }),
    building_id: text('building_id').notNull().references(() => building.id, { onDelete: 'cascade' }),
    sensor_triggered: text('sensor_triggered'),
    detection_time: timestamp('detection_time', { withTimezone: true }),
    occupancy: integer('occupancy'),
    impact_magnitude: decimal('impact_magnitude', { precision: 10, scale: 2 }).default('0.0'),
    zone_color: text('zone_color').default('#FFFFFF'),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    incidentIdIdx: index('idx_incident_zone_incident_id').on(table.incident_id),
    zoneIdIdx: index('idx_incident_zone_zone_id').on(table.zone_id),
  })
)

export const incident_report = pgTable(
  'incident_report',
  {
    id: text('id').primaryKey(),
    user_id: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    incident_id: text('incident_id').notNull().unique().references(() => incident.id, { onDelete: 'cascade' }),
    building_id: text('building_id').notNull().references(() => building.id, { onDelete: 'cascade' }),
    section_a_date_time: timestamp('section_a_date_time', { withTimezone: true }),
    section_a_location: text('section_a_location'),
    section_a_detection_method: text('section_a_detection_method'),
    section_a_first_responder: text('section_a_first_responder'),
    section_b_building_type: text('section_b_building_type'),
    section_b_year_built: integer('section_b_year_built'),
    section_b_floor_area: decimal('section_b_floor_area', { precision: 10, scale: 2 }),
    section_b_sprinkler_system: boolean('section_b_sprinkler_system'),
    section_c_fire_type: text('section_c_fire_type'),
    section_c_estimated_area: decimal('section_c_estimated_area', { precision: 10, scale: 2 }),
    section_c_smoke_density: text('section_c_smoke_density'),
    section_c_flame_height: text('section_c_flame_height'),
    section_d_total_persons: integer('section_d_total_persons'),
    section_d_mobility_impaired: integer('section_d_mobility_impaired'),
    section_d_evacuation_time: integer('section_d_evacuation_time'),
    section_d_sheltering_in_place: boolean('section_d_sheltering_in_place'),
    section_e_firetrucks_dispatched: integer('section_e_firetrucks_dispatched'),
    section_e_firefighters_deployed: integer('section_e_firefighters_deployed'),
    section_e_response_time: integer('section_e_response_time'),
    section_e_water_supply: text('section_e_water_supply'),
    section_f_evacuation_executed: boolean('section_f_evacuation_executed'),
    section_f_alarm_activated: boolean('section_f_alarm_activated'),
    section_f_sprinklers_activated: boolean('section_f_sprinklers_activated'),
    section_f_ventilation_control: text('section_f_ventilation_control'),
    section_g_injuries_count: integer('section_g_injuries_count'),
    section_g_fatalities_count: integer('section_g_fatalities_count'),
    section_g_property_damage_estimate: decimal('section_g_property_damage_estimate', { precision: 12, scale: 2 }),
    section_g_content_damage_estimate: decimal('section_g_content_damage_estimate', { precision: 12, scale: 2 }),
    section_h_root_cause: text('section_h_root_cause'),
    section_h_recommended_prevention: text('section_h_recommended_prevention'),
    section_h_investigation_notes: text('section_h_investigation_notes'),
    status: text('status').default('draft'),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    incidentIdIdx: index('idx_incident_report_incident_id').on(table.incident_id),
  })
)

export const responder_assignment = pgTable('responder_assignment', {
  id: text('id').primaryKey(),
  user_id: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  incident_id: text('incident_id').notNull().references(() => incident.id, { onDelete: 'cascade' }),
  building_id: text('building_id').notNull().references(() => building.id, { onDelete: 'cascade' }),
  responder_id: text('responder_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  assigned_zones: text('assigned_zones'),
  status: text('status').default('assigned'),
  arrival_time: timestamp('arrival_time', { withTimezone: true }),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})
