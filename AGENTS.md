<claude-mem-context>
# Memory Context

# [hommm] recent context, 2026-04-25 10:50pm GMT+2

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 12 obs (5,265t read) | 95,054t work | 94% savings

### Apr 23, 2026
56 11:29a 🔵 Webpack UnhandledSchemeError for node: URIs via Prisma Client
57 " 🔵 Root cause: lib/pricing.ts imports Prisma at top level, pulled into client bundle via HomeClient.tsx
59 11:30a 🔵 Pricing module usage map — split strategy confirmed across all consumers
60 11:33a 🔴 Fix Next.js Webpack UnhandledSchemeError — Split pricing module to isolate Prisma import
61 " 🔵 Prisma Client Imported in Next.js Client Component Causes Webpack Build Failure
S46 Prisma Client Imported in Next.js Client Component Causes Webpack Build Failure (Apr 23 at 11:33 AM)
62 4:59p 🔵 Reservation System Allows Booking Over Blocked Dates
63 " 🔵 Reservation System File Structure Mapped in hommm Project
64 " 🔵 Root Cause Confirmed: react-datepicker excludeDates Does Not Block Spanning Reservations
65 5:00p 🔵 Full Bug Analysis: Frontend Allows Spanning Reserved Dates, Backend Correctly Rejects
66 " 🔵 Precise Fix Location Identified: HomeClient onDateRangeChange Must Filter Spans
67 5:01p ⚖️ Fix Plan Finalized: Add Range Validation in HomeClient onDateRangeChange Handler
68 5:02p 🔵 User Confirms: Reservation System Allows Booking Over Blocked Intermediate Dates
S53 User Confirms: Reservation System Allows Booking Over Blocked Intermediate Dates (Apr 23 at 5:02 PM)

Access 95k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>