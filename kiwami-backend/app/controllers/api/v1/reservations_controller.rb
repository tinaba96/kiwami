# frozen_string_literal: true

module Api
  module V1
    # This is a class of reservation
    # uidを渡してください。
    class ReservationsController < ApplicationController
      skip_before_action :authenticate_user

      def index
        user = User.find_by!(uid: params[:uid])
        @reservations = Reservation.in_three_weeks
        @reservations = format_date_with_times(user)
        render :index
      end

      def create
        @user = User.find_by!(uid: params[:uid])
        @reservation = @user.reservations.new(reservation_params)

        if @reservation.save
          NotificationMailer.send_confirm_to_user(@user).deliver
          render :create, status: :created
        else
          render json: @reservation.errors, status: :bad_request
        end
      end

      def destroy
        user = User.find_by!(uid: params[:uid])
        @reservation = user.reservations.find_by!(date: params[:date],
                                                 start_time: params[:start_time])
        @reservation.soft_delete
      end

      private

      def reservation_params
        params.require(:reservation).permit(:uid, :date, :start_time)
      end

      def format_date_with_times(user)
        days = generate_date_array_in_three_weeks
        days.map do |date|
          date_reservations = @reservations.select { |reservation| reservation.date == date }
          reserved = reserved?(user, date_reservations)
          start_time = format_start_time(date_reservations)
          { date: date, start_time: start_time, reserved: reserved }
        end
      end

      def format_start_time(date_reservations)
        Reservation::AVAILABLE_START_TIME.map do |time|
          total = date_reservations.select { |reservation| reservation.start_time == time }.count
          reservable_number = time != Reservation::TIME_RANGE[:first] ? 20 - total : 15 - total
          { time => reservable_number }
        end
      end

      def reserved?(user, date_reservations)
        return false if user.nil?

        date_reservations.find { |reservation| reservation.user_id = user.id }.present?
      end

      def generate_date_array_in_three_weeks
        today = Date.today
        (today..today + 3.weeks).to_a
      end
    end
  end
end
