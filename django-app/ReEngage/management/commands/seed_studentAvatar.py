from ReEngage.models import Student, Avatar, StudentAvatar
import random

def seedStudentAvatar():
    students = Student.objects.all()
    avatars = Avatar.objects.all()

    if not students.exists() or not avatars.exists():
        print('No students or/or avatars found. Please seed them first.')
        return

    for student in students:
        if not StudentAvatar.objects.filter(student_id=student).exists():
            avatar = Avatar.objects.get(avatar_id=1)
            StudentAvatar.objects.create(
                student_id=student,
                avatar_id=avatar,
                is_equipped=True
            )
            print(f'Student {student.user.username} seeded with avatar "{avatar.name}".')
        else:
            print(f'Student {student.user.username} already has an avatar assigned')
