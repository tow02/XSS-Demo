Rails.application.routes.draw do
  resources :blogs
  devise_for :users
end
