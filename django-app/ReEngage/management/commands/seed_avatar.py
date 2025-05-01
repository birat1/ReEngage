from ReEngage.models import Avatar

def seedAvatar():
    avatars = [
        {"name": "default", "price": 100},
        {"name": "One", "price": 200},
        {"name": "Two", "price": 300},
        {"name": "Three", "price": 400},
        {"name": "Four", "price": 500},
        {"name": "Five", "price": 600}
    ]

    # Seed 6 avatars
    for a in avatars:
        if not Avatar.objects.filter(name=a["name"]).exists():
            Avatar.objects.create(**a)
            print(f'Avatar {a["name"]} created.')
        else:
            print(f'Avatar {a["name"]} already exists.')