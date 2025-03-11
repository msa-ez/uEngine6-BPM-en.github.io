---
description: ''
sidebar: 'getting-started'
---

# Account Management and Access Methods

## Keycloak Configuration

Keycloak is an open-source solution for authentication and authorization management in uEngine6. You can set up Keycloak to perform user authentication and permission management.

### Accessing the Keycloak Administrator Page

To access the Keycloak administrator page, use the following URL:

```
http://localhost:9090
```


![](../../uengine-image/account_1.png)

### Default Administrator Account

The default administrator account for Keycloak is as follows:

- **Username**: `admin`
- **Password**: `admin`

You can use this account to log in to the Keycloak administrator page. After logging in, it is recommended to change the administrator account password as needed.



### Adding uEngine Client

You can add an uEngine client to set up integration with uEngine6. Follow these steps to add a client

Log in and click on clients from the screen

![](../../uengine-image/account_2.png)

Click the Create button to open the settings screen

![](../../uengine-image/account_3.png)

Set the name to uengine and click the Save button

When successfully created, the client will be added as shown below
![](../../uengine-image/account_4.png)

Click the Edit button here to open the settings screen

Configure the settings to match the screen below and click the Save button
![](../../uengine-image/account_5.png)

![](../../uengine-image/account_6.png)

### Role Configuration

To configure roles, click on Roles to check the role list.

![](../../uengine-image/account_7.png)

If you want to add a role, click the Add Role button in the upper right corner to add a role.

![](../../uengine-image/account_8.png)

Enter the role name on this screen and click the save button to add the role.

When the role is added, you can confirm that the role has been added as shown below.
![](../../uengine-image/account_9.png)

### Adding Users

To add users, click on Users to check the user list.

![](../../uengine-image/account_10.png)

If you want to add a user, click the Add User button in the upper right corner to add a user.

![](../../uengine-image/account_11.png)

Enter the username on this screen and click the save button to add the user.

When the user is added, you can confirm that the user has been added as shown below.

![](../../uengine-image/account_12.png)

Click the Edit button here to open the user settings screen to assign roles to the user and set a password

![](../../uengine-image/account_13.png)

In the Credentials tab, set the password and click the reset password button to specify the password.

![](../../uengine-image/account_14.png)

Assign roles to the user in the Role Mappings tab.
Select the roles to assign to the user from Available Roles and click the Add Selected button to assign roles to the user.

### Verifying User Access

To verify user access, log in using the username and password.

![](../../uengine-image/account_15.png)

After logging in, press the start button to enter the dashboard, and you can see the user access verification screen as shown below.

![](../../uengine-image/account_16.png)

![](../../uengine-image/account_17.png)

