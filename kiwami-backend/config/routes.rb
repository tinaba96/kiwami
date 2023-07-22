# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :private do
      namespace :admin do
        resources :users, only: %i[index]
      end
    end
    namespace :v1 do
      resources :users, param: :uid, only: %i[show]
      resources :reservations, only: %i[index create show destroy]
      namespace :auth do
        post 'registrations' => 'registrations#create'
      end
    end
  end
end
