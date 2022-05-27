During the demo I noticed that sorting of amount doesn't work as expected.
The expected output is to be sorted by asc/desc as numeric value.
The actual output is that Amount column is sorted as a string which gives us incoreect result.
This can be solved by parsing the Amount column to be numeric type, but the challange is to keep the existing format of amount column (separated by comma and with '€' at the end).

Also my Feed component is not scalable, it means that it satisfies all requirments from the task but if I upload any other CSV
I should make significant changes to support that new format.
