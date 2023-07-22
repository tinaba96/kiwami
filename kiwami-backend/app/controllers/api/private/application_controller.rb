# frozen_string_literal: true

module Api
  module Private
    # This is an base application_controller of api
    class ApplicationController < ActionController::API
      # before_action :check_authority

      # def current_user(user_id = nil) @current_user ||= User.find_by(uid: user_id) end

      # private

      # def check_authority
      #  raise ActionController::RoutingError, 'Not Found' unless current_account.admin
      # end
    end
  end
end
