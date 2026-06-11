CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp with time zone,
	"refreshTokenExpiresAt" timestamp with time zone,
	"scope" text,
	"password" text,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "building" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zip_code" text NOT NULL,
	"type" text NOT NULL,
	"total_floors" integer DEFAULT 1 NOT NULL,
	"total_occupancy" integer DEFAULT 100 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "floor" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"building_id" text NOT NULL,
	"floor_number" integer NOT NULL,
	"name" text NOT NULL,
	"area" numeric(10, 2),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "incident" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"building_id" text NOT NULL,
	"type" text DEFAULT 'fire_alarm' NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"severity" text,
	"description" text,
	"total_impact_magnitude" numeric(10, 2) DEFAULT '0.0',
	"recommended_action" text,
	"responder_notes" text,
	"evacuation_start_time" timestamp with time zone,
	"evacuation_end_time" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "incident_report" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"incident_id" text NOT NULL,
	"building_id" text NOT NULL,
	"section_a_date_time" timestamp with time zone,
	"section_a_location" text,
	"section_a_detection_method" text,
	"section_a_first_responder" text,
	"section_b_building_type" text,
	"section_b_year_built" integer,
	"section_b_floor_area" numeric(10, 2),
	"section_b_sprinkler_system" boolean,
	"section_c_fire_type" text,
	"section_c_estimated_area" numeric(10, 2),
	"section_c_smoke_density" text,
	"section_c_flame_height" text,
	"section_d_total_persons" integer,
	"section_d_mobility_impaired" integer,
	"section_d_evacuation_time" integer,
	"section_d_sheltering_in_place" boolean,
	"section_e_firetrucks_dispatched" integer,
	"section_e_firefighters_deployed" integer,
	"section_e_response_time" integer,
	"section_e_water_supply" text,
	"section_f_evacuation_executed" boolean,
	"section_f_alarm_activated" boolean,
	"section_f_sprinklers_activated" boolean,
	"section_f_ventilation_control" text,
	"section_g_injuries_count" integer,
	"section_g_fatalities_count" integer,
	"section_g_property_damage_estimate" numeric(12, 2),
	"section_g_content_damage_estimate" numeric(12, 2),
	"section_h_root_cause" text,
	"section_h_recommended_prevention" text,
	"section_h_investigation_notes" text,
	"status" text DEFAULT 'draft',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "incident_report_incident_id_unique" UNIQUE("incident_id")
);
--> statement-breakpoint
CREATE TABLE "incident_zone" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"incident_id" text NOT NULL,
	"zone_id" text NOT NULL,
	"building_id" text NOT NULL,
	"sensor_triggered" text,
	"detection_time" timestamp with time zone,
	"occupancy" integer,
	"impact_magnitude" numeric(10, 2) DEFAULT '0.0',
	"zone_color" text DEFAULT '#FFFFFF',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "occupancy_schedule" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"building_id" text NOT NULL,
	"zone_id" text NOT NULL,
	"day_of_week" integer,
	"start_time" time,
	"end_time" time,
	"expected_occupancy" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "person" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"building_id" text NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"department" text,
	"phone" text,
	"email" text,
	"is_disabled" boolean DEFAULT false,
	"mobility_level" text DEFAULT 'normal',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "responder_assignment" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"incident_id" text NOT NULL,
	"building_id" text NOT NULL,
	"responder_id" text NOT NULL,
	"assigned_zones" text,
	"status" text DEFAULT 'assigned',
	"arrival_time" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sensor" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"building_id" text NOT NULL,
	"zone_id" text NOT NULL,
	"type" text NOT NULL,
	"name" text NOT NULL,
	"location" text,
	"status" text DEFAULT 'active' NOT NULL,
	"last_triggered" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now(),
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"name" text,
	"image" text,
	"role" text DEFAULT 'building_manager',
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "zone" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"floor_id" text NOT NULL,
	"building_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"x" integer DEFAULT 0 NOT NULL,
	"y" integer DEFAULT 0 NOT NULL,
	"width" integer DEFAULT 100 NOT NULL,
	"height" integer DEFAULT 100 NOT NULL,
	"occupancy" integer DEFAULT 10 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "building" ADD CONSTRAINT "building_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "floor" ADD CONSTRAINT "floor_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "floor" ADD CONSTRAINT "floor_building_id_building_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."building"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident" ADD CONSTRAINT "incident_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident" ADD CONSTRAINT "incident_building_id_building_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."building"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident_report" ADD CONSTRAINT "incident_report_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident_report" ADD CONSTRAINT "incident_report_incident_id_incident_id_fk" FOREIGN KEY ("incident_id") REFERENCES "public"."incident"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident_report" ADD CONSTRAINT "incident_report_building_id_building_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."building"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident_zone" ADD CONSTRAINT "incident_zone_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident_zone" ADD CONSTRAINT "incident_zone_incident_id_incident_id_fk" FOREIGN KEY ("incident_id") REFERENCES "public"."incident"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident_zone" ADD CONSTRAINT "incident_zone_zone_id_zone_id_fk" FOREIGN KEY ("zone_id") REFERENCES "public"."zone"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "incident_zone" ADD CONSTRAINT "incident_zone_building_id_building_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."building"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "occupancy_schedule" ADD CONSTRAINT "occupancy_schedule_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "occupancy_schedule" ADD CONSTRAINT "occupancy_schedule_building_id_building_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."building"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "occupancy_schedule" ADD CONSTRAINT "occupancy_schedule_zone_id_zone_id_fk" FOREIGN KEY ("zone_id") REFERENCES "public"."zone"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "person" ADD CONSTRAINT "person_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "person" ADD CONSTRAINT "person_building_id_building_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."building"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "responder_assignment" ADD CONSTRAINT "responder_assignment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "responder_assignment" ADD CONSTRAINT "responder_assignment_incident_id_incident_id_fk" FOREIGN KEY ("incident_id") REFERENCES "public"."incident"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "responder_assignment" ADD CONSTRAINT "responder_assignment_building_id_building_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."building"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "responder_assignment" ADD CONSTRAINT "responder_assignment_responder_id_user_id_fk" FOREIGN KEY ("responder_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sensor" ADD CONSTRAINT "sensor_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sensor" ADD CONSTRAINT "sensor_building_id_building_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."building"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sensor" ADD CONSTRAINT "sensor_zone_id_zone_id_fk" FOREIGN KEY ("zone_id") REFERENCES "public"."zone"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zone" ADD CONSTRAINT "zone_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zone" ADD CONSTRAINT "zone_floor_id_floor_id_fk" FOREIGN KEY ("floor_id") REFERENCES "public"."floor"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zone" ADD CONSTRAINT "zone_building_id_building_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."building"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_building_user_id" ON "building" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_floor_building_id" ON "floor" USING btree ("building_id");--> statement-breakpoint
CREATE INDEX "idx_incident_building_id" ON "incident" USING btree ("building_id");--> statement-breakpoint
CREATE INDEX "idx_incident_status" ON "incident" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_incident_report_incident_id" ON "incident_report" USING btree ("incident_id");--> statement-breakpoint
CREATE INDEX "idx_incident_zone_incident_id" ON "incident_zone" USING btree ("incident_id");--> statement-breakpoint
CREATE INDEX "idx_incident_zone_zone_id" ON "incident_zone" USING btree ("zone_id");--> statement-breakpoint
CREATE INDEX "idx_sensor_building_id" ON "sensor" USING btree ("building_id");--> statement-breakpoint
CREATE INDEX "idx_sensor_zone_id" ON "sensor" USING btree ("zone_id");--> statement-breakpoint
CREATE INDEX "idx_user_role" ON "user" USING btree ("role");--> statement-breakpoint
CREATE INDEX "idx_zone_building_id" ON "zone" USING btree ("building_id");--> statement-breakpoint
CREATE INDEX "idx_zone_floor_id" ON "zone" USING btree ("floor_id");