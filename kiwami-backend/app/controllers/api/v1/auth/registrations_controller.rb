# frozen_string_literal: true

module Api
  module V1
    module Auth
      # This is an reservations_controller, #create
      class RegistrationsController < V1::ApplicationController
        skip_before_action :authenticate_user

        def create
          FirebaseIdToken::Certificates.request
          raise ArgumentError, 'BadRequest Parameter' if payload.blank?

          @user = User.find_or_initialize_by(
            registrations_params.merge(uid: payload['sub'], email: payload['email'])
          )
          if @user.save
            render :create, status: :ok
          else
            render json: { message: 'failed to create' }, status: :unprocessable_entity
          end
        end

        private

        def registrations_params
          params.permit(:name, :uid, :gender, :role)
        end

        def token_from_request_headers
          request.headers['Authorization']&.split&.last
        end

        def token
          params[:token] || token_from_request_headers
        end

        def payload
          @payload ||= FirebaseIdToken::Signature.verify token
        end
      end
    end
  end
end
