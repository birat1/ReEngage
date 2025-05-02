from ReEngage.models import Admin
from django.contrib.auth.models import User

def seedAdmin():
    if not User.objects.filter(username='admin_Gianna').exists():
        user1 = User.objects.create_user('admin_Gianna', 'G@email.com', 'Gpw')
        user2 = User.objects.create_user('admin_Isabelle', 'I@email.com', 'Ipw')
        Admin.objects.create(user=user1, firstname='Gianna', surname='Addae')
        Admin.objects.create(user=user2, firstname = 'Isabelle', surname='Bill')
        print('Admin users created.')
    else:
        print('Admin users already exist.')
