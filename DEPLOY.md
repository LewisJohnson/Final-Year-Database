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

### Step 3 - Install Composer
You can find the installation instructions at https://getcomposer.org/download/

### Step 4 - Install Laravel
`php composer.phar global require "laravel/installer"`

### Step 5 - Clone Repository
Before doing this, double check you are in the directory you wish to be public
`git clone https://github.com/LewisJohnson/Final-Year-Database.git`

After cloning, you may want to remove some files you probably don't want

```bash
cd Final-Year-Database/
rm DEPLOY.md
rm Report.pdf
rm RouteList.txt
rm -r docs
rm app/serve.bat
```

### Step 6 - Enviroment
Copy the example enviroment file
`cp .env.example .env`

Then open and edit the enviroment file

### Step 7 - Install Back-End Dependencies
`php ../../composer.phar update`

### Step 8 - Install NodeJs
We need npm, a JavaScript package manager.
The only way to get npm is to download nodeJs.

`sudo yum -y install nodejs`

### Step 9 - Install Front-End Dependencies
`npm install`

### Step 10 - Compile JS and SASS
`npm run prod`

### Step 11 - Create System Administrator
After the server is fully configured and running, it's time to bootstrap the system with a system administrator. Simply enter the command and follow the on-screen instructions.

`php artisan make:admin`

If you make a mistake while creating the system administrator, run the following command to empty all the tables:

`php artisan migrate:fresh`