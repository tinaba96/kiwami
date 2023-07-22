# frozen_string_literal: true

class User < ApplicationRecord
  has_many :reservations, dependent: :destroy

  enum gender: { men: 0, women: 1 }
end
