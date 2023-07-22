# frozen_string_literal: true

json.id     @user.id
json.name   @user.name
json.email  @user.email
json.gender @user.gender
# json.role  @suser.role  # role機能が出来たら返す

json.reservations do
  json.array! @reservations do |reservation|
    json.date       reservation.date
    json.start_time reservation.start_time
  end
end
