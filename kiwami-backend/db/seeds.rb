# frozen_string_literal: true

User.create!({ name: '三島', gender: 1, role: 1, uid: 1 })

5.times do
  name = Faker::Name.name
  User.create!({ name: name, gender: 0, role: 0 })
end

User.all.each_with_index do |user, user_index|
  date = Date.today
  if user_index <= 5
    18.times do |index|
      user.reservations.create!(date: date + index, start_time: 9)
      user.reservations.create!(date: date + index, start_time: 16)
    end
  end
end
