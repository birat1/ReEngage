from ReEngage.models import Student, Avatar, StudentAvatar
import random

def seedStudentAvatar():
    students = Student.objects.all()
    avatarID = [2,3,4,5,6,7]
    avatars = Avatar.objects.filter(avatar_id__in=avatarID)

    if not students.exists():
        print('No students found. Please seed them first.')
        return

    for student in students:
        if not StudentAvatar.objects.filter(student_id=student).exists():
            avatar = Avatar.objects.get(avatar_id=1)
            StudentAvatar.objects.create(
                student_id=student,
                avatar_id=equipped_avatar,
                is_equipped=True
            )
            print(f'Student {student.user.username} seeded with avatar "{equipped_avatar.name}".')
        else:
            print(f'Student {student.user.username} already has an avatar assigned')
