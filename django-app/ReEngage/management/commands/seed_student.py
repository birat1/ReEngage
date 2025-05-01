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

            englishA=random.randint(10, 100)
            mathsA=random.randint(10, 100)
            scienceA=random.randint(10, 100)

            englishC=random.randint(0, englishA)
            mathsC=random.randint(0, mathsA)
            scienceC=random.randint(0, scienceA)

            Student.objects.create(
                user=student_user,
                firstname = username + "'s firstname",
                surname = username + "'s surname",
                year=3 + i,
                managed_by=random.choice(admin_objects),
                level=random.randint(1, 10),
                xp=random.randint(0, 1000),
                points=random.randint(0, 500),
                streak=random.randint(0, 10),
                english_answered=englishA,
                maths_answered=mathsA,
                science_answered=scienceA,
                english_correct=englishC,
                maths_correct=mathsC,
                science_correct=scienceC
            )
            print(f'Student {username} created.')
        else:
            print(f'Student {username} already exists.')