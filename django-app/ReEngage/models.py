from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#Note that User had username, password, id, and email fields
#Class for parents/teachers; people who create/manage the student's accounts
class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    firstname = models.CharField(max_length=20, default='def')
    surname = models.CharField(max_length=20, default='def')
    is_admin = models.BooleanField(default=True)

#Class for students
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    firstname = models.CharField(max_length=20, default='def')
    surname = models.CharField(max_length=20, default='def')
    year = models.IntegerField(choices=[(i, i) for i in range(3, 7)])
    managed_by = models.ForeignKey(Admin, on_delete=models.CASCADE)
    level = models.PositiveIntegerField()
    xp = models.PositiveIntegerField()
    points = models.PositiveIntegerField()
    streak = models.PositiveIntegerField() #We may not ned this
    english_answered = models.PositiveIntegerField()
    maths_answered = models.PositiveIntegerField()
    science_answered = models.PositiveIntegerField()
    english_correct = models.PositiveIntegerField()
    maths_correct = models.PositiveIntegerField()
    science_correct = models.PositiveIntegerField()
    is_admin = models.BooleanField(default=False)
    avatars = models.ManyToManyField('Avatar', through='StudentAvatar')

#Class for each avatar
class Avatar(models.Model):
    avatar_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    #image = models.ImageField(upload_to='uploads')
    price = models.PositiveIntegerField()

#Class for avatar's owned by students
class StudentAvatar(models.Model):
    student_id = models.ForeignKey(Student, on_delete=models.CASCADE)
    avatar_id = models.ForeignKey(Avatar, on_delete=models.CASCADE)
    is_equipped = models.BooleanField()

    class Meta:
        unique_together = ('student_id', 'avatar_id')
        constraints = [
            models.UniqueConstraint(fields=['student_id'], condition=models.Q(is_equipped=True), name='single_avatar_equipped')
        ]