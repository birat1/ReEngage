from django.core.management.base import BaseCommand

from .seed_admin import seedAdmin
from .seed_avatar import seedAvatar
from .seed_student import seedStudent
from .seed_studentAvatar import seedStudentAvatar

# run python manage.py seed


class Command(BaseCommand):
    help = "Seed all data"

    def handle(self, *args, **kwargs):
        seedAdmin()
        seedStudent()
        seedAvatar()
        seedStudentAvatar()
        self.stdout.write(self.style.SUCCESS("All data seeded."))
