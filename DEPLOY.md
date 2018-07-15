These server deploy instructions are for **CentOS 7** running **PHP 7.2.***

### Step 1 - Install PHP Extensions
With the defualt PHP installation, you will have to install a few PHP extensions.

```bash
yum install php-pecl-zip
yum install php-mbstring
yum install php-xml
yum install php-bcmath
yum install php-pdo
yum install php-pdo_mysql
yum install php-ldap
```

### Step 2 - Navigate
Navigate to the root directory of the server (Or whichever folder you wish to be the pubic root)

### Step 3 - Clone Repository
Before doing this, double check you are in the directory you wish to be public.
A folder named Final-Year-Database will be made in the current directory.

`git clone https://github.com/LewisJohnson/Final-Year-Database.git`

After this navigate to the *app* folder

### Step 4 - Install Back-End Dependencies
`sudo php ../composer.phar install --no-dev`

### Step 5 - Install NodeJs
We need npm, a JavaScript package manager.
The only way to get npm is to download nodeJs.

`sudo yum -y install nodejs`

### Step 6 - Install Front-End Dependencies
`sudo npm install`

### Step 7 - Compile JS and SASS
`sudo npm run prod`

### Step 8 - Setup Environment File
Copy the example environment file

`cp .env.example .env`

One you have copied the .env file, you will need a random key;

`php artisan key:generate`

Now you may edit the environment file to your liking.

APP_URL is very important, make sure to set it to the app folder e.g
https://www.example.com/Final-Year-Database/app/

### Step 9 - Permissions
sudo chgrp -R apache /var/www/html/courses/Final-Year-Database/app
sudo chmod -R 775 /var/www/html/courses/Final-Year-Database/app/storage

### Step 9 - Create Database

**WARNING: THIS STEP WILL DROP ALL TABLES IN THE DATABASE**

Double check you have set the `.env` environment file correctly before doing this step.
Run the command

`php artisan migrate:fresh`

Running this command will create all the tables needed for the system.

### Step 10 - Create System Administrator
After the server is fully configured and running, it's time to bootstrap the system with a system administrator. Simply enter the command and follow the on-screen instructions.

`php artisan make:admin`

If you make a mistake, repeat step.


