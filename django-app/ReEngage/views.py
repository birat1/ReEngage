import json
from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions
from .models import Student, Admin, Avatar, StudentAvatar
from .serializers import StudentSerializer, AdminSerializer, AvatarSerializer
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'message': 'Login successful', 'username': user.username}, status=200)
            else:
                return JsonResponse({'error': 'Invalid username or password'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

class apiStudent(viewsets.ModelViewSet):
	queryset = Student.objects.all()
	serializer_class = StudentSerializer
	
	def get_item(self, user_id):
		try:
			return Student.objects.get(pk = user_id)
		except Student.DoesNotExist:
			return None
	
	def list(self, request):
		serializer = StudentSerializer(self.queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def create(self, request):
		data = {

			'person_id': request.data.get('person_id'),
			'firstname': request.data.get('firstname'),
			'surname': request.data.get('surname'),
			'password': request.data.get('password'),
			'year': request.data.get('year'),
			'managed_by': request.data.get('managed_by'),
			'level': request.data.get('level'),
			'xp': request.data.get('xp'),
			'points': request.data.get('points'),
			'english_answered': request.data.get('english_answered'),
			'maths_answered': request.data.get('maths_answered'),
			'science_answered': request.data.get('science_answered'),
			'english_correct': request.data.get('english_correct'),
			'maths_correct': request.data.get('maths_correct'),
			'science_correct': request.data.get('science_correct')
		}
		serializer = StudentSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def retrieve(self, request, user_id):
		student_instance = self.get_item(user_id)
		if not student_instance:
			return Response({"res": "Object with user_id does not exist"},status=status.HTTP_400_BAD_REQUEST)
		serializer = StudentSerializer(student_instance)
		return Response(serializer.data, status=status.HTTP_200_OK)
	
	def update(self, request, user_id):
		student_instance = self.get_item(user_id)
		if not student_instance:
			return Response({"res": "Object with user_id does not exist"},status=status.HTTP_400_BAD_REQUEST)
		data = {
			'user': request.data.get('user'), #///
			'year': request.data.get('year'),
			'managed_by': request.data.get('managed_by'),
			'level': request.data.get('level'),
			'xp': request.data.get('xp'),
			'points': request.data.get('points'),
			'english_answered': request.data.get('english_answered'),
			'maths_answered': request.data.get('maths_answered'),
			'science_answered': request.data.get('science_answered'),
			'english_correct': request.data.get('english_correct'),
			'maths_correct': request.data.get('maths_correct'),
			'science_correct': request.data.get('science_correct')
		}
		serializer = StudentSerializer(instance = student_instance, data=data, partial = True)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	
	def destroy(self, request, user_id):
		student_instance = self.get_item(user_id)
		if not student_instance:
			return Response({"res": "Object with person_id does not exists"},status=status.HTTP_400_BAD_REQUEST)
		else:	
			data = {
				'person_id': request.user.person_id,
				'firstname': request.data.get('firstname'),
				'surname': request.data.get('surname'),
				'password': request.data.get('password'),
				'year': request.data.get('year'),
				'managed_by': request.data.get('managed_by'),
				'xp': request.data.get('xp'),
				'points': request.data.get('points'),
				'streak': request.data.get('streak')
			}
			serializer = StudentSerializer(instance = student_instance, data=data, partial = True)
			if serializer.is_valid():
				serializer.save()
				return Response(serializer.data, status=status.HTTP_200_OK)
			else:
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class apiAdmin(viewsets.ModelViewSet):
	queryset = Admin.objects.all()
	serializer_class = AdminSerializer 

	def get_item(self, user_id):
		try:
			return Admin.objects.get(user_id = user_id)
		except Admin.DoesNotExist:
			return None
		
	def list(self, request):
		serializer = AdminSerializer (self.queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def create(self, request):
		data = {
			'person_id': request.data.get('person_id'),
			'firstname': request.data.get('firstname'),
			'surname': request.data.get('surname'),
			'password': request.data.get('password'),
			'email': request.data.get('email')
		}
		serializer = AdminSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def retrieve (self, request, user_id):
		admin_instance= self.get_item (user_id)
		if not admin_instance:
			return Response({"res": "Object with user_id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
		else:
			serializer = AdminSerializer (admin_instance)
			return Response (serializer.data, status=status.HTTP_200_OK)
	
	def update(self, request, person_id):
		admin_instance = self.get_item(person_id)
		if not admin_instance:
			return Response({"res": "Object with person_id does not exists"},status=status.HTTP_400_BAD_REQUEST)
		else:	
			data = {
				'person_id': request.user.person_id,
				'firstname': request.data.get('firstname'),
				'surname': request.data.get('surname'),
				'password': request.data.get('password'),
				'email': request.data.get('email')
			}
			serializer = AdminSerializer(instance = admin_instance, data=data, partial = True)
			if serializer.is_valid():
				serializer.save()
				return Response(serializer.data, status=status.HTTP_200_OK)
			else:
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def destroy(self, request, user_id):
		admin_instance = self.get_item(user_id)
		if not admin_instance:
			return Response({"res": "Object with user_id does not exist"},status=status.HTTP_400_BAD_REQUEST)
		admin_instance.delete()
		return Response({"res": "Object deleted!"}, status=status.HTTP_200_OK)
		

class apiAvatar(viewsets.ModelViewSet):
	queryset = Avatar.objects.all()
	serializer_class = AvatarSerializer

	def get_item(self, avatar_id):
		try:
			return Avatar.objects.get(avatar_id = avatar_id)
		except Avatar.DoesNotExist:
			return None
		
	def list(self, request):
		serializer_class = AvatarSerializer (self.queryset, many=True)
		return Response(serializer_class.data, status=status.HTTP_200_OK)

	def retrieve(self, request, avatar_id):
		avatar_instance = self.get_item(avatar_id)
		if not avatar_instance:
			return Response({"res": "Object with avatar_id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
		serializer = AvatarSerializer (avatar_instance)
		return Response (serializer.data, status=status.HTTP_200_OK)
		
	def update(self, request, avatar_id):
		avatar_instance= self.get_object (avatar_id)
		if not avatar_instance:
			return Response({"res": "Object with avatar_id does not exists"},status=status.HTTP_400_BAD_REQUEST)
		data = {
			'avatar_id': avatar_id,
			'name': request.data.get('name'),
			'price': request.data.get('price')
		}
		serializer = AvatarSerializer(instance =avatar_instance, data=data, partial = True)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#to return all the students managed by the current logged in admin
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_students(request, user):
    if not hasattr(user, 'admin'):
        return Response({'detail': 'Forbidden'}, status=403)

    try:
        admin = Admin.objects.get(user=request.user)
        students = Student.objects.filter(managed_by=admin)
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)
    except:
        return Response({'detail': 'Forbidden'}, status=403)

	
#to return current logged in user
@api_view(['GET'])
@login_required
def get_user_info(user):
    if hasattr(user, 'admin') and user.admin.is_admin:
        return JsonResponse({
		'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.admin.firstname,
        'last_name': user.admin.surname,
        'is_admin': user.admin.is_admin,
	})
    elif hasattr(user, 'student'):
        return JsonResponse({
		'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.student.firstname,
        'last_name': user.student.surname,
        'is_admin': user.student.is_admin,
		})

#to return current equipped student avatar
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_equipped_avatar(request, user_id):
	if request.user.id != user_id:
		return Response({"error": "Unauthorized access"}, status=403)

	if hasattr(request.user, 'student'):
		try: 
			equipped_avatar = StudentAvatar.objects.get(
                student_id=request.user.student,
                is_equipped=True
            )
			serializer = AvatarSerializer(equipped_avatar.avatar_id)
			return Response(serializer.data)
		except StudentAvatar.DoesNotExist:
			 return Response({"error": "No avatar equipped"}, status=404)