# frozen_string_literal: true

FirebaseIdToken.configure do |config|
  config.redis = Redis.new
  config.project_ids = ['kiwami-c9d7e']
end
