import logging
logger = logging.getLogger(__name__)

import json
from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions
from .models import Student, Admin, Avatar, StudentAvatar, ContactMessage
from .serializers import StudentSerializer, AdminSerializer, AvatarSerializer, ContactMessageSerializer
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
import math


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
                request.session.save() #need to save the session
                return JsonResponse({
                    'message': 'Login successful',
                    'username': user.username,
                    'is_admin': hasattr(user, 'admin'),
                    'user_id': user.id,
                    'sessionid': request.session.session_key
                }, status=200)
            else:
                return JsonResponse({'error': 'Invalid username or password'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def logout_user(request):
	if request.method == 'POST':
		try:
			logout(request)
			return JsonResponse({'message': 'Logout successful'}, status=200)
		except Exception as e:
			return JsonResponse({'error': str(e)}, status=500)
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
		sort_field = request.query_params.get('sort_by', None)
		students = Student.objects.all()

		if sort_field in ['points', 'xp', 'firstname', 'surname']:
			students = students.order_by(f'-{sort_field}') 
		serializer = StudentSerializer(students, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def create(self, request):
		data = {
			'person_id': request.data.get('person_id'),
			'user': request.data.get('user'),
			'firstname': request.data.get('firstname'),
			'surname': request.data.get('surname'),
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
			student = serializer.save()
			#assigning default avatar (id=1) to the new student
			try:
				default_avatar = Avatar.objects.get(avatar_id=1)
				StudentAvatar.objects.create(
					student_id=student,
					avatar_id=default_avatar,
					is_equipped=True
           		)
			except Avatar.DoesNotExist:
				logger.error("Default avatar (id=1) does not exist")
				return Response(
					{"error": "Default avatar not found"}, 
					status=status.HTTP_500_INTERNAL_SERVER_ERROR
				)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def retrieve(self, request, user_id):
		student_instance = self.get_item(user_id)
		if not student_instance:
			return Response({"res": "Object with user_id does not exist"},status=status.HTTP_400_BAD_REQUEST)
		serializer = StudentSerializer(student_instance)
		return Response(serializer.data, status=status.HTTP_200_OK)
	
	@csrf_exempt
	def update(self, request, user_id):
		if request.method == 'PUT':
			try:
				data = json.loads(request.body)
				# logger.info(f"Received data for user {user_id}: {data}")

				student_instance = self.get_item(user_id)
				if not student_instance:
					return JsonResponse({'error': f'Student with user_id {user_id} does not exist'}, status=404)

				serializer = StudentSerializer(instance=student_instance, data=data, partial=True)
				if serializer.is_valid():
					serializer.save()
					# logger.info(f"Student {user_id} updated successfully")
					return JsonResponse({'message': 'Student updated successfully'}, status=200)
				else:
					# logger.error(f"Validation errors: {serializer.errors}")
					return JsonResponse({'error': serializer.errors}, status=400)
			except Exception as e:
				# logger.error(f"Error updating student {user_id}: {str(e)}")
				return JsonResponse({'error': str(e)}, status=500)
		return JsonResponse({'error': 'Invalid request method'}, status=405)
		
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
def get_students(request):
    if not hasattr(request.user, 'admin'):
        return Response({'detail': 'Forbidden - Admin access required'}, status=403)
    
    try:
        admin = Admin.objects.get(user=request.user)
        students = Student.objects.filter(managed_by=admin)
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': str(e)}, status=500)


# returns current logged in user info
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    logger.info(f"Session ID: {request.session.session_key}, User: {request.user}")

    user = request.user
    if not user.is_authenticated:
        return Response({'error': 'Not authenticated'}, status=401)

    try:
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }

        if hasattr(user, 'admin'):
            admin_data = {
                'first_name': user.admin.firstname,
                'last_name': user.admin.surname,
                'is_admin': True,
            }
            user_data.update(admin_data)
        elif hasattr(user, 'student'):
            student_data = {
                'first_name': user.student.firstname,
                'last_name': user.student.surname,
                'is_admin': False,
                'level': math.floor(user.student.xp/100),
                'xp': user.student.xp,
                'points': user.student.points,
                'streak': user.student.streak,
                'english_answered': user.student.english_answered,
                'english_correct': user.student.english_correct,
				'english_percentage': (user.student.english_correct / user.student.english_answered * 100)
					if user.student.english_answered > 0 else 0,
                'maths_answered': user.student.maths_answered,
				'maths_percentage': (user.student.maths_correct / user.student.maths_answered * 100)
				 	if user.student.maths_answered > 0 else 0,
                'maths_correct': user.student.maths_correct,
                'science_answered': user.student.science_answered,
                'science_correct': user.student.science_correct,
					'science_percentage': (user.student.science_correct / user.student.science_answered * 100)
				 	if user.student.science_answered > 0 else 0,
				'owned_avatars': [{
					'avatar_id': sa.avatar_id.avatar_id,
					'name': sa.avatar_id.name,
					'price': sa.avatar_id.price,
					'is_equipped': sa.is_equipped,
					}
            		for sa in StudentAvatar.objects.filter(student_id=user.student).select_related('avatar_id')
        		]
            }
            user_data.update(student_data)
        else:
            return Response({'error': 'User type not recognized'}, status=400)

        return Response(user_data, status=200)
    except Exception as e:
        logger.error(f"Error in get_user_info: {str(e)}")
        return Response({'error': str(e)}, status=500)

#to return current equipped student avatar
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_equipped_avatar(request, user_id):
        try: 
            equipped_avatar = StudentAvatar.objects.get(
                student_id=user_id,
                is_equipped=True
            )
            serializer = AvatarSerializer(equipped_avatar.avatar_id)
            return Response(serializer.data)
        except StudentAvatar.DoesNotExist:
            return Response({"error": "No avatar equipped"}, status=404)

@api_view(['POST'])
def submit_contact_form(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Your message has been sent successfully!'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)