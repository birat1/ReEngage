from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
#///NOTES/BUGS: NEED PERSON TO BE USER??? NEED AUTHENTICATION!!!
#Class for all the people
class Person(models.Model): #///Do I need this to be abstract??
    person_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=64) #///personneed security here
    password = models.CharField(max_length=64)

#Class for parents/teachers; people who create/manage the student's accounts
class Admin(Person):
    email = models.EmailField()

#Class for students
class Student(Person):
    year = models.IntegerField(choices=((i,i) for i in range(3, 6)))#///
    managed_by = models.ForeignKey(Admin, on_delete=models.CASCADE)
    level = models.PositiveIntegerField()
    xp = models.PositiveIntegerField()
    points = models.PositiveIntegerField()
    streak = models.PositiveIntegerField()

#Class for each avatar
class Avatar(models.Model):
    avatar_id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='uploads')#//where to store??
    price = models.PositiveIntegerField

#Class for avatar's owned by students
class StudentAvatar():
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE)
    avatar_id = models.ForeignKey(Avatar, on_delete=models.CASCADE)
    is_equipped = models.BooleanField()