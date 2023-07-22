# frozen_string_literal: true

module Api
  module V1
    # This is a class of user
    class UsersController < ApplicationController
      skip_before_action :authenticate_user # Todo 認証が完成したら削除

      def show
        @user = User.find_by!(uid: params[:uid])
        @reservations = @user.reservations.in_three_weeks
        render :show
      end
    end
  end
end
