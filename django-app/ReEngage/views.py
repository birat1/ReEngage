from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions
from . models import Student, Admin, Avatar
from .serializers import StudentSerializer, AdminSerializer, AvatarSerializer

class apiStudent(viewsets.ModelViewSet): #///SHOULD I DO A USER VIEWSET TO MINIMIZE CODE REUSE???
	queryset = Student.objects.all()

	def get_item(self, person_id):
		try:
			return Student.objects.get(person_id = person_id)
		except Student.DoesNotExist:
			return None
		
	def list(self, request):
		serializer_class = StudentSerializer (self.queryset, many=True)
		return Response(serializer_class.data, status=status.HTTP_200_OK)

	def create(self, request):
		data = {
			'person_id': request.data.get('person_id'),
			'firstname': request.data.get('firstname'),
			'surname': request.data.get('surname'),
			'password': request.data.get('password'),
			'year': request.data.get('year'),
			'managed_by': request.data.get('managed_by'),
			'xp': request.data.get('xp'),
			'points': request.data.get('points'),
			'streak': request.data.get('streak')
		}
		serializer = StudentSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def retrieve (self, request, person_id):
		student_instance= self.get_object (person_id=person_id)
		if not student_instance:
			return Response({"res": "Object with person_id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
		else:
			serializer = StudentSerializer (student_instance)
			return Response (serializer.data, status=status.HTTP_200_OK)
	
	def destroy(self, request, person_id):
		student_instance = self.get_object(person_id, request.user.person_id)
		if not student_instance:
			return Response({"res": "Object with person_id does not exist"},status=status.HTTP_400_BAD_REQUEST)
		else:
			student_instance.delete()
			return Response({"res": "Object deleted!"}, status=status.HTTP_200_OK)
		
	def update(self, request, person_id):
		student_instance= self.get_object (person_id, request.user.person_id) #///is this right???
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
			serializer = StidentSerializer(instance = student_instance, data=data, partial = True)
			if serializer.is_valid():
				serializer.save()
				return Response(serializer.data, status=status.HTTP_200_OK)
			else:
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class apiAdmin(viewsets.ModelViewSet):
	queryset = Admin.objects.all()

	def get_item(self, person_id):
		try:
			return Admin.objects.get(person_id = person_id)
		except Admin.DoesNotExist:
			return None
		
	def list(self, request):
		serializer_class = AdminSerializer (self.queryset, many=True)
		return Response(serializer_class.data, status=status.HTTP_200_OK)

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

	def retrieve (self, request, person_id):
		admin_instance= self.get_object (person_id=person_id)
		if not admin_instance:
			return Response({"res": "Object with person_id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
		else:
			serializer = AdminSerializer (admin_instance)
			return Response (serializer.data, status=status.HTTP_200_OK)
	
	def destroy(self, request, person_id):
		admin_instance = self.get_object(person_id, request.user.person_id)
		if not admin_instance:
			return Response({"res": "Object with person_id does not exist"},status=status.HTTP_400_BAD_REQUEST)
		else:
			admin_instance.delete()
			return Response({"res": "Object deleted!"}, status=status.HTTP_200_OK)
		
	def update(self, request, person_id):
		admin_instance= self.get_object (person_id, request.user.person_id) #///is this right???
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

	def retrieve(self, request, avatar_id):
		avatar_instance= self.get_object (avatar_id=avatar_id)
		if not avatar_instance:
			return Response({"res": "Object with person_id does not exist"}, status=status.HTTP_400_BAD_REQUEST)
		else:
			serializer = AvatarSerializer (avatar_instance)
			return Response (serializer.data, status=status.HTTP_200_OK)
		
	def update(self, request, avatar_id):
		avatar_instance= self.get_object (avatar_id, request.user.avatar_id) #///??? :(
		if not avatar_instance:
			return Response({"res": "Object with person_id does not exists"},status=status.HTTP_400_BAD_REQUEST)
		else:	
			data = {
				'avatar_id': avatar_id,
				'image': request.data.get('name'),
				'price': request.data.get('password')
			}
			serializer = AvatarSerializer(instance =avatar_instance, data=data, partial = True)
			if serializer.is_valid():
				serializer.save()
				return Response(serializer.data, status=status.HTTP_200_OK)
			else:
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)