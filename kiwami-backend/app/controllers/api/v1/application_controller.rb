# frozen_string_literal: true

module Api
  module V1
    # This is an base application_controller of api
    class ApplicationController < ActionController::API
      include Firebase::Auth::Authenticable
      before_action :authenticate_user

      def current_user(user_id = nil)
        @current_user ||= User.find_by(uid: user_id)
      end
    end
  end
end
