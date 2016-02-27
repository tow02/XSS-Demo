(1..3).each do |i|
  user = User.create(email: "user#{i}@cs474.com",
                      password: "12345678",
                      password_confirmation: "12345678")
  user.save!
end
