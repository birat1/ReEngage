from ReEngage.models import Student, Avatar, StudentAvatar
import random

def seedStudentAvatar():
    students = Student.objects.all()
    avatars = Avatar.objects.all()

    if not students.exists() or not avatars.exists():
        print('No students or/or avatars found. Please seed them first.')
        return

    for student in students:
        avatar = random.choice(avatars)
        StudentAvatar.objects.create(
            student_id=student,
            avatar_id=avatar,
            is_equipped=True
        )
        print(f'Student {student.user.username} seeded with avatar "{avatar.name}".')
