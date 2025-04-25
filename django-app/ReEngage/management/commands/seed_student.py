import random
from django.contrib.auth.models import User
from ReEngage.models import Admin, Student

def seedStudent():
    admin_objects = list(Admin.objects.all())
    
    if not admin_objects:
        print('No Admins found. Please seed Admins first.')
        return

    names = ["student_Nisaar", "student_Jason", "student_Yuken", "student_Birat"]

    for i in range(4):
        username = names[i]
        if not User.objects.filter(username=username).exists():

            student_user = User.objects.create_user(
                username=username,
                password='studentpw',
                email=f"{username}@example.com"
            )

            Student.objects.create(
                user=student_user,
                year=3 + i,
                managed_by=random.choice(admin_objects),
                level=random.randint(1, 10),
                xp=random.randint(0, 1000),
                points=random.randint(0, 500),
                streak=random.randint(0, 10),
                english_answered=random.randint(10, 100),
                maths_answered=random.randint(10, 100),
                science_answered=random.randint(10, 100),
                english_correct=random.randint(5, 95),
                maths_correct=random.randint(5, 95),
                science_correct=random.randint(5, 95)
            )
            print(f'Student {username} created.')
        else:
            print(f'Student {username} already exists.')