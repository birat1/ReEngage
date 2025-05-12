from ReEngage.models import Admin
from django.contrib.auth.models import User

def seedAdmin():
    if not User.objects.filter(username='admin_Riley').exists():
        user1 = User.objects.create_user('admin_Riley', 'R@email.com', 'Rpw')
        user2 = User.objects.create_user('admin_Charlie', 'C@email.com', 'Cpw')
        Admin.objects.create(user=user1, firstname='Riley', surname='Taylor')
        Admin.objects.create(user=user2, firstname = 'Charlie', surname='Bill')
        print('Admin users created.')
    else:
        print('Admin users already exist.')
