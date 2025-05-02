from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions
from . models import Student, Admin, Avatar
from .serializers import StudentSerializer, AdminSerializer, AvatarSerializer

class apiStudent(viewsets.ModelViewSet):
	queryset = Student.objects.all()
	
	def get_item(self, user_id):
		try:
			return Student.objects.get(user_id = user_id)
		except Student.DoesNotExist:
			return None
	
	def list(self, request):
		serializer = StudentSerializer(self.queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)

	def create(self, request):
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
		serializer = StudentSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def retrieve(self, request):
		student_instance = self.get_item(request.user.user_id)
		if not student_instance:
			return Response({"res": "Object with user_id does not exists"},status=status.HTTP_400_BAD_REQUEST)
		serializer = StudentSerializer(student_instance)
		return Response(serializer.data, status=status.HTTP_200_OK)
	
	def update(self, request):
		student_instance = self.get_item(request.user.user_id)
		if not student_instance:
			return Response({"res": "Object with user_id does not exists"},status=status.HTTP_400_BAD_REQUEST)
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

	
	def destroy(self, request):
		student_instance = self.get_object(request.user.user_id)
		if not student_instance:
			return Response({"res": "Object with student id does not exists"},status=status.HTTP_400_BAD_REQUEST)
		student_instance.delete()
		return Response({"res": "Object deleted!"},status=status.HTTP_200_OK)

class apiAdmin(viewsets.ModelViewSet):
	queryset = Admin.objects.all()

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
			'user': request.data.get('user'), #///
		}
		serializer = AdminSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def retrieve (self, request):
		admin_instance= self.get_item (request.user.user_id)
		if not admin_instance:
			return Response({"res": "Object with user_id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
		else:
			serializer = AdminSerializer (admin_instance)
			return Response (serializer.data, status=status.HTTP_200_OK)
	
	def update(self, request):
		admin_instance= self.get_item (request.user.user_id)
		if not admin_instance:
			return Response({"res": "Object with user_id does not exists"},status=status.HTTP_400_BAD_REQUEST)	
		data = {
			'user': request.user.user_id,
		}
		serializer = AdminSerializer(instance = admin_instance, data=data, partial = True)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
	
	def destroy(self, request, user):
		admin_instance = self.get_item(request.user.user_id)
		if not admin_instance:
			return Response({"res": "Object with user_id does not exist"},status=status.HTTP_400_BAD_REQUEST)
		admin_instance.delete()
		return Response({"res": "Object deleted!"}, status=status.HTTP_200_OK)
		

class apiAvatar(viewsets.ModelViewSet):
	queryset = Avatar.objects.all()

	def get_item(self, avatar_id):
		try:
			return Avatar.objects.get(avatar_id = avatar_id)
		except Avatar.DoesNotExist:
			return None
		
	def list(self, request):
		serializer_class = AvatarSerializer (self.queryset, many=True)
		return Response(serializer_class.data, status=status.HTTP_200_OK)

	def retrieve(self, request):
		avatar_instance= self.get_object (request.avatar_id)
		if not avatar_instance:
			return Response({"res": "Object with avatar_id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
		serializer = AvatarSerializer (avatar_instance)
		return Response (serializer.data, status=status.HTTP_200_OK)
		
	def update(self, request):
		avatar_instance= self.get_object (request.avatar_id)
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