# frozen_string_literal: true

# This is an class for reservation
class Reservation < ApplicationRecord
  MAX_RESERVABLE_NUMBER = { first: 15, normal: 20 }.freeze
  TIME_RANGE = { first: 9, last: 23 }.freeze
  AVAILABLE_START_TIME = [*TIME_RANGE[:first]..TIME_RANGE[:last]].freeze

  belongs_to :user
  validates :user_id, uniqueness: { scope: %i[date start_time] }
  validates :date, comparison: {
    greater_than_or_equal_to: Date.today,
    less_than_or_equal_to: Date.today + 3.weeks
  }
  validates :start_time,
            numericality: { only_integer: true },
            comparison: {
              greater_than_or_equal_to: TIME_RANGE[:first],
              less_than_or_equal_to: TIME_RANGE[:last]
            }
  # validate :restrict_reservation_count [WIP] 予約枠を制限する。

  scope :active, -> { all.where(is_deleted: false) }
  scope :in_three_weeks, lambda {
    active.where('date >= ?', Time.zone.today).where('date <= ?', Time.zone.today + 3.weeks)
  }
  scope :today, lambda {
    active.where('date = ?', Time.zone.today)
  }

  def soft_delete
    self.is_deleted = true
    save!
  end

  def restrict_reservation_count
    return if start_time == TIME_RANGE[:first]
    return if start_time == TIME_RANGE[:last]

    # self.requested_time_slot_reservations.count < MAX_RESERVABLE_NUMBER[:last]

    errors.add(:base, 'requested reservation time is already reserved.')
  end

  def self.requested_time_slot_reservations
    Reservation.all.where('date = ?', date.strftime('%Y-%m-%d'))
  end
end
