---
description: ''
sidebar: 'getting-started'
---
# Form Management

## Form-Based Task Activity Execution

You can click on the 'Screen Definition' icon on the left to move to the screen definition where you can create a form based on the necessary content in the parameter context of the task activity, as shown below.
![](../../uengine-image/form-definition-1.png)

Looking at the right area, you can see functionality to automatically generate forms through AI according to requirements and to create forms by adding directly. Let's create the first process of the fault handling process example, 'Fault Report', as a form-based process.

## Form Creation

The fault report process requires the following data

- Fault description
- Fault type

To proceed with the screen definition based on the requirements, drag and drop Container > 1column to the editing area.

Then, drag and drop Components > text-field (fault description), radio-field (fault type) to the editing area to create a screen like the one below.

![](../../uengine-image/form-definition-2.png)


## Detailed Form Settings

Hover over 'name-1' of the created form > Click the settings at the top right as shown below to perform detailed form settings for 'name-1'.
![](../../uengine-image/form-definition-3.png)

Set the attributes such as data name, label, data type, etc. for the fault description in the detailed form settings as shown below, and click 'Apply' to complete the settings.
![](../../uengine-image/form-definition-4.png)

Configure the detailed form settings for the fault type through 'name-2' as shown below.
![](../../uengine-image/form-definition-5.png)

After completing the settings for the fault report, proceed with saving the screen on the left, and you can see the created form in the definition list on the left as shown below.
![](../../uengine-image/form-definition-6.png)

## Variable Definition

The created form can be stored as a variable in the form format in Process Definition > Process Variables as shown below, and then set as a form in the panel of the fault report task activity.
![](../../uengine-image/form-definition-7.png)
