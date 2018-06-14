These server deploy instructions are for **CentOS 7** running **PHP 7.2.***

### Step 1 - Install PHP Extensions
With the defualt PHP installation, you will have to install 3 PHP extensions.

```bash
yum install php-pecl-zip
yum install php-mbstring
yum install php-xml
```

### Step 2 - Navigate
Navigate to the root directory of the server (Or whichever folder you wish to be the pubic root)

### Step 3 - Install Composer
You can find the installation instructions at https://getcomposer.org/download/

### Step 4 - Install Laravel
`php composer.phar global require "laravel/installer"`

### Step 5 - Create Laravel Project
`php composer.phar create-project laravel/laravel="5.6.*" SussexProjects`

You could rename SussexProjects to another name, 
however you will have to change the namespace in every PHP file from use SussexProjects\* to ChosenName\* and change the .env file.
