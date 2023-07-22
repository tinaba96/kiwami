# frozen_string_literal: true

# This is a mailer
class NotificationMailer < ActionMailer::Base
  default from: 'chac0ptx@gmail.com'

  def send_confirm_to_user(user)
    @user = user
    mail(
      subject: 'ご予約ありがとうございます。',
      to: @user.email, &:text
    )
  end
end
