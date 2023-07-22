# frozen_string_literal: true

json.date @date
json.reservations do
  json.array! @reservations do |reservation|
    json.start_time reservation[:start_time]
    json.users do
      json.array! reservation[:users] do |user|
        json.name   user.name
        json.email  user.email
        json.gender user.gender
      end
    end
  end
end
