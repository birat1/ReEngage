from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ReEngage.oak_api_services import (
    get_units,
    get_lessons,
    get_lesson_asset,
    get_lesson_summary,
    get_questions,
)

class UnitsAPI(APIView):
    def get(self, request, keystage, subject, year):
        units = get_units(keystage, subject, year)
        if not units:
            return Response({"error": "No units found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(units, status=status.HTTP_200_OK)
    
class LessonsAPI(APIView):
    def get(self, request, keystage, subject):
        lessons = get_lessons(keystage, subject)
        if not lessons:
            return Response({"error": "No lessons found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(lessons, status=status.HTTP_200_OK)
    
class LessonAssetAPI(APIView):
    def get(self, request, lesson, asset_type):
        asset = get_lesson_asset(lesson, asset_type)
        if not asset:
            return Response({"error": "No asset found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(asset, status=status.HTTP_200_OK)
    
class LessonSummaryAPI(APIView):
    def get(self, request, lesson):
        summary = get_lesson_summary(lesson)
        if not summary:
            return Response({"error": "No summary found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(summary, status=status.HTTP_200_OK)
    
class QuestionsAPI(APIView):
    def get(self, request, keystage, subject):
        questions = get_questions(keystage, subject)
        if not questions:
            return Response({"error": "No questions found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(questions, status=status.HTTP_200_OK)
