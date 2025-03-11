---
description: ''
sidebar: 'getting-started'
---

# Administrator Page Features and Overview
The administrator page is a page for process management. The process manager page exists in the upper left corner and is a page where you can check the status of executed processes, called instances, and check the progress status of instances. On the administrator page, you can check the following functions.
  - Instance search function
  - Instance status check
  - Check the data information status of the instance
  - Rollback the work status of the instance

<img width="592" alt="스크린샷 2024-12-24 오후 5 05 49" src="https://github.com/user-attachments/assets/82a83437-179f-4744-a212-a7641db9636f" />

## Instance Management Function

### Instance List Management Display and Search
When a process is executed, an instance is created, and on the administrator page, you can check multiple instances through search. The instance list is configured to show whether it is a subprocess and the status of the current task, and you can check the status of each instance.
![스크린샷 2024-12-26 오후 2 58 15](https://github.com/user-attachments/assets/69bbcd26-e68b-40b1-a586-421c2d0412ab)
Image) Instance list

When you click on the "Task" column name in the instance list, you can check the status of that instance. In the detailed view, the left side displays the status of the task, and the right side allows you to check the data that was entered during the task.
<table>
  <tr>
    <td>
      <img width="533" alt="스크린샷 2024-12-26 오후 2 54 52" src="https://github.com/user-attachments/assets/eaf06ec4-a978-47ad-97cd-8c1c8590ddc5" />
    </td>
    <td>
      <img width="533" alt="스크린샷 2024-12-26 오후 2 54 52" src="https://github.com/user-attachments/assets/d5e9c79e-c4cc-4848-8551-41761f971502" />
    </td>
  </tr>
</table>
Image) Checking a running instance

### Instance Status Management
In case you need to cancel a task or rework it in each instance, functionality is provided to roll back to that task status. To roll back, select the desired instance, move to the task at that point, and click the "Rollback" button. When rollback is performed, subsequent tasks are changed to a canceled status, and the corresponding task is changed to a "Running" status. If rollback is performed within a subprocess, the instance of the subprocess is also changed to a "Running" status.

<img width="195" alt="스크린샷 2024-12-26 오후 2 37 30" src="https://github.com/user-attachments/assets/7a656e0e-e163-4b3e-9704-1961937a437e" />
Image) Rollback button