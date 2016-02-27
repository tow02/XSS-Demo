# XSS-Demo

## Starting Project

```bash
$ rails new XSS-Demo --skip-spring 
```

Edit your `Gemfile` into this.

```ruby
# /Gemfile
source 'https://rubygems.org'

gem 'rails', '4.2.5'
gem 'sqlite3'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.1.0'
gem 'jquery-rails'
gem 'turbolinks'
gem 'jbuilder', '~> 2.0'
gem 'sdoc', '~> 0.4.0', group: :doc
gem 'puma'
gem 'quiet_assets'
gem 'devise'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'
  gem 'annotate'
end

```

Then run `bundle install` in the terminal.

```
$ bundle install
```

If `bundle install` can not be executed successfully, try deleting `Gemfile.lock` then run bundle install in the terminal again.

## Generating Models

### User Model

We are going to use [gem devise](https://github.com/plataformatec/devise) for authenticating the user. So first, run the following command into the terminal.

```bash
$ rails generate devise:install
```

After this, we can add `Devise` to the `User` model by run the following command.

```bash
$ rails generate devise User
```

We may want to override some views of `Devise` so let's run the following command.

```bash
$ rails generate devise:views
```

The above command will generate `Devise` views into `/app/views/devise` directory.

### Blog Model

Next, we are going to create `Blog` model that has `content:text` and `user:references` as the attributes.

```bash
$ rails generate scaffold Blog content:text user:references
```

After you generated 2 models, don't forget to run `rake db:migrate` in your terminal.

```bash
$ rake db:migrate
```

## Model Association

By using scaffold for `Blog` model, it will automatically generate association between `Blog` and `User` model like this.

```ruby
# /app/models/blog.rb

class Blog < ActiveRecord::Base
  belongs_to :user
end
```

But for the `User` model, we need to add the relationship between `User` and `Blog` model by ourselves.

```ruby
# /app/models/user.rb

class User < ActiveRecord::Base
	.
	.
	.      
  has_many :blogs
end
```


## Creating Mockup-Users

```ruby
# /db/seeds.rb

(1..3).each do |i|
  user = User.create(email: "user#{i}@cs474.com",
                      password: "12345678",
                      password_confirmation: "12345678")
  user.save!
end
```

Then run `rake db:seed` in the terminal.

```bash
$ rake db:seed
```

## User-Authentication

We want the user to be authenticated before creating the blog, so we need to add `before_action` into ApplicationController.

```ruby
# /app/controllers/application_controller.rb

class ApplicationController < ActionController::Base
	.
	.
  before_action :authenticate_user!
end
```

## Routing

```ruby
# /config/routes.rb

Rails.application.routes.draw do
  resources :blogs
  devise_for :users
  root to: 'blogs#index'
end

```