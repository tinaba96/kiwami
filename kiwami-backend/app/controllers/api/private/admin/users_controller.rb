# frozen_string_literal: true

module Api
  module Private
    module Admin
      # This is a admin controller
      class UsersController < ApplicationController
        def index
          reservations = fetch_and_format_reservations_with_user_info
          @date = reservations[:date]
          @reservations = reservations[:results]
        end

        private

        def fetch_and_format_reservations_with_user_info
          reservations = Reservation.today
          results = Reservation::AVAILABLE_START_TIME.map do |t|
            { start_time: t, users: reservations.select { |r| r.start_time == t }.map(&:user) }
          end

          { date: Date.today, results: results }
        end
      end
    end
  end
end
