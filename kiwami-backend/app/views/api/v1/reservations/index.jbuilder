# frozen_string_literal: true

json.array! @reservations do |reservation|
  json.date       reservation[:date]
  json.start_time reservation[:start_time]
  json.reserved   reservation[:reserved]
end
