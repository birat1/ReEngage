from ReEngage.models import Avatar

def seedAvatar():
    avatars = [
        {"name": "default", "price": 10},
        {"name": "One", "price": 20},
        {"name": "Two", "price": 30},
        {"name": "Three", "price": 40},
        {"name": "Four", "price": 50},
        {"name": "Five", "price": 60}
    ]

    # Seed 6 avatars
    for a in avatars:
        if not Avatar.objects.filter(name=a["name"]).exists():
            Avatar.objects.create(**a)
            print(f'Avatar {a["name"]} created.')
        else:
            print(f'Avatar {a["name"]} already exists.')