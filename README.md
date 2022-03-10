🌙 laravel-react-boilerplate
====

[![isystk](https://circleci.com/gh/isystk/laravel-react-boilerplate.svg?style=svg)](https://circleci.com/gh/circleci/circleci-docs)
![GitHub issues](https://img.shields.io/github/issues/isystk/laravel-react-boilerplate)
![GitHub forks](https://img.shields.io/github/forks/isystk/laravel-react-boilerplate)
![GitHub stars](https://img.shields.io/github/stars/isystk/laravel-react-boilerplate)
![GitHub license](https://img.shields.io/github/license/isystk/laravel-react-boilerplate)

## 📗 Project overview

This is a sample application for learning Laravel & React.js.

### Target people
- For those who want to learn Laravel for the first time
- Those who want to build a Laravel development environment using Docker
- Those who want to learn EC sites
- Those who want to create a management screen (multi-login)
- Those who want to create a settlement process using Stripe
- Those who want to create social login
- For those who want to create an image upload to object storage
- Those who want to create a front end with React.js

### Technology used

#### ■ Infrastructure
- Apache 2.4.46 ... Apache has been adopted as the Web server. Since the self-signed certificate has already been set, it can operate as SSL in the development environment.
- MySQL 8 ... MySQL is adopted as the DB server. Data files, configuration files, logs, etc. are taken out of the container so that they can be referenced during development.
- phpMyAdmin: A tool for referencing and editing the started MySQL data.
- MailHog: A dummy SMTP server. You can view the sent email with your browser. Since the email is not actually sent, there is no need to worry about sending it by mistake during development.
- Minio: Object storage that is completely compatible with S3. It is used as a save destination for uploaded images.
- Redis: A persistent in-memory database. It is used as a cache of data acquired from the DB.

#### ■ Application

- Laravel 6.20.17
- React 16.2.0
- React-Redux 7.2.2
- typescript 4.2.3
- Bootstrap 4.0.0
- Admin-LTE 3.1.0

## 🌐 Demo

#### ■ Front screen (React)

https://laraec.isystk.com/

! [Front screen] (./front.png "Front screen")

- Login / Logout
- Member registration
- Password reminder
- Product list
- add to cart
- Stripe
- Add to favorites
- inquiry
- Social login (Google)

#### ■ Management screen (Bootstrap)

https://laraec.isystk.com/admin/

![Administration screen] (./admin.png "Administration screen")

- Login / Logout
- Product management
- Order history
- Customer management
- Inquiry management
- Image management
- CSV download
- PDF download
- Image upload

#### ■ Batch processing

- Product CSV output batch
- S3 product image upload batch

## 🔧 Building a development environment

* In order to use this environment, it is a prerequisite that docker and docker-compose are operating in advance.
(For Windows, prepare "WSL" and "Docker Desktop for Windows" by referring to the following.)

### WSL installation (for Windows)
reference
https://docs.microsoft.com/ja-jp/windows/wsl/install

Start Ubuntu with WSL
````
# The first time you launch it, you will be asked for your username and password.
# If you press Enter without typing anything, it will be available as the root user, so set it as the root user.

#First, refresh the library.
$ apt update

# Japanese is supported.
$ apt -y install language-pack-ja
$ update-locale LANG=ja_JP.UTF8
$ apt -y install manpages-ja manpages-ja-dev
````

### Install Docker Desktop for Windows (for Windows)

https://docs.docker.com/docker-for-windows/install/
````
↓ OK if the version is displayed at the command prompt
docker --version
````

### Make Docker for Windows available from WSL2 (for Windows)
reference
https://qiita.com/endo_hizumi/items/0cc50bdfbd827579733e
```
1. From the notification area, right-click the docker icon and select Setting
2. Check General expose deamon on ~~.
3. From WSL INTEGRATION in Resources, switch on "Ubuntu".

Set the WSL mount so that the root on the WSL side matches Docker for Windows.
$ vi /etc/wsl.conf
---
[automount]
root = /
options = "metadata"
---

It is normal if the path of the C drive is changed from "/ mnt / c /" to "/ c /" as shown below.
$ cd /c/Users/USER/github/laravel-react-boilerplate
$ pwd
/c/Users/USER/github/laravel-react-boilerplate

# Install Docker and Docker Compose on WSL.
$ apt install docker
$ apt install docker-compose

Now you can use Docker installed on the Windows side from WSL.
```

### Installation of MySQL Client 

```
# Install the command to connect to MySQL. (Any version is OK)

#For Windows
$ apt install mysql-client

#For Mac
$ brew install mysql-client
```

### Installation of Node.js 

```
#For Windows
$ curl -L git.io/nodebrew | perl --setup
#For Mac
$ brew install nodebrew

# Add nodebrew to the shell path
$ echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.bashrc

# Install Node.js
$ mkdir -p ~/.nodebrew/src
$ nodebrew ls-remote
$ nodebrew install v12.21.0
$ nodebrew use v12.21.0
$ npm install -g yarn
```

## 📦 ディレクトリ構造

```
.
├── docker (various Daemons)
│ │
│ ├── apache (Web server)
│ │ ├── conf.d (apache configuration file)
│ │ └── logs (apache logs)
│ ├── mysql (DB server)
│ │ ├── conf.d (mysql configuration file)
│ │ ├── data (mysql data file)
│ │ ├── init (initial DDL for mysql)
│ │ ├── logs (mysql logs)
│ │ └── script (mysql related script)
│ ├── php (PHP-FRM)
│ │ └── logs (php log)
│ ├── phpmyadmin (DB administration tool)
│ └── s3 (object storage)
│
├── htdocs (Apache public directory)
│ │
│ ├── app
│ │ ├── Console (batch application)
│ │ ├── Exceptions (exception handling)
│ │ ├── Http (Web application)
│ │ ├── Models
│ │ ├── Prociders (service provider)
│ │ └── Services (common processing)
│ ├── bootstrap
│ ├── config
│ ├── database
│ ├── public
│ ├── resources
│ ├── routes
│ ├── storage
│ ├── tests
│ └── composer.json
└── dc.sh (script for starting Docker)
```

## 🖊️ How to use shell script for Docker operation
```
Usage:
  dc.sh [command] [<options>]

Options:
  stats|st                 Shows the status of Docker containers.
  init                     Initializes the state of the Docker container, image, and generated file.。
  start                    Starts all Daemons.
  stop                     Stops all Daemons.
  apache restart           Restart Apache.
  mysql login              Log in to the MySQL database.
  mysql export <PAHT>      Export the dump file for the MySQL database.
  mysql import <PAHT>      Import the dump file into the MySQL database.
  mysql restart            Restarts the MySQL database.
  php login                PHP-Log in to the FPM server.
  php cache                Clear Laravel's cache.
  php migrate              Run migration of Laravel.
  php seed                 Register the test data of Laravel.
  --version, -v            Show the version.
  --help, -h               Display help.
```

### phpMyAdmin 
You can connect to the database to view and edit the data.
It can be used by accessing the following URL after starting Docker.。

http://localhost:8888/


### mailhog 
This is a dummy mail server. The email is not actually sent, and you can view the sent email in your browser.
You can use it by accessing the following URL after starting Docker.
http://localhost:8025/

### minio
Dummy object storage compliant with S3.
You can use it by accessing the following URL after starting Docker.

http://localhost:9001
Username / Password
access_key / secret_key

```bash
# Access AWS-CLI.
$ ./dc.sh aws local
# Create a bucket
> aws --endpoint-url http://s3:9000 s3 mb s3://laraec.isystk.com
# Publish the bucket
> POLICY='{ "Version": "2012-10-17", "Statement": [{ "Sid": "MakeItPublic", "Effect": "Allow", "Principal": "*", "Action": "s3:GetObject", "Resource": "arn:aws:s3:::laraec.isystk.com/*" }] }'
> aws --endpoint-url http://s3:9000 s3api put-bucket-policy --bucket laraec.isystk.com --policy "${POLICY}"
# Check the list of buckets
> aws --endpoint-url http://s3:9000 s3 ls
# Upload the test file
> aws --endpoint-url http://s3:9000 s3 cp ./front.png s3://laraec.isystk.com
$ open http://localhost:9000/laraec.isystk.com/front.png
```

## 💬 How to use

```
# Get ready
$ ./dc.sh init

# Start the server
$ ./dc.sh start

# Wait a moment for the database and PHP to come up. (About 5 minutes for the first time)

# Try logging in to MySQL
$ ./dc.sh mysql login

# Try logging in to the PHP server (commands such as composer and artisan are basically done here)
$ ./dc.sh php login

# Copy .env
> cp .env.example .env

# encryption Generate key
> php artisan key:generate

# Download module
> composer update
> php artisan cache:clear
> php artisan config:clear
# Creating tables and test data
> php artisan migrate:fresh --seed
> chmod 777 -R bootstrap/cache
> hmod 777 -R storage

# Upload the test image to S3 (Minio).
> php artisan s3upload

# Create a symbolic link so that you can refer to the uploaded image
> cd public
> ln -s ../storage/app/public uploads

# Build the front end.
$ cd htdocs
$ yarn && yarn run dev

# Access with a browser (front)
$ open https://localhost/

# Access with a browser (management screen)
$ open https://localhost/admin/

# Execute batch (product CSV output batch)
$ ./dc.sh php login
$ php artisan stockcsv

# When stopping the server
$ ./dc.sh stop
```

## 🎨 Reference

| Project | Overview |
| :---------------------------------------| :-------------------------------|
| [Laravel6 Official Document] (https://readouble.com/laravel/6.x/ja/) | Laravel6 Official Document. |
| [Helper Functions] (https://readouble.com/laravel/6.x/ja/helpers.html) | This is a description of helper functions that are useful for developing Laravel. |
| [Query Builder] (https://readouble.com/laravel/6.x/ja/queries.html) | This is a description of the query builder required when accessing the DB in Laravel development. |
| [AdminLTE Docs] (https://adminlte.io/docs/2.4/installation) | AdminLTE Docs |
| [Bootstrap4 Japanese Reference] (https://getbootstrap.jp/docs/4.4/getting-started/introduction/) | Bootstrap4 Japanese Reference |
| [fontawesome] (https://fontawesome.com/icons?d=gallery) | Used for icon display. |
| [How to implement multi-authentication (user and admin) in Laravel 5.4] (https://takahashi-it.com/php/laravel54-multi-auth/) | Implement multi-authentication (user and admin) in Laravel I used it as a reference. |
| [Creating a Stripe environment in Laravel] (https://takkublog.net/stripe01/) | I referred to how to create a settlement process in Laravel. |
| [Easy social login implementation with Laravel + Socialite!] (Https://qiita.com/KeisukeKudo/items/18dd8a342a4bdd43913c) | I referred to how to create social login with Laravel. |
| [What to do if you can't resolve dns names with WSL2 and can't connect to the internet] (https://qiita.com/kkato233/items/1fc71bde5a6d94f1b982) | I used it as a reference when I couldn't do it. |
| [Replace all Laravel authentication screens with React] (https://qiita.com/shikigamix/items/99a4f2ab5911248f8b2f) | I referred to how to create Laravel front end authentication with React. |
| [react-bootstrap] (https://react-bootstrap.github.io/components/) | Bootstrap React components |

## 🎫 Licence

[MIT](https://github.com/isystk/laravel-react-boilerplate/blob/master/LICENSE)

## 👀 Author

[isystk](https://github.com/isystk)


